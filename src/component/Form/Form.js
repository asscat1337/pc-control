import {useEffect,useState,useRef} from 'react'
import  useForm  from '../../hooks/useForm'

import CustomSelect from "../Select/Select";
import QrScanner from "../Qr/Qr";

function Form({title,item,onAddData,added = false}){
    const {inputs,setInputs,handleInput,handleSubmit} = useForm()
    const [showScan,setShowScan] = useState(false)
    const [result,setResult] = useState("")
    const inputRef = useRef(result)

    const arrOtd = [
        {id:1,title:"Отдел1"},
        {id:2,title:"Отдел2"},
        {id:3,title:"Отдел3"}
    ];

    useEffect(() => {
       if(added===false){
           setInputs(item)
       }
       console.log(result)
    }, [item,result])

    const onClickButton = (event)=>{
        event.preventDefault()
        if(result){
            console.log(result)
            // handleInput((prev)=>[...prev,{inventory:result}])
        }
        onAddData(inputs)
    }
    const onShowScan =()=>{
        setShowScan(!showScan)
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
                    ref={inputRef}
                    // value={result || inputs.inventory || ''}
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
            {added && <button onClick={onShowScan}>Показать скан</button>}
            {showScan && <QrScanner result={result} setResult={setResult}/>}
            <button onClick={onClickButton}>{title}</button>
        </form>
    )
}


export default Form