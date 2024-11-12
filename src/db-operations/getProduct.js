import { doc, getDoc } from "firebase/firestore"
import { db } from "./config"
import { toast } from "react-toastify"


const getProduct = async (id) => {

   const docRef = doc(db, "products", id)

   try {
      const data = await getDoc(docRef)
   } catch (err) {
      toast.error("Veri alınamadı! HATA: " + err.code)
      return err
   }
   return data

}