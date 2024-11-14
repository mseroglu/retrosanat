import { combineReducers, createStore } from "redux"
import productReducer from "./Reducers/productReducer"
import editProductReducer from "./Reducers/editProductReducer"
import dashboardReducer from "./Reducers/dashboardReducer"



   
   const rootReducer = combineReducers({
      products: productReducer,
      editProduct: editProductReducer,
      dashboard: dashboardReducer
   })
   

export default createStore(rootReducer)