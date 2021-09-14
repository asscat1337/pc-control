import React from "react";


function CustomSelect({items,onChange,name}){
    return (
        /// костыль
        <select onChange={onChange} name={name} defaultValue={'default'}>
            <option disabled value="default">Выберите значение</option>
            {items.map((item,index)=>(
                <option key={index} value={item.category_title || item.department_title}>
                    {item.category_title || item.department_title}
                </option>
            )
            )}
        </select>
    )
}


export default CustomSelect