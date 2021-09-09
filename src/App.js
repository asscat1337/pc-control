import {useMemo} from 'react'
import Table from "./component/Table/Table";

import './App.css';

function App() {
    const columns = useMemo(
        ()=>[

                    {
                        Header:'Имя',
                        accessor:'firstName'
                    },
                    {
                        Header:'Местонахождение',
                        accessor: 'lastName'
                    },
                    {
                        Header:'Инвентарный номер',
                        accessor: 'age'
                    },
                    {
                        Header: 'IP адрес',
                        accessor: 'visits'
                    },
                    {
                        Header:'Категория',
                        accessor: 'status'
                    },
        ],[])
    const data = [
        {firstName:'Ivan',lastName:'Ivanov',age:12,visits:true,progress:12,status:'checked'},
        {firstName:'Ivan',lastName:'Ivanov',age:12,visits:true,progress:12,status:'checked'},
        {firstName:'Ivan',lastName:'Ivanov',age:12,visits:true,progress:12,status:'checked'}
        ]
  return (
    <div className="App">
        <h1>Hello</h1>
        <Table columns={columns} data={data}/>
    </div>
  );
}

export default App;
