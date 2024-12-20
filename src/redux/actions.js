import ActionTypes from "../constants/ActionTypes";
import { db } from "../db-operations/config";
import { collection, query, where, getDocs, limit, orderBy, startAfter } from "firebase/firestore";


export const getProducts = (sorting, selectedCategory, selectedTag, lastVisible, searchKeyword, selectedSubCategory) => async (dispatch) => {

   console.log({ sorting, selectedCategory, selectedTag, lastVisible, searchKeyword, selectedSubCategory })

   const lim = 20
   // collection un referansı
   const productsColl = collection(db, "products")
   // sorgu ayarları
   let q;
   if (lastVisible) {
      if (selectedSubCategory) {
         console.log("1 çalıştı")
         q = query(productsColl,
            where("subCategory", "==", selectedSubCategory),
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), startAfter(lastVisible), limit(lim))
      } else if (selectedCategory) {
         console.log("2 çalıştı")
         q = query(productsColl,
            where("category", "==", selectedCategory),
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), startAfter(lastVisible), limit(lim))
      } else if (selectedTag) {
         console.log("3 çalıştı")
         q = query(productsColl,
            where("tags", "array-contains", selectedTag.toLocaleLowerCase()),
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), startAfter(lastVisible), limit(lim))
      } else {
         console.log("4 çalıştı")
         q = query(productsColl,
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), startAfter(lastVisible), limit(lim))
      }
   } else {
      if (selectedSubCategory) {
         console.log("5 çalıştı")
         q = query(productsColl,
            where("subCategory", "==", selectedSubCategory),
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), limit(lim))
      } else if (selectedCategory) {
         console.log("6 çalıştı")
         q = query(productsColl,
            where("category", "==", selectedCategory),
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), limit(lim))
      } else if (selectedTag) {
         console.log("7 çalıştı")
         q = query(productsColl,
            where("tags", "array-contains", selectedTag.toLocaleLowerCase()),
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), limit(lim))
      } else {
         console.log("8 çalıştı")
         q = query(productsColl,
            where("title", ">=", searchKeyword),
            where("title", "<", searchKeyword + "\uf8ff"),
            orderBy(...sorting), limit(lim))
      }
   }

   try {
      dispatch({ type: ActionTypes.PRODUCTS_LOADING })

      const snapshot = await getDocs(q)
      const newProd = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // istenen sayıda dökümanın gelirse sonraki sayfa var demektir
      const hasDoc = snapshot.docs.length == lim
      const payload = {
         products: newProd,
         hasDoc,
         // sonraki sayfa varsa bu sayfanın son öğesini referans olarak işaretliyoruz
         lastVisible: hasDoc ? snapshot.docs[snapshot.docs.length - 1] : null,
      }
      dispatch({
         type: ActionTypes.PRODUCTS_SUCCESS,
         payload
      })
   } catch (err) {
      console.log(err)
      dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code })
   }
}

export const getPageProducts = (lastVisible) => async (dispatch) => {
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
