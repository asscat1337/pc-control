import {useMemo,useState} from 'react'

import Modal from './component/modal/Modal';
import Table from "./component/Table/Table";
import Form from './component/Form/Form';

import './App.css';

function App() {
    const data = [
        {id:1,firstName:'Ivan1',lastName:'Ivanov',age:12,visits:true,progress:12,status:'checked'},
        {id:2,firstName:'Ivan2',lastName:'Ivanov',age:12,visits:true,progress:12,status:'checked'},
        {id:3,firstName:'Ivan3',lastName:'Ivanov',age:12,visits:true,progress:12,status:'checked'}
        ]
        const [isModal,setModal] = useState(false)
        const [editData,setEditData] = useState({})

const onClickEditData = (id)=>{
    setEditData(id)
    setModal(true)
}

const onDeleteData = (id)=>{

}

const onClose = ()=>setModal(!isModal)
    const columns = useMemo(
        ()=>[

                    {
                        Header:'Имя',
                        accessor:'firstName'
                    },
                    {
                        Header:'Местонахождение',
                        accessor: 'lastName'
                    },
                    {
                        Header:'Инвентарный номер',
                        accessor: 'age'
                    },
                    {
                        Header: 'IP адрес',
                        accessor: 'visits'
                    },
                    {
                        Header:'Категория',
                        accessor: 'status'
                    },
                    {
                        Header:"Редактировать",
                        Cell:({cell})=>(
                            <button onClick={()=>onClickEditData(cell.row.original)}>
                                Редактировать
                            </button>
                        )
                    },
                    {
                        Header:"Удалить",
                        Cell:({cell})=>(
                            <button onClick={()=>onDeleteData(cell.row.original.id)}>
                                Удалить
                            </button>
                        )
                    }
        ],[])
  return (
    <div className="App">
        <h1>Hello</h1>
        <Modal visible={isModal} title='Заголовок' footer={<button onClick={onClose}>Закрыть</button>} onClose={onClose}>
            <Form title="Редактировать" item={editData}/>
        </Modal>

        <Table columns={columns} data={data} onClickEditData={onClickEditData}/>
    </div>
  );
}

export default App;
