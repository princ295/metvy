import produce from "immer"

const initialReducerState = {
  data: [],
  visible: false,
  remarkData: []
}

export const reducer = produce((draft, action) => {
  switch(action.type){
    case "SET_TABLE_DATA":
      draft.data = action.payload;
      console.log('redux trigger...')
      break;
    case "OPEN_MODAL": 
      draft.visible = true;
      break
    case "CLOSE_MODAL": 
      draft.visible = false;
      break
    case "REMARK_OBJECT":
        draft.remarkData = action.payload;
        draft.visible = false;
      break
    default: 
      break;
  }
},initialReducerState)