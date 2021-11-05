import {useEffect,useState,useContext} from 'react'
import styles from './Info.module.scss'
import axios from "axios";
import AppContext from "../../hooks/context";
import dayjs from "dayjs";
import action1 from "../../store/actionCreators/action1";
import action2 from "../../store/actionCreators/action2";
import {useDispatch, useSelector} from "react-redux";

function Info({row,open,comments = [],setOpen}){
    const dispatch = useDispatch()
    const dataHistory = useSelector((state)=>state.comments.children.find(item=>item.id===row))
    const loading = useSelector((state)=>state.comments.loading)
    const currentId = useSelector((state)=>state.comments.children)
    const [commentTitle,setCommentTitle] = useState({})
    const {roles} = useContext(AppContext)
    useEffect(()=>{
        const findCurrentId = currentId.find(item=>item.id===row)
        if(!findCurrentId){
            dispatch(action1(row))
        }
    },[])
    const changeInput=(e)=>{
        setCommentTitle({[e.target.name]:e.target.value})
    }
    const onClickComment = async (e)=>{
        e.preventDefault()
        try{
            const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
            const getNickName = JSON.parse(roles);
            const commentObject = {pcId:row,
                nickname: getNickName.login,
                added:currentDate,...commentTitle}
            dispatch(action2(commentObject,row))
        }
        catch (e) {

        }
    }
    const onCloseSidebar=()=>{
        setOpen(false)
    }
    const onDeleteComment=async (id)=>{
        try{
            // setComments(prev=>prev.filter(item=>item.comment_id !== id))
            await axios({
                method:'DELETE',
                url:'http://localhost:8080/deleteComment',
                data:{
                    id
                }
            })
        }catch (e) {
            console.log(e)
        }

    }
    if(loading){
        return <div>Загрузка....</div>
    }
    return(
        <div className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`} onClick={onCloseSidebar}>
            <div className={styles.sidebar} onClick={(e)=>e.stopPropagation()}>
                <div className={styles.header}>
                    <button onClick={onCloseSidebar}>
                        Закрыть
                    </button>
                </div>
                <div className={styles.wrapper}>
                        <div className={styles.move}>
                        <span>История переездов</span>
                        {dataHistory?.history.length ? (
                            dataHistory?.history.map(history=>(
                                        <div key={history.history_id} className={styles.moving}>
                                            <div>Номер истории:{history.history_id}</div>
                                            <div>Отделение:{history.department}</div>
                                            <div>Кабинет:{history.previous}</div>
                                        </div>
                                    )
                                )
                        ):(
                            <div>Нет данных</div>
                        )}
                    </div>
                        <div className={styles.comments}>
                            <span>Комментарии</span>
                            {dataHistory?.comment.length ? (
                               dataHistory.comment.map((comment,idx)=>(
                                        <div key={idx} className={styles.comment}>
                                            <div className={styles.headerBlock}>
                                                <div>{comment.nickname}</div>
                                                <div>{dayjs(comment.added).format('YYYY-MM-DD HH:mm:ss')}</div>
                                                {JSON.parse(roles).login === comment.nickname ? <div className={styles.delete} onClick={()=>onDeleteComment(comment.comment_id)}>
                                                    <img src="btn-remove.svg" alt="Удалить"/>
                                                </div> : ''}
                                            </div>
                                            <div className={styles.message}>{comment.title}</div>
                                        </div>
                                    ))
                            ):(
                                <div>Нет данных</div>
                            )}
                            <form action="">
                                <input type="text" onChange={changeInput} name="title"/>
                                <button onClick={onClickComment}>Подтвердить</button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    )
}


export default Info