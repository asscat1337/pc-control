import {useTable, useSortBy, useFilters,useGlobalFilter,usePagination} from 'react-table'
import {Filter,DefaultColumnFilter,SelectColumnFilter} from "./Filter"
import React,{useMemo,useContext,useEffect} from 'react'
import AppContext from '../../hooks/context'
import styles from './Table.module.scss'


function Table({
    onClickEditData,
    onDeleteData,
    data,
    loading,
    pageCount:controlledPageCount,
    fetchData
}){
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
                    accessor: 'departments[0].department_title',
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
                    accessor: 'categories[0].category_title'
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
     page,
     prepareRow,
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
         initialState:{pageIndex:0,pageSize:5},
         manualPagination:true,
         autoResetPage:false,
         pageCount:controlledPageCount
     },
     useFilters,
     useGlobalFilter,
     useSortBy,
     usePagination)

    useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

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
                {loading ? 
                <tr>
                    <td colSpan="10">Загрузка...</td>
                </tr> 
                :
                page.map((row)=>{
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
                <button onClick={() => nextPage()} disabled={!canNextPage}>
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
                    {[5,10,20,30,40,50].map(pageSize=>(
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