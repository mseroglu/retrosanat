import { combineReducers, createStore } from "redux"
import productReducer from "./Reducers/productReducer"
import editProductReducer from "./Reducers/editProductReducer"


   
   const rootReducer = combineReducers({
      products: productReducer,
      editProduct: editProductReducer
   })
   

export default createStore(rootReducer)