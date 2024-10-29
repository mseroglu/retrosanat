import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";


export const uploadImage = async (file) => {
   // dosya yoksa veya image değilse durdur
   if (!file?.type.startsWith("image") || !file ) return null

   try {
      const imageRef = ref(storage, uuidv4())
      await uploadBytes(imageRef, file)
      return getDownloadURL(imageRef)
   } catch (error) {
      toast.error("Görsel yüklenirken bir hata oluştu!  " + error.code, {position: "bottom-right"})
   }
}


export const delImage = async (filePath) => {
   /* 
   const lastIndex = filePath?.lastIndexOf("/")
   const index = filePath?.indexOf("?")
   let filename = filePath?.slice(lastIndex + 1, index)
   filename = decodeURIComponent(filename)
   */
   await deleteObject(ref(storage, filePath))
      .then(() => toast.success("Fotoğraf silindi."))
      .catch(() => toast.error("Fotoğraf silinemedi.."))
}

