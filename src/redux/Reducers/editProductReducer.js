import ActionTypes from "../../constants/ActionTypes";

const initialState = {
   editProduct: null,
}


const editProductReducer = (state = initialState, action) => {

   switch (action.type) {
      case ActionTypes.EDIT_PRODUCT:         
         return {...state, editProduct: action.payload };
   
      default:
         return state;
   }

}

export default editProductReducer