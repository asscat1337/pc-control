import axios from 'axios'
import {getHistory} from '../reducers/reducer'

 function action1(value){
     return dispatch=>{
             axios.get(`http://localhost:8080/showDetails/${value}`)
                 .then(data=>dispatch(getHistory({id:value,...data.data})))
     }
}
export default action1