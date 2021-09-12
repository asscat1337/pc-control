import {useEffect,useState} from 'react'
import  useForm  from '../../hooks/useForm'

import CustomSelect from "../Select/Select";

function Form({title,item,onAddData,added = false}){
    const {inputs,setInputs,handleInput,handleSubmit} = useForm()

    const arrOtd = [
        {id:1,title:"Отдел1"},
        {id:2,title:"Отдел2"},
        {id:3,title:"Отдел3"}
    ];

    useEffect(() => {
       if(added===false){
           setInputs(item)
       }
    }, [item])

    const onClickButton = (event)=>{
        event.preventDefault()
        onAddData(inputs)
    }

    return(
        <form method="post" onSubmit={handleSubmit}>
            <input type="text" 
                 name="description"
                 placeholder="Имя" 
                 value={inputs.description || ''}
                 onChange={handleInput}/>
            <input type="text" 
                    placeholder="Местонахождение" 
                    name="destination"
                    value={inputs.destination || ''}
                    onChange={handleInput}/>
            <input type="text" 
                    placeholder="Инвентарный номер" 
                    name="inventory"
                    value={inputs.inventory || ''}
                    onChange={handleInput}/>
            <input type="text" 
                    placeholder="Ip адрес" 
                    name="ip"
                    value={inputs.ip || ''}
                    onChange={handleInput}/>
            <input type="text" 
                    placeholder="Категория"
                   name="pc_id"
                   value={inputs.pc_id || ''}
                   onChange={handleInput}/>
            {added && <CustomSelect items={arrOtd} onChange={handleInput}/>}
            <button onClick={onClickButton}>{title}</button>
        </form>
    )
}


export default Form