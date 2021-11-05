import {GET_HISTORY,ADD_COMMENT} from "../types";

const initialState = {
    loading:true,
    children:[]
}

export function reducer(state = initialState,action){
        switch (action.type) {
            case GET_HISTORY :
                return {
                    ...state,
                    loading:false,
                    children: [...state.children,{id:action.payload.id,comment: [...action.payload.comment],history:[...action.payload.history]}]
                };
            case ADD_COMMENT :
              return {
                  ...state,
                  children: state.children.map(item=>{
                          if(item.id===action.payload.row){
                              return {
                                  ...item,
                                  comment:[...item.comment,action.payload.comment]
                              }
                          }
                          else{
                              return item
                          }
                  })
              }
            default : return state
        }
}
export const getHistory=(payload)=>({type:GET_HISTORY,payload})
export const addComment=(payload)=>({type:ADD_COMMENT,payload})
