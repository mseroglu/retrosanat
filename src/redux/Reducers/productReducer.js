import ActionTypes from "../../constants/ActionTypes";

const initialState = {
   isLoading: false,
   error: null,
   products: [],
   selectedCategory: null,
   selectedTag: null,
   lastVisible: null,
   hasDoc: true,
}

const productReducer = (state = initialState, { type, payload }) => {
   console.log("REDUCERA YENİ GELEN: ", type, payload)

   switch (type) {

      case ActionTypes.PRODUCTS_LOADING:
         return { ...state, isLoading: true };

      case ActionTypes.PRODUCTS_ERROR:
         return { ...state, isLoading: false, error: payload };

      case ActionTypes.PRODUCTS_SUCCESS:
         return {
            ...state, isLoading: false, error: null,
            products: state.hasDoc ? [...state.products, ...payload.products] : payload.products,
            hasDoc: payload.hasDoc,
            lastVisible: payload.lastVisible
         };
         
      case ActionTypes.SELECTED_CATEGORY:
         return {
            ...state, isLoading: false, error: null, selectedTag: null,
            lastVisible: null, hasDoc: true, products: [], selectedCategory: payload
         };

      case ActionTypes.SELECTED_TAG:
         return {
            ...state, isLoading: false, error: null, selectedCategory: null,
            lastVisible: null, hasDoc: true, products: [], selectedTag: payload
         };

      case ActionTypes.SELECTED_SORT:
         return {
            ...state, products: [], hasDoc: true, lastVisible: null
         };

      default:
         return state;
   }
}

export default productReducer
