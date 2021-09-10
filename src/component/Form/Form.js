import {useEffect,useState} from 'react'
import  useForm  from '../../hooks/useForm'

function Form({title,item}){
    const {inputs,setInputs,handleInput,handleSubmit} = useForm()

    useEffect(() => {
        setInputs(item)
    }, [item])

    const onClickButton = (event)=>{
        event.preventDefault()
        console.log(inputs)
    }

    return(
        <form method="post" onSubmit={handleSubmit}>
            <input type="text" 
                 name="firstName"
                 placeholder="Имя" 
                 value={inputs.firstName || ''} 
                 onChange={handleInput}/>
            <input type="text" 
                    placeholder="Местонахождение" 
                    name="lastName"
                    value={inputs.lastName || ''} 
                    onChange={handleInput}/>
            <input type="text" 
                    placeholder="Инвентарный номер" 
                    name="progress"
                    value={inputs.progress || ''} 
                    onChange={handleInput}/>
            <input type="text" 
                    placeholder="Ip адрес" 
                    name="status"
                    value={inputs.status || ''} 
                    onChange={handleInput}/>
            <input type="text" 
                    placeholder="Категория" 
                    onChange={handleInput}/>
            <button onClick={onClickButton}>{title}</button>
        </form>
    )
}


export default Form