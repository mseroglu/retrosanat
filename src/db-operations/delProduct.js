import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./config"
import { delImage } from "./imageToFirestore"
import { toast } from "react-toastify"


const delProduct = async (product) => {

   try {
      const res = await deleteDoc(doc(db, "products", product.id))
      console.log(res)
      toast.success("Ürün silindi..")
   } catch (err) {
      toast.error("Ürün silinemedi!.. ")
   }

   try {
      product.photos.forEach(photo => {
         delImage(photo)
      })
      toast.success("Ürün fotoğrafları silindi.")
   }
   catch (err) {
      toast.error("Ürün fotoğrafları silinemedi !..")
   }
}

export default delProduct