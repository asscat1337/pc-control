import React from "react";


function CustomSelect({items,onChange,name}){
    return (
        <select onChange={onChange} name={name} defaultValue={'default'}>
            <option disabled value="default">Выберите значение</option>
            {items.map((item,index)=>(
                <option key={index} value={item.title}>{item.title}</option>
            )
            )}
        </select>
    )
}


export default CustomSelect