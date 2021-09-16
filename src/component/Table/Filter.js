import React, {useMemo, useState} from "react"
import {useAsyncDebounce} from "react-table";

export const Filter = ({ column }) => {
    return (
        <div style={{ marginTop: 5 }}>
            {column.canFilter && column.render('Filter')}
        </div>
    );
};

export const DefaultColumnFilter = ({
                                        column: {
                                            filterValue,
                                            setFilter,
                                            preFilteredRows: { length },
                                        },
                                    }) => {
    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`search (${length}) ...`}
        />
    );
};


export const SelectColumnFilter = ({
column:{filterValue,setFilter,preFilteredRows,id}
                            })=>{
    const options = useMemo(()=>{
        const option = new Set()
        preFilteredRows.forEach(row=>{
            option.add(row.values[id])
        })
        return [...option.values()]
    },[id,preFilteredRows])

    return (
        <select value={filterValue}
                onChange={e=>{
                    setFilter(e.target.value || undefined)
                }}
        >
            <option value="">All</option>
            {options.map((option,i)=>(
                    <option key={i} value={option}>
                        {option}
                    </option>
                )
            )}
        </select>
    )
}