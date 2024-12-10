import ActionTypes from "../../constants/ActionTypes";

const initialState = {
   editProduct: null,
   editCampaign: null
}


const editProductReducer = (state = initialState, action) => {

   switch (action.type) {
      case ActionTypes.EDIT_PRODUCT:         
         return {...state, editProduct: action.payload };

      case ActionTypes.EDIT_CAMPAIGN:         
         return {...state, editCampaign: action.payload };
   
      default:
         return state;
   }

}

export default editProductReducer