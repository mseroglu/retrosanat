import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import productReducer from "./Reducers/productReducer"
import editProductReducer from "./Reducers/editProductReducer"
import dashboardReducer from "./Reducers/dashboardReducer"
import { thunk } from "redux-thunk"
import campaignsReducer from "./Reducers/campaignReducer"

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
   
   const rootReducer = combineReducers({
      products: productReducer,
      editProduct: editProductReducer,
      dashboard: dashboardReducer,
      campaigns: campaignsReducer,
   })
   

export default createStore(rootReducer, enhancer)
//export default createStore(rootReducer, applyMiddleware(thunk))