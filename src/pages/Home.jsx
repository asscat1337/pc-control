import {useState,useRef,useCallback} from "react"
import AppContext from "../hooks/context";

import Modal from "../component/modal/Modal";
import Form from "../component/Form/Form";
import Table from "../component/Table/Table";
import QrScanner from "../component/Qr/Qr";
import axios from "axios";

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

    const onClickEditData = (id)=>{
        setTitle("Редактировать")
        setEditData(id)
        setModal(true)
    }
    const onAddData = async (current)=>{
        console.log(current)
        try{
            const findId = data.find(item=>item.pc_id===Number(current.pc_id))
            if(findId){
                setData(prev=>prev.map((item)=>{
                    if(item.pc_id===findId.pc_id){
                        return {
                            ...item,
                            description:current.description,
                            destination:current.destination,
                            inventory:current.inventory,
                            ip:current.ip,
                            category:current.category_id,
                        }
                    }else{
                        return item
                    }
                }))
                await axios.post('http://localhost:8080/updateSubject',current)
            }else{
                console.log(current)
                await axios.post('http://localhost:8080/addSubject',current)
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
    const onAddFormData =(title,addData,variant)=>{
        setTitle(title)
        setIsAdd(addData)
        setModal(true)
        setModalVariant(variant)
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
    const getModal = ()=>{
        switch(modalVariant){
            case "add":
                return  <Form title={title} item={editData} onAddData={(data)=>onAddData(data)} added={isAdd}/>
            case "find":
                return <QrScanner/>
            default:
                return <div></div>
            }
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
            onClickEditData={onClickEditData}
            onDeleteData={onDeleteData}
            data={data}
            loading={loading}
            pageCount={pageCount}
            fetchData={fetchData}
        />
    </div>
    )
}

export default Home