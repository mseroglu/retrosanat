import ActionTypes from "../../constants/ActionTypes";

const initialState = {
   isLoading: false,
   error: null,
   products: [],
   lastVisible: null,
   hasDoc: true
}

const dashboardReducer = (state = initialState, action) => {
   //console.log("dashboardReducer state: ", action.payload)

   switch (action.type) {
      case ActionTypes.DASHBOARD_PRODUCTS_LOADING:
         return { ...state, isLoading: true };

      case ActionTypes.DASHBOARD_PRODUCTS_ERROR:
         return { ...state, isLoading: false, error: action.payload };

      case ActionTypes.DASHBOARD_PRODUCTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
            products: [...state.products, ...action.payload.products],
            lastVisible: action.payload.lastVisible,
            hasDoc: action.payload.hasDoc,
         };

      case ActionTypes.DASHBOARD_PRODUCTS_UPDATE:
         return {
            ...state,
            isLoading: false,
            error: null,
            products: action.payload,
         };

      case ActionTypes.DASHBOARD_PRODUCTS_NEWADD:
         return {
            ...state,
            isLoading: false,
            error: null,
            products: [action.payload, ...state.products],
         };

      default:
         return state;
   }
}

export default dashboardReducer
