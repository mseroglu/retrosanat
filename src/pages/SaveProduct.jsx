import { useState } from "react"
import Container from "../components/Container"
import { uploadImage } from "../db-operations/imageToFirestore"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../db-operations/config"
import { toast } from "react-toastify"
import Loader from "../components/Loader"


const SaveProduct = () => {
   const [isLoading, setIsLoading] = useState(false)
   const productCollection = collection(db, "products")

   const handleSubmit = async (e) => {
      e.preventDefault()
      // 1- input verilerine eriş
      const data = new FormData(e.target)
      const dataObj = Object.fromEntries(data.entries())
      // Fotolar çoklu olunca bu şekilde almak gerekiyor
      const allPhotos = data.getAll("photos")
      try {
         // 2- resimleri yükle
         setIsLoading(true)
         const files = []
         for (let a = 0; a < allPhotos.length; a++) {
            const fotoUrl = await uploadImage(allPhotos[a])
            files.push(fotoUrl)
            if (a === 1) break
         }

         // string verileri, numbera çeviriyoruz
         dataObj["price"] = +dataObj["price"]
         dataObj["stock"] = +dataObj["stock"]
         dataObj["photos"] = files
         dataObj["isShowMainPage"] = dataObj["isShowMainPage"] == "on" ? true : false
         dataObj["categories"] = dataObj["categories"].split(",")
         dataObj["created_at"] = serverTimestamp()
         console.log(dataObj)
         // 3- yeni ürünü ekle
         await addDoc(productCollection, dataObj)
         toast.success("Ürün başarıyla keydedildi")
         // 4- formu sıfırla
         e.target.reset()

      } catch (error) {
         toast.error("Kaydetme işlemi başarısız oldu. HATA: " + error.code)
      }
      setIsLoading(false)

   }

   return (
      <Container stil="flex-grow mt-10 py-20 grid place-items-center">
         <form onSubmit={handleSubmit} className="flex flex-col w-5/6 md:w-[400px] gap-3 border-2 rounded-lg shadow-lg p-3 relative">
            {isLoading && <Loader stil="absolute top-20" />}
            <h2 className="text-center font-bold">Yeni Ürün</h2>
            <div className="flex flex-col">
               <label htmlFor="title">Ürün Adı</label>
               <input id="title" name="title" type="text" required className="border px-2 py-1 rounded-md " />
            </div>
            <div className="flex flex-col">
               <label htmlFor="categories">Kategoriler</label>
               <input id="categories" name="categories" required placeholder="cam, boya, fırça " className="border px-2 py-1 rounded-md " />
            </div>
            <div className="flex flex-col">
               <label htmlFor="description">Açıklama</label>
               <textarea id="description" name="description" className="border px-2 py-1 rounded-md" />
            </div>
            <div className="flex flex-col">
               <label htmlFor="stock">Stok</label>
               <input id="stock" type="number" name="stock" defaultValue={1} className="border px-2 py-1 rounded-md" />
            </div>
            <div className="flex flex-col">
               <label htmlFor="price">Fiyat</label>
               <input id="price" name="price" type="number" defaultValue={0} className="border px-2 py-1 rounded-md" />
            </div>
            <div className="flex flex-col">
               <label htmlFor="photos">Resim (Max 2 adet)</label>
               <input id="photos" name="photos" type="file" multiple accept=".jpeg, .jpg, .png, .bmp, .webp" className="border px-2 py-1 rounded-md" />
            </div>
            <div className="flex items-center">
               <input id="isShowMainPage" name="isShowMainPage" type="checkbox"
                  className="border px-2 py-1 rounded-md w-5 h-5" />
               <label htmlFor="isShowMainPage" className="text-[16px] font-normal">Resim anasayfada gösterilsin mi?</label>
            </div>
            <button type="submit" className="font-semibold border-2 px-5 py-1 mt-3 rounded-md hover:bg-slate-800 hover:text-white transition w-fit self-center">Gönder</button>
         </form>
      </Container>
   )
}

export default SaveProduct
