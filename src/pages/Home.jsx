import React, {useState, useRef, useCallback,useEffect,useContext, useMemo} from "react"
import AppContext from "../hooks/context";

import Modal from "../component/modal/Modal";
import Form from "../component/Form/Form";
import EditForm from "../component/Form/EditForm";
import Table from "../component/Table/Table";
import SubRows from "../component/Table/SubRows";
import Comments from "../component/Table/Comments";
import QrScanner from "../component/Qr/Qr";
import axios from "axios";
import {SelectColumnFilter} from "../component/Table/Filter";

function Home(){
    const [isModal,setModal] = useState(false)
    const [title,setTitle] = useState("");
    const [isAdd,setIsAdd]= useState(false)
    const [editData,setEditData] = useState({})
    const [modalVariant,setModalVariant] = useState("")

    const [data,setData] = useState([]);
    const fetchIdRef = useRef(0)
    const [loading,setIsLoading] = useState(false)
    ///
    const [pageCount,setPageCount] = useState(0)
    ///

    const {roles} = useContext(AppContext)
    const currentUser = JSON.parse(roles)

    const getModal = ()=>{
        switch(modalVariant){
            case "add":
                return  <Form title={title}
                              onAddData={(data)=>onAddData(data)}
                              added={isAdd}
                />
            case "find":
                return <QrScanner/>
            case "edit":
                return <EditForm
                    item={editData}
                    onAddData={(data)=>onAddData(data)}
                    onAddHistory={(data)=>onAddHistory(data)}
                />
            default:
                return <div></div>
        }
    }

    const columns = useMemo(
        ()=>{
            const tableArray = [
                {
                    Header: ()=>null,
                    id:'expander',
                    Cell: ({ row }) =>(
                        <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                        </span>

                    ),
                    SubCell:()=>null
                },
                {
                    Header:'Имя',
                    accessor:(d)=>d.description,
                    SubCell:(cellProps)=>(
                        <>{cellProps.value}</>
        )
                },
                {
                    Header:'Местонахождение',
                    accessor: (d)=>d.destination
                },
                {
                    Header:'Отделение',
                    accessor: (d)=>d.department_title,
                    Filter:SelectColumnFilter,
                    filter:'equals'
                },
                {
                    Header: 'IP адрес',
                    accessor: (d)=>d.ip
                },
            ]

            if(currentUser.role==="admin"){
                return [...tableArray,{
                    Header:'Инвентарный номер',
                    accessor:  (d)=>d.inventory
                },
                    {
                        Header:'Категория',
                        accessor: (d)=>d.category_title
                    },
                    {
                      Header:'Автор',
                      accessor: (d)=>d.author
                    },
                    {
                        Header:"Редактировать",
                        Cell:({cell})=>(
                            <>
                                <button onClick={()=>onClickEditData("edit",cell.row.original)}>
                                    Редактировать
                                </button>
                                <button onClick={()=>onDeleteData(cell.row.original.pc_id)}>
                                    Удалить
                                </button>
                            </>
                        ),
                    }]
            }

            return tableArray

        },[])
    const fetchAPIData = async({page,size})=>{
        try{
            setIsLoading(true)
            const [itemResponse] = await Promise.all([
                axios.get(`http://localhost:8080/getAll?page=${page}&size=${size}`,{
                    headers:{
                        'Authorization':`Bearer ${sessionStorage.getItem('token')}`
                    }
                })
            ])
            setData(itemResponse.data.rows)
            const pages = Math.ceil(itemResponse.data.count / size)
            setPageCount(pages)
            setIsLoading(false)
        }catch(e){
            console.log(e)
        }
    }
    const fetchData = useCallback(
        ({ pageSize, pageIndex }) => {
          const fetchId = ++fetchIdRef.current;
          setIsLoading(true)
          if (fetchId === fetchIdRef.current) {
            fetchAPIData({
              size:pageSize,
              page:pageIndex*pageSize,
            });
          }
        },
        []
      );

    const onClickEditData = (variant,id)=>{
        setTitle("Редактировать")
        setEditData(id)
        setModalVariant(variant)
        setModal(true)
    }
    const onAddData = async (current)=>{
        try{
            console.log(current)
            const findId = data.find(item=>item.pc_id===Number(current.pc_id))
            if(findId){
                setData(prev=>prev.map((item)=>{
                    if(item.pc_id===findId.pc_id){
                        return {
                            ...item,
                            description:current.description,
                            destination:current.destination,
                            inventory:current.inventory,
                            departmentId:current.department_id,
                            department_title:current.department_title,
                            ip:current.ip,
                            category:current.category_id,
                        }
                    }else{
                        return item
                    }
                }))
                await axios.post('http://localhost:8080/updateSubject',current)
            }else{
                const ItemResponse = await axios.post('http://localhost:8080/addSubject',current)
                console.log(ItemResponse.data)
                setData(prev=>[...prev,current])
            }
        }catch (e) {
            console.log(e)
        }
    }
    const onDeleteData = async (id)=>{
        try{
            setData(prev=>prev.filter(item=>item.pc_id !== id))
            return await axios({
                method:'DELETE',
                url:'http://localhost:8080/deleteSubject',
                data:{
                    id
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    const SubRowsAsync=({row,rowProps,visibleColumns})=>{
        const [loading,setLoading] = useState(true);
        const [dataHistory,setDataHistory] = useState([])
        const [comments,setComments] = useState([])

        useEffect(()=>{
            async function fetchData() {
                const {pc_id} = row.original
                const [History,Comment] = await Promise.all([
                    axios.get(`http://localhost:8080/showHistory/${pc_id}`),
                    axios.get(`http://localhost:8080/showComments/${pc_id}`)
                ])

                setDataHistory(History.data)
                setComments(Comment.data)
                setLoading(false)
                console.log(comments)
            }
            fetchData()
        },[])

        return(
            <>
            <SubRows
                row={row}
                rowProps={rowProps}
                visibleColumns={visibleColumns}
                data={dataHistory}
                loading={loading}
            />
            <Comments
                data={comments}
                row={row}
                rowProps={rowProps}
                visibleColumns={visibleColumns}
                loading={loading}
            />
            </>
        )
    }
    const showHistory = useCallback(({row,rowProps,visibleColumns})=>(
         <SubRowsAsync
            row={row}
            rowProps={rowProps}
            visibleColumns={visibleColumns}
         />
    ),[])
    const onAddFormData =(title,addData,variant)=>{
        setTitle(title)
        setIsAdd(addData)
        setModal(true)
        setModalVariant(variant)
    }
    const onAddHistory= async(history)=>{
       try{
           await axios.post('http://localhost:8080/addHistoryMoving',history)
       }catch (e) {
        console.log(e)
       }
    }
    const onClose = ()=>{
        setModal(!isModal)
        setIsAdd(false)
        setEditData("")
    }
    const onFindElem = (variant)=>{
        setModal(true)
        setModalVariant(variant)
    }

    return(
    <div>
        <h1>Учет ПК</h1>
        <button onClick={()=>onAddFormData('Добавить',true,"add")}>Добавить предмет</button>
        <button onClick={()=>onFindElem("find")}>Найти предмет</button>
        <Modal visible={isModal} title='Заголовок' footer={<button onClick={onClose}>Закрыть</button>} onClose={onClose}>
           {getModal()}
        </Modal>

        <Table
            data={data}
            loading={loading}
            pageCount={pageCount}
            fetchData={fetchData}
            columns={columns}
            showHistory={showHistory}
        />
    </div>
    )
}

export default Home