import { useRef, useState } from "react"
import Container from "../components/Container"
import { uploadImage } from "../firebase_/imageToFirestore"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase_/config"
import { toast } from "react-toastify"
import Loader from "../components/Loader"


const SaveProduct = () => {
   const formRef = useRef()
   const [isLoading, setIsLoading] = useState(false)
   const productCollection = collection(db, "products")

   const handleSubmit = async (e)=>{
      e.preventDefault()
      // 1- input verilerine eriş
      const data = new FormData(formRef.current)
      const dataObj = Object.fromEntries(data.entries())
      console.log(dataObj)
      try {
         // 2- resim yükle
         setIsLoading(true)
         console.log(dataObj.foto)
         const fotoUrl = await uploadImage(dataObj.foto)

         // string verileri, numbera çeviriyoruz
         dataObj["price"] = +dataObj["price"]
         dataObj["stock"] = +dataObj["stock"]
         dataObj["foto"] = fotoUrl
         dataObj["created_at"] = serverTimestamp()
         
         // 3- yeni ürünü ekle
         await addDoc(productCollection, dataObj)
         toast.success("Ürün başarıyla keydedildi", { position: "bottom-right" })
         // 4- formu sıfırla
         e.target.reset()

      } catch (error) {
         toast.error("Kaydetme işlemi başarısız oldu. HATA: " + error.code, { position: "bottom-right" })
      }
      setIsLoading(false)

   }

   return (
      <Container stil="flex-grow mt-10 py-20 grid place-items-center">         
         <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col w-5/6 md:w-[400px] gap-3 border-2 rounded-lg shadow-lg p-3 relative">
            {isLoading && <Loader stil="absolute top-20"/>}
            <h2 className="text-center font-bold">Yeni Ürün</h2>
            <div className="flex flex-col">
               <label htmlFor="title">Ürün Adı</label>
               <input id="title" name="title" type="text" required className="border px-2 py-1 rounded-md"/>
            </div>
            <div className="flex flex-col">
               <label htmlFor="description">Açıklama</label>
               <textarea id="description" name="description" className="border px-2 py-1 rounded-md"/>
            </div>
            <div className="flex flex-col">
               <label htmlFor="stock">Stok</label>
               <input id="stock" type="number" name="stock" defaultValue={1} className="border px-2 py-1 rounded-md"/>
            </div>
            <div className="flex flex-col">
               <label htmlFor="price">Fiyat</label>
               <input id="price" name="price" type="number" defaultValue={0} className="border px-2 py-1 rounded-md"/>
            </div>
            <div className="flex flex-col">
               <label htmlFor="foto">Resim</label>
               <input id="foto" name="foto" type="file" accept=".jpeg, .jpg, .png, .bmp, .webp"  className="border px-2 py-1 rounded-md"/>
            </div>
            <button type="submit" className="font-semibold border-2 px-5 py-1 mt-3 rounded-md hover:bg-slate-800 hover:text-white transition w-fit self-center">Gönder</button>
         </form>
      </Container>
   )
}

export default SaveProduct
