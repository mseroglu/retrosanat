import { db } from "../db-operations/config";
import Action from "./ActionTypes"
import { collection, query, where, getDocs } from "firebase/firestore";


export const getProducts = async () => {
   const q = query(collection(db, "cities"), where("capital", "==", true));

   const data = []
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data())
   });

   return { type: Action.PRODUCTS_SUCCESS, payload: data }
}

export const getError = (error) => ({ type: Action.PRODUCTS_ERROR, payload: error })

export const getLoading = (isLoading) => ({ type: Action.PRODUCTS_LOADING })