import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"

import { toast } from "react-toastify"
import Loader from "../../../components/Loader"
import { useDispatch } from "react-redux"
import ActionTypes from "../../../constants/ActionTypes"
import { db } from "../../../db-operations/config"


const AddCampaign = () => {
   const [isLoading, setIsLoading] = useState(false)

   const dispatch = useDispatch()


   const handleSubmit = async (e) => {
      e.preventDefault()
      // 1- input verilerine eriş
      const data = new FormData(e.target)
      const dataObj = Object.fromEntries(data.entries())

      try {
         setIsLoading(true)

         dataObj["title"] = dataObj["title"].toLocaleLowerCase()
         // string verileri, numbera çeviriyoruz
         dataObj["discount"] = +dataObj["discount"]
         dataObj["isActive"] = dataObj["isActive"] == "true" ? true : false

         // 3- yeni ürünü firebase ekle
         const productCollection = collection(db, "campaigns")
         const res = await addDoc(productCollection, dataObj)
         toast.success("Kampanya başarıyla kaydedildi.")

         dataObj["id"] = res?.id
         dispatch({ type: ActionTypes.CAMPAIGN_ADD, payload: dataObj })
         // 4- formu sıfırla
         e.target.reset()
      } catch (error) {
         toast.error("Kaydetme işlemi başarısız oldu. HATA: " + error.code)
      }
      setIsLoading(false)
   }


   return (
      <div className="grid place-items-center bg-image ">
         <form onSubmit={handleSubmit} className="flex flex-col w-[300px] gap-3 border-2 rounded-lg shadow-lg p-3 relative bg-white">

            {isLoading && <Loader stil="absolute top-20" />}

            <h2 className="text-center font-bold bg-yellow-300 py-1 rounded-t-md">
               Yeni Kampanya
            </h2>

            <div className="flex flex-col">
               <label htmlFor="title">Kampanya Adı</label>
               <input id="title" name="title" type="text" required className="border p-1 text-sm" />
            </div>

            <div className="flex flex-col">
               <label htmlFor="discount">İndirim Oranı %</label>
               <input id="discount" name="discount" type="number" className="border px-2 py-1 rounded-md text-sm" />
            </div>

            <div className="flex flex-col">
               <label htmlFor="startDate">Başlangıç Tarihi</label>
               <input type="datetime-local" name="startDate" id="startDate" defaultValue={new Date().toISOString().slice(0, 11) + "00:00"} className="p-1 text-center border" />
            </div>

            <div className="flex flex-col">
               <label htmlFor="endDate">Bitiş Tarihi</label>
               <input type="datetime-local" name="endDate" id="endDate" defaultValue={new Date().toISOString().slice(0, 11) + "23:59"} className="p-1 text-center border" />
            </div>

            <div className="flex flex-col">
               <label>Durum</label>
               <div className="flex gap-5 justify-evenly border p-1">
                  <span>
                     <input type="radio" name="isActive" id="status1" value={true} defaultChecked={true} />
                     <label htmlFor="status1">Aktif</label>
                  </span>
                  <span>
                     <input type="radio" name="isActive" id="status2" value={false} />
                     <label htmlFor="status2">Pasif</label>
                  </span>
               </div>
            </div>


            <button type="submit" disabled={isLoading} className="font-semibold border-2 px-5 py-1 mt-3 rounded-md hover:bg-slate-800 hover:text-white transition w-fit self-center disabled:bg-yellow-400">
               Gönder</button>
         </form>
      </div>
   )
}

export default AddCampaign
