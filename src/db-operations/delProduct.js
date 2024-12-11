import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./config"
import { delImage } from "./imageToFirestore"
import { toast } from "react-toastify"


export const delCampaign = async (id) => {
   try {
      await deleteDoc(doc(db, "campaigns", id))
      toast.success("Kampanya silindi..")
   } catch (err) {
      toast.error("Kampanya silinemedi!.. " + err.code)
   }
}


const delProduct = async (product) => {

   try {
      await deleteDoc(doc(db, "products", product.id))
      toast.success("Ürün silindi..")
   } catch (err) {
      toast.error("Ürün silinemedi!.. ")
   }

   try {
      product.photos.forEach(photo => {
         delImage(photo)
      })
   }
   catch (err) {
      toast.error("Ürün fotoğrafları silinemedi !..")
   }
}

export default delProduct