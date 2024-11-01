import ActionTypes from "../ActionTypes";

const initialState = {
   isLoading: false,
   error: null,
   products: []
}

const productReducer = (state = initialState, action) => {
   switch (action.type) {
      case ActionTypes.PRODUCTS_LOADING:
         return { ...state, isLoading: true };
      case ActionTypes.PRODUCTS_ERROR:
         return { ...state, isLoading: false, error: action.payload };
      case ActionTypes.PRODUCTS_SUCCESS:
         return { ...state, isLoading: false, products: action.payload };
      default:
         return state;
   }
}

export default productReducer
