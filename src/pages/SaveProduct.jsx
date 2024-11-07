import { useState } from "react"
import Container from "../components/Container"
import { uploadImage } from "../db-operations/imageToFirestore"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../db-operations/config"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import CATEGORIES from "../constants/categories"


const SaveProduct = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [imagesUrl, setImagesUrl] = useState([])
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
         }
         // string verileri, numbera çeviriyoruz
         dataObj["price"] = +dataObj["price"]
         dataObj["stock"] = +dataObj["stock"]
         dataObj["indexMainImage"] = +dataObj["indexMainImage"]
         // storage a eklenen fotoların linklerini ekliyoruz
         dataObj["photos"] = files
         // string olarak gelen tagları Arraya dönüştürüyoruz
         let tags = dataObj["tags"].toLocaleLowerCase().split(",")
         tags = tags.map(tag=> tag.trim())
         dataObj["tags"] = tags
         // oluşturma tarihi ekliyoruz
         dataObj["created_at"] = serverTimestamp()
         console.log(dataObj)
         // 3- yeni ürünü firebase ekle
         await addDoc(productCollection, dataObj)
         toast.success("Ürün başarıyla keydedildi")
         // 4- formu sıfırla
         e.target.reset()

      } catch (error) {
         toast.error("Kaydetme işlemi başarısız oldu. HATA: " + error.code)
      }
      setIsLoading(false)
   }

   const handleImageAdd = (e) => {
      const images = Array.from(e.target.files)
      if (images.length > 4) {
         toast.warn("En fazla 4 dosya seçebilirsiniz!", { position: "bottom-center" })
         e.target.value = ''
      } else {
         const urlList = images.map(item => URL.createObjectURL(item))
         setImagesUrl(urlList)
      }
   }

   return (
      <Container className="grid place-items-center">
         <form onSubmit={handleSubmit} className="flex flex-col w-5/6 md:w-[400px] gap-3 border-2 rounded-lg shadow-lg p-3 relative">

            {isLoading && <Loader stil="absolute top-20" />}

            <h2 className="text-center font-bold">Yeni Ürün</h2>
            <div className="flex flex-col">
               <label htmlFor="title">Ürün Adı</label>
               <input id="title" name="title" type="text"
                  required className="border px-2 py-1 rounded-md " />
            </div>

            <div className="flex flex-col">
               <label htmlFor="categories">Kategori</label>
               <select name="category" className=" border px-2 py-1 rounded-md">
                  <option value="">Kategori Seçiniz</option>
                  {
                     CATEGORIES.map((item) => {                        
                        return <option key={item.key} value={item.key} > {item.value} </option>
                     })
                  }
               </select>
            </div>

            <div className="flex flex-col">
               <label htmlFor="tags">Etiketler</label>
               <input id="tags" name="tags" required placeholder="cam, boya, fırça " className="border px-2 py-1 rounded-md " />
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
               <label htmlFor="photos">Resim (Max 4 adet)</label>
               <input id="photos" name="photos" type="file" multiple accept=".jpeg, .jpg, .png, .bmp, .webp" onChange={handleImageAdd} className="border px-2 py-1 rounded-md" />
            </div>

            <div className="flex flex-col gap-3">
               {
                  imagesUrl.length != 0 && (
                     <>
                        <label >Anasayfa akışında göstermek için bir resim seçiniz</label>
                        <div className="flex gap-3 w-full h-10">
                           {
                              imagesUrl.map((url, i) => (
                                 <div key={url} className="flex gap-1">
                                    <input type="radio" name="indexMainImage" value={i} />
                                    <img src={url} alt="image" className="h-full" />
                                 </div>))
                           }
                        </div>
                     </>)
               }
            </div>



            <button type="submit" className="font-semibold border-2 px-5 py-1 mt-3 rounded-md hover:bg-slate-800 hover:text-white transition w-fit self-center">Gönder</button>
         </form>
      </Container>
   )
}

export default SaveProduct
