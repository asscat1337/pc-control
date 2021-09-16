import React, {useState} from 'react'
import {Route,Switch,Redirect} from "react-router-dom"
import AppContext from "./hooks/context";

import Home from "./pages/Home";
import Login from "./pages/Login/Login"

import './App.css';

function App() {
    console.log(AppContext)
    // const [isModal,setModal] = useState(false)
    // const [title,setTitle] = useState("");
    // const [isAdd,setIsAdd]= useState(false)
    // const [editData,setEditData] = useState({})
    // const [data,setData] = useState([]);
    const [token,setToken] = useState({isAuth:true});

    // useEffect(()=>{
    //     async function fetchData(){
    //         const [itemResponse] = await Promise.all([
    //             axios.get('http://localhost:8080/getAll')
    //         ])
    //         setData(itemResponse.data)
    //     }
    //     fetchData()
    // },[])

  return (
    <div className="App">
        <AppContext.Provider value={{setToken,token}}>
            <Switch>
                <Route path="/home" exact>
                    {token.isAuth ? <Redirect to="/login"/>:<Home/>}
                </Route>
                <Route path="/login" exact>
                    <Login/>
                </Route>
            </Switch>
        </AppContext.Provider>
    </div>

  );
}

export default App;
