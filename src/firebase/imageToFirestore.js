import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";


export const getData = async ()=> {
     // collection un referansı
      const productsColl = collection(db, "products")
       // sorgu ayarları 
       const q = query(productsColl, orderBy("created_at", "desc"), limit(3))
    
       
       // tüm ürünleri alma
      const data = await getDocs(q) 
      const liste = data.map(item => item.data())   
      return liste  
   
}

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


const data = [
   {
     id: 1,
     title: "ürün adı 2",
     description: "ürün açıklaması Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ipsa.",
     amount: 10,
     price: 100,
     foto: "art-5.jpg"
   },
   {
     id: 2,
     title: "ürün adı 2",
     description: "ürün açıklaması Lorem ipsum dolor sit amet.",
     amount: 10,
     price: 100,
     foto: "art-4.jpg"
   },
   {
     id: 3,
     title: "ürün adı ürün adı ürün adı ürün adı ürün adı 3",
     description: "ürün açıklaması Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ipsa.",
     amount: 110,
     price: 150,
     foto: "art-3.jpg"
   }
 ]