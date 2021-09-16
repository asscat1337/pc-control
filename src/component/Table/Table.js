import {useTable, useSortBy, useFilters,useGlobalFilter,useAsyncDebounce} from 'react-table'
import {Filter,DefaultColumnFilter,SelectColumnFilter} from "./Filter"
import React,{useMemo,useState} from 'react'
import styles from './Table.module.scss'



function Table({data,onClickEditData,onDeleteData}){
    const columns = useMemo(
        ()=>[

            {
                Header:'Имя',
                accessor:'description'
            },
            {
                Header:'Местонахождение',
                accessor: 'destination'
            },
            {
                Header:'Отделение',
                accessor: 'department_title',
                Filter:SelectColumnFilter,
                filter:'equals'
            },
            {
                Header:'Инвентарный номер',
                accessor: 'inventory'
            },
            {
                Header: 'IP адрес',
                accessor: 'ip'
            },
            {
                Header:'Категория',
                accessor: 'category_title'
            },
            {
                Header:"Редактировать",
                Cell:({cell})=>(
                    <>
                        <button onClick={()=>onClickEditData(cell.row.original)}>
                            Редактировать
                        </button>
                        <button onClick={()=>onDeleteData(cell.row.original.pc_id)}>
                            Удалить
                        </button>
                    </>
                ),
            }
        ],[])
 const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     state,
     visibleColumns,
     preGlobalFilteredRows,
     setGlobalFilter,
     prepareRow
 } = useTable(
     {
         columns,
         data,
         defaultColumn:{Filter:DefaultColumnFilter}
     },
     useFilters,
     useGlobalFilter,
     useSortBy)


    const generateSortingIndicator = (column)=>{
        return column.isSorted
            ? column.isSortedDesc
                ? ' 🔽'
                : ' 🔼'
            : ''
    }

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup)=>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column=>(
                        <th {...column.getHeaderProps()}>
                            <div {...column.getSortByToggleProps()}>
                                {column.render('Header')}
                                {generateSortingIndicator(column)}
                            </div>
                         <Filter column={column}/>
                        </th>
                    ))}
                </tr>
            ))
            }
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row,i)=>{
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell=>{
                            return <td {...cell.getCellProps()}> {cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })
            }
            </tbody>
        </table>
    )
}



export default Table