import { combineReducers, createStore, applyMiddleware } from "redux"
import productReducer from "./Reducers/productReducer"
import editProductReducer from "./Reducers/editProductReducer"
import dashboardReducer from "./Reducers/dashboardReducer"
import { thunk } from "redux-thunk"

   
   const rootReducer = combineReducers({
      products: productReducer,
      editProduct: editProductReducer,
      dashboard: dashboardReducer
   })
   

export default createStore(rootReducer, applyMiddleware(thunk))