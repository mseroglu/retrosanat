import ActionTypes from "../../constants/ActionTypes";

const initialState = {
   isLoading: false,
   error: null,
   products: [],
   selectedCategory: null

}

const productReducer = (state = initialState, action) => {
   console.log(action)

   switch (action.type) {

      case ActionTypes.PRODUCTS_LOADING:
         return { ...state, isLoading: true };

      case ActionTypes.PRODUCTS_ERROR:
         return { ...state, isLoading: false, error: action.payload };

      case ActionTypes.PRODUCTS_SUCCESS:
         return { ...state, isLoading: false, error: null, products: action.payload };

      case ActionTypes.SELECTED_CATEGORY:
         return { ...state, isLoading: false, error: null, selectedCategory: action.payload };

      default:
         return state;
   }
}

export default productReducer
