import React, {useState,useCallback,useRef} from 'react'
import {Route,Switch,Redirect} from "react-router-dom"
import AppContext from "./hooks/context";
import axios from 'axios';

import Home from "./pages/Home";
import Login from "./pages/Login/Login"

import './App.css';

function App() {
    const [token,setToken] = useState(sessionStorage.getItem('token'));
    const [roles,setRoles] = useState(sessionStorage.getItem('role'))


  return (
    <div className="App">
        <AppContext.Provider value={{setToken,token,roles,setRoles}}>
            <Switch>
                <Route path="/home" exact>
                    {!token ? <Redirect to="/login"/>:<Home/>}
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
