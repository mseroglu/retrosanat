import { createStore } from "redux"
import productReducer from "./Reducers/productReducer"

{/*   birden fazla reducer olursa bu şekilde olacak ve abonelikler de değişecek
   
   const rootReducer = combineReducers({
      products: productReducer
   })
   */}

export default createStore(productReducer)