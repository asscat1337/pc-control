import React,{useContext} from "react";
import {useHistory} from "react-router-dom"
import AppContext from "../../hooks/context";

import styles from "./Login.module.scss"

function Login(){

    const history = useHistory()

    const {setToken,token} = useContext(AppContext)

    const onClickAuth=(event)=>{
        event.preventDefault()
        setToken(prev=>({...prev,isAuth:!prev.isAuth}))
        history.push('/home')
    }

    return(
        <div className={styles.login}>
            <form action="">
                <input type="text" placeholder="Логин"/>
                <input type="text" placeholder="Пароль"/>
                <button onClick={onClickAuth}>Авторизация</button>
            </form>
        </div>
    )
}

export default Login