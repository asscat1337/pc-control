import axios from "axios";
import {addComment} from "../reducers/reducer";


 function action2(comment,row) {
    return dispatch=>{
         axios.post('http://localhost:8080/addComment',comment)
             .then(()=>dispatch(addComment({comment,row})))
    }

}
export default action2