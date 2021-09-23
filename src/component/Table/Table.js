import {useTable, useSortBy, useFilters,useGlobalFilter,usePagination} from 'react-table'
import {Filter,DefaultColumnFilter,SelectColumnFilter} from "./Filter"
import React,{useMemo,useContext} from 'react'
import AppContext from '../../hooks/context'
import styles from './Table.module.scss'
import {number} from "react-table/src/sortTypes";


function Table({data,onClickEditData,onDeleteData}){
    const {roles} = useContext(AppContext)
    const columns = useMemo(
        ()=>{
            const tableArray = [

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
                    Header: 'IP адрес',
                    accessor: 'ip'
                },
            ]

            if(roles==="admin"){
                return [...tableArray,{
                    Header:'Инвентарный номер',
                    accessor: 'inventory'
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
                }]
            }

            return tableArray

        },[])
 const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     page,
     prepareRow,
     visibleColumns,
     canPreviousPage,
     canNextPage,
     pageOptions,
     pageCount,
     gotoPage,
     nextPage,
     previousPage,
     setPageSize,
     state:{pageIndex,pageSize}
 } = useTable(
     {
         columns,
         data,
         defaultColumn:{Filter:DefaultColumnFilter},
         initialState:{pageIndex:0,pageSize:10}
     },
     useFilters,
     useGlobalFilter,
     useSortBy,
     usePagination)


    const generateSortingIndicator = (column)=>{
        return column.isSorted
            ? column.isSortedDesc
                ? ' 🔽'
                : ' 🔼'
            : ''
    }

    return (
        <>
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
            {page.map((row)=>{
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
            <div className="pagination">
                <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={()=>previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <button onClick={()=>nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>
                    {'>>'}
                </button>

                <span>
                    Page: {pageIndex+1} of {pageOptions.length}
                </span>

                <span>
                    Go to page: {''}
                    <input type="number"
                        defaultValue={pageIndex+1}
                        onChange={e=>{
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                    />
                </span>
                <select
                    value={pageSize}
                    onChange={e=>{
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10,20,30,40,50].map(pageSize=>(
                        <option key={pageSize} value={pageSize}>
                            show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            </>
    )
}



export default Table