import ActionTypes from "../ActionTypes";

const initialState = {
   isLoading: false,
   error: null,
   products: [],
   productsCarousel: []
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

      case ActionTypes.PRODUCTS_CAROUSEL_SUCCESS:
         return { ...state, isLoading: false, error: null, productsCarousel: action.payload };
         
      default:
         return state;
   }
}

export default productReducer
