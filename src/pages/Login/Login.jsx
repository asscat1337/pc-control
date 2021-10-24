import React,{useContext,useState} from "react";
import {useHistory} from "react-router-dom"
import AppContext from "../../hooks/context";
import {ToastContainer,toast} from 'react-toastify'
import useForm from "../../hooks/useForm";
import axios from "axios";

import styles from "./Login.module.scss"
import 'react-toastify/dist/ReactToastify.css';

function Login(){

    const history = useHistory()
    const {inputs,handleInput,handleSubmit} = useForm()
    const [hidden,setHidden] = useState(true)
    const {setToken,setRoles} = useContext(AppContext)

    const changeType=()=>{
        setHidden(!hidden)
    }

    // const notify=()=>toast("Wow so easy!")
    const onClickAuth=async(event)=>{
        event.preventDefault()
            const loginData =  axios.post('http://localhost:8080/auth/login',inputs)
            loginData
                .then(response=>{
                    const {data} = response
                    console.log(data)
                    sessionStorage.setItem('token',data.token)
                    sessionStorage.setItem('role',JSON.stringify({"login":data.login,"role":data.role}))
                    setToken(data.token)
                    setRoles(JSON.stringify({"login":data.login,"role":data.role}))
                   history.push('/home')
                })
                .catch(error=>{
                    if(error.response){
                        toast.error(error.response.data.message)
                    }
                })
    }

    return(
        <div className={styles.loginContent}>
            <form action="post" onSubmit={handleSubmit} className={styles.login}>
                <input  type="text" 
                        placeholder="Логин"
                        name="login"
                        onChange={handleInput}
                        value={inputs.login || ''}
                />
                <div className={styles.password}>
                <input type={hidden ? 'password' : 'text'} 
                        placeholder="Пароль"
                        name="password"
                        onChange={handleInput}
                        className={styles.passwordInput}
                        value={inputs.password || ''}
                />
                <a href="#" className={styles.passwordControl} onClick={changeType}>
                    <img src={hidden ? '/view.png' : '/no-view.png'}  alt="" />
                </a>
                </div>
                <button onClick={onClickAuth} className={styles.buttonLogin}>Авторизация</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login