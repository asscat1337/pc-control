import {useTable, useSortBy, useFilters,useGlobalFilter,usePagination,useExpanded} from 'react-table'
import {Filter,DefaultColumnFilter} from "./Filter"
import React,{useEffect,Fragment} from 'react'
import styles from './Table.scss'


function Table({
    data,
    loading,
    pageCount:controlledPageCount,
    fetchData,
    columns,
    showHistory,
    history
}){
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
     visibleColumns,
     state:{pageIndex,pageSize,expanded}
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
     useExpanded,
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
        <table {...getTableProps()} id="customers">
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
                    prepareRow(row);
                    const rowProps = row.getRowProps()
                        return (
                             <Fragment key={rowProps.key}>
                                <tr>
                                    {row.cells.map(cell=>{
                                        return <td {...cell.getCellProps()}> {cell.render('Cell')}</td>
                                    })}
                                </tr>
                                     {row.isExpanded &&
                                         <tr>
                                             <td colSpan="1000">{showHistory({row,rowProps,visibleColumns})}</td>
                                         </tr>
                                     }
                            </Fragment>
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