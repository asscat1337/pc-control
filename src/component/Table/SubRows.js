import {useMemo} from 'react'
import {useTable} from "react-table";

function SubRows({data,loading}){
    const columns = useMemo(
        ()=>[
            {
                Header:'Номер истории',
                accessor: 'history_id'
            },
            {
                Header:'Месторасположение',
                accessor: 'previous'
            },
            {
                Header:'Отделение',
                accessor: 'department'
            }
        ],[])
    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({columns,data})
 if(loading){
     return (
         <h3>Загрузка...</h3>
     )
 }
 return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup=>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column=>(
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row,i)=>{
                prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell=>{
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
 )
}


export default SubRows