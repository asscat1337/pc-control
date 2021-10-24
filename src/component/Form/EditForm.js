import useForm from "../../hooks/useForm";
import {useState,useEffect} from 'react'

import CustomSelect from "../Select/Select";
import axios from "axios";


//// Переделать в одну форму для добавление / редактирования

function EditForm({item,onAddData,onAddHistory}){
    const [history,setHistory] = useState([])
    const [department,setDepartment] = useState([])
    const {handleSubmit,handleInput,setInputs,inputs} = useForm()

    useEffect(()=>{
        setInputs(item)
        setHistory(item)
    },[item])
    useEffect(()=>{
        async function fetchData(){
           const {data} =  await  axios.get('http://localhost:8080/showDepartment')
            setDepartment(data)
        }
        fetchData()
    },[])

    const handleEditSelect=(event)=>{
        const {value} = event.target
        const findDepartment = department.find(item=>item.department_title === value);
        console.log(findDepartment)
        setInputs(prev=>({...prev,findDepartment}))
    }
    const onEditButton=()=>{
        onAddData(inputs)
        onAddHistory(history)
    }

    return(
        <form action="post" onSubmit={handleSubmit}>
            <input
                type="text"
                name="inventory"
                placeholder="Инвентарный номер"
                value={inputs.inventory || ''}
                onChange={handleInput}
            />
            <input
                type="text"
                name="ip"
                placeholder="Ip адрес"
                value={inputs.ip || ''}
                onChange={handleInput}
            />
            <input
                type="text"
                name="destination"
                placeholder="Место нахождение"
                value={inputs.destination || ''}
                onChange={handleInput}
            />
            <input
                type="text"
                name="description"
                placeholder="Описание"
                value={inputs.description || ''}
                onChange={handleInput}
            />

            <CustomSelect
                items={department}
                name={"department"}
                onChange={handleEditSelect}
            />

            <button onClick={onEditButton}>Редактировать</button>
        </form>
    )
}


export default  EditForm