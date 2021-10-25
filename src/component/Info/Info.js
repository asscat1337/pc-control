import {useEffect,useState,useContext} from 'react'
import styles from './Info.module.scss'
import axios from "axios";
import AppContext from "../../hooks/context";
import dayjs from "dayjs";

function Info({row,open,ClickInfo,setOpen}){
    const [loading,setLoading] = useState(true);
    const [dataHistory,setDataHistory] = useState([])
    const [comments,setComments] = useState([])
    const [commentTitle,setCommentTitle] = useState({})
    const {roles} = useContext(AppContext)
    useEffect(()=>{
        async function fetchData() {
            const [History,Comment] = await Promise.all([
                axios.get(`http://localhost:8080/showHistory/${row}`),
                axios.get(`http://localhost:8080/showComments/${row}`)
            ])
            setDataHistory(History.data)
            setComments(Comment.data)
            setLoading(false)
        }
        fetchData()
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
            setComments(prev=>[...prev,commentObject])
            await axios.post('http://localhost:8080/addComment',commentObject)
        }
        catch (e) {

        }
    }
    const onCloseSidebar=()=>{
        setOpen(false)
    }
    return(
        <div className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`} onClick={onCloseSidebar}>
            <div className={styles.sidebar} onClick={(e)=>e.stopPropagation()}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <button onClick={onCloseSidebar}>
                            Закрыть
                        </button>
                    </div>
                    <div className={styles.moving}>
                        <span>История переездов</span>
                        {dataHistory.map(history=>(
                            <div key={history.history_id}>
                                <div>Номер истории:{history.history_id}</div>
                                <div>Отделение:{history.department}</div>
                                <div>Кабинет:{history.previous}</div>
                            </div>
                        )
                        )}
                    </div>
                    <div className={styles.comments}>
                        <span>Комментарии</span>
                        {comments.map((comment,idx)=>(
                            <div key={idx} className={styles.comment}>
                                <div>{comment.nickname}</div>
                                <div>{dayjs(comment.added).format('YYYY-MM-DD HH:mm:ss')}</div>
                                <div>{comment.title}</div>
                            </div>
                        ))}
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