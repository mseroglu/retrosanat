import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./config"
import { delImage } from "./imageToFirestore"
import { toast } from "react-toastify"


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