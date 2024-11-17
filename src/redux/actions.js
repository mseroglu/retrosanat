import ActionTypes from "../constants/ActionTypes";
import { db } from "../db-operations/config";
import { collection, query, where, getDocs, limit, orderBy, startAfter } from "firebase/firestore";


export const getProducts = (sorting, selectedCategory, selectedTag, lastVisible) => async (dispatch) => {
   const lim = 20
   // collection un referansı
   const productsColl = collection(db, "products")
   // sorgu ayarları
   let q;
   if (lastVisible) {
      if (selectedCategory) {
         console.log("1 çalıştı")
         q = query(productsColl, where("category", "==", selectedCategory), orderBy(...sorting), startAfter(lastVisible), limit(lim))
      } else if (selectedTag) {
         console.log("2 çalıştı")
         q = query(productsColl, where("tags", "array-contains", selectedTag.toLocaleLowerCase()), orderBy(...sorting), startAfter(lastVisible), limit(lim))
      } else {
         console.log("3 çalıştı")
         q = query(productsColl, orderBy(...sorting), startAfter(lastVisible), limit(lim))
      }
   } else {
      if (selectedCategory) {
         console.log("4 çalıştı")
         q = query(productsColl, where("category", "==", selectedCategory), orderBy(...sorting), limit(lim))
      } else if (selectedTag) {
         console.log("5 çalıştı")
         q = query(productsColl, where("tags", "array-contains", selectedTag.toLocaleLowerCase()), orderBy(...sorting), limit(lim))
      } else {
         console.log("6 çalıştı")
         q = query(productsColl, orderBy(...sorting), limit(lim))
      }

   }

   try {
      dispatch({ type: ActionTypes.PRODUCTS_LOADING })

      const snapshot = await getDocs(q)
      const newProd = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const payload = {
         products: newProd,
         // istenen sayıda dökümanın gelirse sonraki sayfa var demektir
         hasDoc: snapshot.docs.length == lim,
         // sonraki sayfa varsa bu sayfanın son öğesini referans olarak işaretliyoruz
         lastVisible: snapshot.docs.length == lim ? snapshot.docs[snapshot.docs.length - 1] : null,
      }      
      dispatch({
         type: ActionTypes.PRODUCTS_SUCCESS,
         payload
      })
   } catch (err) {
      dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code })
   }
}

export const getPageProducts = (lastVisible) => async (dispatch) => {
   // istenen döküman sayısının bir fazlası çekilir ki bu sayede mevcut sayfa son sayfa mı belirlenir
   const lim = 20

   try {
      let q;
      if (lastVisible) {
         q = query(collection(db, 'products'), orderBy('created_at', 'desc'), startAfter(lastVisible), limit(lim));
      } else {
         q = query(collection(db, 'products'), orderBy('created_at', 'desc'), limit(lim));
      }
      dispatch({ type: ActionTypes.DASHBOARD_PRODUCTS_LOADING })

      const snapshot = await getDocs(q)
      const newProd = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      dispatch({
         type: ActionTypes.DASHBOARD_PRODUCTS_SUCCESS, 
         payload: {
            products: newProd,
            // istenen sayıda dökümanın gelirse sonraki sayfa var demektir
            hasDoc: snapshot.docs.length == lim,
            lastVisible: snapshot.docs.length == lim ? snapshot.docs[snapshot.docs.length - 1] : null,
         }
      })
   } catch (err) {
      dispatch({ type: ActionTypes.DASHBOARD_PRODUCTS_ERROR, payload: err.code })
   }
}
