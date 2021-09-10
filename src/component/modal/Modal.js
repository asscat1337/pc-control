import { useEffect } from 'react'

import './Modal.scss'


function Modal({
    visible = false,
    title = '',
    footer = '',
    onClose,
    children
}){

 const onKeyDown = ({key})=>{
     switch(key){
         case 'Escape':
             onClose()
        break     
     }
 }
 useEffect(()=>{
    document.addEventListener('keydown',onKeyDown)
    return ()=>{
        document.removeEventListener('keydown',onKeyDown)
    }
 },[])
 if(!visible) return null

 return (
     <div className="modal" onClick={onClose}>
        <div className="modal-dialog" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <span className="modal-close" onClick={onClose}>
                    &times;
                </span>  
            </div>
            <div className="modal-body">
                <div className="modal-content">
                    {children}
                </div>
            </div>
            {footer && <div className="modal-footer">{footer}</div>}
        </div>
     </div>
 )
}



export default Modal