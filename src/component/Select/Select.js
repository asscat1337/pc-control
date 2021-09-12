import React from "react";


function CustomSelect({items,onChange}){
    return (
        <select onChange={onChange} name="otdelenie">
            {items.map(item=>(
                <option key={item.id} value={item.title}>{item.title}</option>
            )
            )}
        </select>
    )
}


export default CustomSelect