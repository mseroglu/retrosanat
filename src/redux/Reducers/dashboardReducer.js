import ActionTypes from "../../constants/ActionTypes";

const initialState = {
   isLoading: false,
   error: null,
   products_dash: [],
   lastItem: null

}

const dashboardReducer = (state = initialState, action) => {
   
   switch (action.type) {

      case ActionTypes.DASHBOARD_PRODUCTS_LOADING:
         return { ...state, isLoading: true };

      case ActionTypes.DASHBOARD_PRODUCTS_ERROR:
         return { ...state, isLoading: false, error: action.payload };

      case ActionTypes.DASHBOARD_PRODUCTS_SUCCESS:

         return { ...state, isLoading: false, error: null, products_dash: action.payload };

      default:
         return state;
   }
}

export default dashboardReducer
