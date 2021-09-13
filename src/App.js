import React, {useMemo,useState,useEffect} from 'react'

import Modal from './component/modal/Modal';
import Table from "./component/Table/Table";
import Form from './component/Form/Form';

import './App.css';
import axios from "axios";

function App() {
    const [isModal,setModal] = useState(false)
    const [title,setTitle] = useState("");
    const [isAdd,setIsAdd]= useState(false)
    const [editData,setEditData] = useState({})
    const [data,setData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const [itemResponse] = await Promise.all([
                axios.get('http://localhost:8080/getAll')
            ])
            setData(itemResponse.data)
        }
        fetchData()
    },[])

const onClickEditData = (id)=>{
    setTitle("Редактировать")
    setEditData(id)
    setModal(true)
}
const onAddData = async (current)=>{
     try{
         const findId = data.find(item=>item.pc_id===Number(current.pc_id))
         console.log(findId)
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
const onAddFormData =(title,addData)=>{
    setTitle(title)
    setIsAdd(addData)
    setModal(true)
}
const onClose = ()=>{
    setModal(!isModal)
    setIsAdd(false)
    setEditData("")
}
    const columns = useMemo(
        ()=>[

                    {
                        Header:'Имя',
                        accessor:'description'
                    },
                    {
                        Header:'Местонахождение',
                        accessor: 'destination'
                    },
                    // {
                    //     Header:'Отделение',
                    //     accessor: 'otdelenie'
                    // },
                    {
                        Header:'Инвентарный номер',
                        accessor: 'inventory'
                    },
                    {
                        Header: 'IP адрес',
                        accessor: 'ip'
                    },
                    {
                        Header:'Категория',
                        accessor: 'pc_id'
                    },
                    {
                        Header:"Редактировать",
                        Cell:({cell})=>(
                            <button onClick={()=>onClickEditData(cell.row.original)}>
                                Редактировать
                            </button>
                        ),
                    },
                    {
                        Header:"Удалить",
                        Cell:({cell})=>(
                            <button onClick={()=>onDeleteData(cell.row.original.pc_id)}>
                                Удалить
                            </button>
                        )
                    }
        ],[])
  return (

    <div className="App">
        <h1>Учет ПК</h1>
        <button onClick={()=>onAddFormData('Добавить',true)}>Добавить предмет</button>
        <Modal visible={isModal} title='Заголовок' footer={<button onClick={onClose}>Закрыть</button>} onClose={onClose}>
            <Form title={title} item={editData} onAddData={(data)=>onAddData(data)} added={isAdd}/>
        </Modal>

        <Table columns={columns} data={data} onClickEditData={onClickEditData}/>
    </div>
  );
}

export default App;
