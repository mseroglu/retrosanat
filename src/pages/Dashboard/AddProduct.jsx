import { useEffect, useState } from "react"
import Container from "../../components/Container"
import { uploadImage } from "../../db-operations/imageToFirestore"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../../db-operations/config"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import CATEGORIES from "../../constants/categories"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../../constants/ActionTypes"


const AddProduct = () => {
   const { editProduct } = useSelector(store => store.editProduct)
   const [isLoading, setIsLoading] = useState(false)
   const [imagesUrl, setImagesUrl] = useState([])
   const [subCategories, setSubCategories] = useState([])
   const [subCategory, setSubCategory] = useState("")


   const dispatch = useDispatch()

   const handleCategorySelect = (e) => {
      const selected = e.target.value
      const found = CATEGORIES.find(item => item.key === selected)
      setSubCategories(found?.subs || [])
   }

   useEffect(() => {
      const found = CATEGORIES.find(item => item.key === editProduct?.category)
      setSubCategories(found?.subs || [])
      setSubCategory(editProduct?.subCategory||"")      
   }, [editProduct])
   
   useEffect(()=>{

   },[subCategories])


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
         dataObj["title"] = dataObj["title"].toLocaleLowerCase()
         dataObj["description"] = dataObj["description"].toLocaleLowerCase()
         // string verileri, numbera çeviriyoruz
         dataObj["price"] = +dataObj["price"]
         dataObj["stock"] = +dataObj["stock"]
         dataObj["indexMainImage"] = +dataObj["indexMainImage"]
         // storage a eklenen fotoların linklerini ekliyoruz
         dataObj["photos"] = files
         // string olarak gelen tagları Arraya dönüştürüyoruz
         let tags = dataObj["tags"].toLocaleLowerCase().split(",")
         tags = tags.map(tag => tag.trim())
         tags = tags.filter(tag => tag != "")

         dataObj["tags"] = tags

         if (editProduct) {
            // fotolar değişmeyecek
            delete dataObj["photos"]
            // 3- ürünü güncelle
            const docRef = doc(db, "products", editProduct.id)
            await updateDoc(docRef, dataObj)
            toast.success("Ürün başarıyla güncellendi..")
            dispatch({ type: ActionTypes.EDIT_PRODUCT, payload: null })
         } else {
            // oluşturma tarihi ekliyoruz
            dataObj["created_at"] = serverTimestamp()
            // 3- yeni ürünü firebase ekle
            const productCollection = collection(db, "products")
            const res = await addDoc(productCollection, dataObj)
            toast.success("Ürün başarıyla kaydedildi.")

            // ürünün firebase id sini ekleyip state kaydediyoruz
            dataObj["id"] = res?.id
            dispatch({ type: ActionTypes.DASHBOARD_PRODUCTS_NEWADD, payload: dataObj })
         }
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
         toast.warn("En fazla 4 dosya seçebilirsiniz!")
         e.target.value = ''
      } else {
         const urlList = images.map(item => URL.createObjectURL(item))
         setImagesUrl(urlList)
      }
   }

   useEffect(() => {
      editProduct && setImagesUrl(editProduct.photos)
   }, [editProduct])

   return (
      <div className="grid place-items-center bg-image ">
         <form onSubmit={handleSubmit} className="flex flex-col w-5/6 md:w-[400px] gap-3 border-2 rounded-lg shadow-lg p-3 relative bg-white">

            {isLoading && <Loader stil="absolute top-20" />}

            <h2 className="text-center font-bold bg-yellow-300 py-1 rounded-t-md">
               {editProduct ? "Ürün Düzenle" : "Yeni Ürün"}
            </h2>

            <div className="flex flex-col">
               <label htmlFor="title">Ürün Adı</label>
               <input id="title" name="title" type="text" required
                  defaultValue={editProduct ? editProduct.title : ""}
                  className="border px-2 py-1 rounded-md text-sm" />
            </div>

            {/* KATEGORİLER */}
            <div className="flex flex-col">
               <label htmlFor="categories">Kategori</label>
               <select name="category" className=" border px-2 py-1 rounded-md text-sm"
                  defaultValue={editProduct ? editProduct.category : ""} onChange={handleCategorySelect} >
                  <option value="">Kategori Seçiniz</option>
                  {
                     CATEGORIES.map((item) => (<option key={item.key} value={item.key} >{item.value}</option>))
                  }
               </select>
            </div>

            {/* ALT KATEGORİLER */}
            <div className="flex flex-col">
               <label htmlFor="subCategory">Alt Kategori</label>
               <select name="subCategory" className="border px-2 py-1 rounded-md text-sm capitalize"
                  value={subCategory} onChange={(e)=> setSubCategory(e.target.value)}>
                  <option value="">Alt Kategori Seçiniz</option>
                  {
                     subCategories.map((item) => {
                        return <option key={item.key} value={item.key} className="capitalize" >{item.value}</option>
                     })
                  }
               </select>
            </div>

            <div className="flex flex-col">
               <label htmlFor="tags">Etiketler (max 4)</label>
               <input id="tags" name="tags" required placeholder="cam, boya, fırça"
                  className="border px-2 py-1 rounded-md text-sm "
                  defaultValue={editProduct ? editProduct.tags?.join(", ") : ""} />
            </div>

            <div className="flex flex-col">
               <label htmlFor="description">Açıklama</label>
               <textarea id="description" name="description" defaultValue={editProduct ? editProduct.description : ""}
                  className="border px-2 py-1 rounded-md text-sm" />
            </div>

            <div className="flex flex-col">
               <label htmlFor="stock">Stok</label>
               <input id="stock" type="number" name="stock" defaultValue={editProduct ? editProduct.stock : 1} className="border px-2 py-1 rounded-md text-sm" />
            </div>

            <div className="flex flex-col">
               <label htmlFor="price">Fiyat</label>
               <input id="price" name="price" type="number" defaultValue={editProduct ? editProduct.price : 0} className="border px-2 py-1 rounded-md text-sm" />
            </div>

            {
               !editProduct && (
                  <div className="flex flex-col">
                     <label htmlFor="photos">Resim (Max 4 adet)</label>
                     <input id="photos" name="photos" type="file" multiple accept=".jpeg, .jpg, .png, .bmp, .webp" onChange={handleImageAdd}
                        className="border px-2 py-1 rounded-md text-sm" />
                  </div>
               )
            }

            <div className="flex flex-col gap-3">
               {
                  imagesUrl?.length != 0 && (
                     <>
                        <label >Anasayfa akışında göstermek için bir resim seçiniz</label>
                        <div className="flex gap-3 w-full h-10">
                           {
                              imagesUrl?.map((url, i) => (
                                 <div key={url} className="flex gap-1">
                                    <input type="radio" name="indexMainImage" value={i}
                                       defaultChecked={editProduct?.indexMainImage == i} />
                                    <img src={url} alt="image" className="h-full" />
                                 </div>))
                           }
                        </div>
                     </>)
               }
            </div>

            <button type="submit" disabled={isLoading} className="font-semibold border-2 px-5 py-1 mt-3 rounded-md hover:bg-slate-800 hover:text-white transition w-fit self-center disabled:bg-yellow-400">
               Gönder</button>
         </form>
      </div>
   )
}

export default AddProduct
