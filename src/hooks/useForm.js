import React,{useState} from 'react'


function useForm(){
    const [inputs,setInputs] = useState({})


    const handleInput = (event)=>{
        setInputs(inputs=>({...inputs,[event.target.name]:event.target.value}))
    }
    const handleSubmit =(event)=>{
        event.preventDefault()
    }

    return {
        inputs,
        handleInput,
        handleSubmit,
        setInputs
    }
}
export default useForm
