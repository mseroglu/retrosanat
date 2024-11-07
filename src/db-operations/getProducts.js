import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./config";
import ActionTypes from "../constants/ActionTypes";


export const getProducts = (sorting, dispatch, selectedCategory) => {

   // collection un referansı
   const productsColl = collection(db, "products")
   // sorgu ayarları
   let q;
   if (selectedCategory) {
      q = query(productsColl, where("category", "==", selectedCategory), limit(30))
   } else {
      q = query(productsColl, orderBy(...sorting), limit(30))
   }

   const result = []
   // ürünleri alma
   dispatch({ type: ActionTypes.PRODUCTS_LOADING })
   getDocs(q)
      .then(res => {
         res.forEach(item => result.push({ ...item.data(), id: item.id }))
         dispatch({ type: ActionTypes.PRODUCTS_SUCCESS, payload: result })
      })
      .catch(err => {
         dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code })
      })
}