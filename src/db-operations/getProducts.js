import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./config";
import ActionTypes from "../constants/ActionTypes";


export const getProducts = (sorting, dispatch, selectedCategory, selectedTag) => {
   
   // collection un referansı
   const productsColl = collection(db, "products")
   // sorgu ayarları
   let q;
   if (selectedCategory) {
      q = query(productsColl, where("category", "==", selectedCategory), limit(30))
      console.log("category çalıştı")
   } else if (selectedTag) {
      q = query(productsColl, where("tags", "array-contains", selectedTag.toLocaleLowerCase()), limit(30))
      console.log("tag çalıştı")
   } else {
      q = query(productsColl, orderBy(...sorting), limit(30))
      console.log("category ve tag olayınca else çalıştı")
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