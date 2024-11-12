import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


export const uploadImage = async (file) => {
   // dosya yoksa veya image değilse durdur
   if (!file?.type.startsWith("image") || !file) return null

   try {
      const imageRef = ref(storage, uuidv4())
      await uploadBytes(imageRef, file)
      return getDownloadURL(imageRef)
   } catch (error) {
      toast.error("Görsel yüklenirken bir hata oluştu!  " + error.code)
   }
}


export const delImage = async (filePath) => {
   await deleteObject(ref(storage, filePath))
}

