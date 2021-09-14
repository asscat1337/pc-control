import React, {useEffect,useState} from 'react'
import  useForm  from '../../hooks/useForm'
import axios from "axios";

import CustomSelect from "../Select/Select";
import QrScanner from "../Qr/Qr";

function Form({title,item,onAddData,added = false}){
    const {inputs,setInputs,handleInput,handleSubmit} = useForm()
    const [selectCat,setSelectCat] = useState([])
    const [selectDep,setSelectDep] = useState([])
    const [showScan,setShowScan] = useState(false)
    const [result,setResult] = useState("");
    const [ip,setIp]= useState("")

    useEffect(() => {
       if(added===false){
           setInputs(item)
       }
    }, [item,ip])
    useEffect(() => {
        async function fetchData(){
            const [serviceData,departmentData] = await Promise.all([
                axios.get('http://localhost:8080/showService'),
                axios.get('http://localhost:8080/showDep')
            ])
            setSelectCat(serviceData.data)
            setSelectDep(departmentData.data)
        }
        fetchData()
    }, [])
    const onClickButton = (event)=>{
        event.preventDefault()
        if(result){
            setInputs(prev=>({...prev,inverntory:result}))
        }
        onAddData(inputs)
    }

    const onShowScan =()=>{
        setShowScan(!showScan)
    }

    const handleSelect=(data)=>{
        const {value} = data.target
        /// дублируется,можно переделать в ф-ию
         const findDep = selectDep.find(item=>item.department_title===value)
         const findCat = selectCat.find(item=>item.category_title===value)
         ///
        if(findDep){
            setIp(findDep.ip_address)
            console.log(findDep)
            /// переделать или закинуть в state
            const obj = {department_title:findDep.department_title,department_id:findDep.department_id}
            //
            setInputs(prev=>({...prev,...obj}))
        }
        if(findCat){
            setInputs(prev=>({...prev,...findCat}))
            
        }

    }
    return(
        <form method="post" onSubmit={handleSubmit}>
            <input type="text" 
                 name="description"
                 placeholder="Имя" 
                 value={inputs.description || ''}
                 onChange={handleInput}
            />
            <input type="text" 
                    placeholder="Местонахождение" 
                    name="destination"
                    value={inputs.destination || ''}
                    onChange={handleInput}
            />
            <input type="text" 
                    placeholder="Инвентарный номер" 
                    name="inventory"
                    value={result || inputs.inventory || ''}
                    onChange={handleInput}
            />
            <input type="text" 
                    placeholder="Ip адрес" 
                    name="ip"
                    value={inputs.ip || ip || ''}
                    onChange={handleInput}
            />
            {added && <CustomSelect items={selectCat} onChange={handleSelect} name={"category"}/> }
            {added && <CustomSelect items={selectDep} onChange={handleSelect} name={"departments"}/>}
            {added && <button onClick={onShowScan}>Показать скан</button>}
            {showScan && <QrScanner result={result} setResult={setResult}/>}
            <button onClick={onClickButton}>{title}</button>
        </form>
    )
}


export default Form