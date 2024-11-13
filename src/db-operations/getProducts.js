import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "./config";
import ActionTypes from "../constants/ActionTypes";


export const getProducts = (sorting, dispatch, selectedCategory, selectedTag) => {

   // collection un referansı
   const productsColl = collection(db, "products")
   // sorgu ayarları
   let q;
   if (selectedCategory) {
      q = query(productsColl,
         where("category", "==", selectedCategory),
         orderBy(...sorting),
         limit(30))
   } else if (selectedTag) {
      q = query(productsColl,
         where("tags", "array-contains", selectedTag.toLocaleLowerCase()),
         orderBy(...sorting),
         limit(30))
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


export const getProductsPagination = async () => {

   // collection un referansı
   const productsColl = collection(db, "products")

   let first = query(productsColl, orderBy("created_at", "desc"), limit(5))

   const result = []
   let last = null
   // ürünleri alma
   try {
      const docSnapshot = await getDocs(first)
      docSnapshot.forEach(item => result.push({ ...item.data(), id: item.id }))
      last = docSnapshot.docs[docSnapshot.docs.length - 1]
      console.log("las: ", last)
      console.log(result)
   } catch (error) {
      console.log(err)
   }
   return last
}

export const getProductsPaginationNext = async (previousLast) => {

   // collection un referansı
   const productsColl = collection(db, "products")

   let after = query(productsColl, orderBy("created_at", "desc"), startAfter(previousLast), limit(5))

   const result = []
   let last = null
   // ürünleri alma
   try {
      const docSnapshot = await getDocs(after)
      docSnapshot.forEach(item => result.push({ ...item.data(), id: item.id }))
      last = docSnapshot.docs[docSnapshot.docs.length - 1]
      console.log("las: ", last)
      console.log(result)
   } catch (error) {
      console.log(err)
   }
   
}