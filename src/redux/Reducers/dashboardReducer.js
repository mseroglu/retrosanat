import ActionTypes from "../../constants/ActionTypes";

const initialState = {
   isLoading: false,
   error: null,
   products: [],
   lastVisible: null,
   hasDoc: true
}

const dashboardReducer = (state = initialState, { type, payload }) => {
   //console.log("dashboardReducer state: ", type, payload)

   switch (type) {
      case ActionTypes.DASHBOARD_PRODUCTS_LOADING:
         return { ...state, isLoading: true };

      case ActionTypes.DASHBOARD_PRODUCTS_ERROR:
         return { ...state, isLoading: false, error: payload };

      case ActionTypes.DASHBOARD_PRODUCTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
            products: [...state.products, ...payload.products],
            lastVisible: payload.lastVisible,
            hasDoc: payload.hasDoc,
         };

      case ActionTypes.DASHBOARD_PRODUCT_DEL:
         const filtered = state.products.filter(item => item.id !== payload)
         return {
            ...state,
            isLoading: false,
            error: null,
            products: filtered,
         };

      case ActionTypes.DASHBOARD_PRODUCT_UPDATE:
         const updateItems = state.products.map(item => item.id == payload.id ? payload : item)
         return {
            ...state,
            isLoading: false,
            error: null,
            products: updateItems,
         };

      case ActionTypes.DASHBOARD_PRODUCT_NEWADD:
         
         return {
            ...state,
            isLoading: false,
            error: null,
            products: [payload, ...state.products],
         };

      case ActionTypes.DASHBOARD_PRODUCTS_ADD_CAMPAIGN:
         const updated = state.products.map(item => {
            if (payload.selectedProducts.includes(item.id)) {
               item["campaignId"] = payload.campaignId
            }
            return item
         })
         return {
            ...state,
            isLoading: false,
            error: null,
            products: updated,
         };

      default:
         return state;
   }
}

export default dashboardReducer
