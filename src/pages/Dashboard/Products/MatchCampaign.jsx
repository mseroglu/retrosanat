import dateFormatter from "../../../utils/DateFormatter";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../../db-operations/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ActionTypes from "../../../constants/ActionTypes";


const MatchCampaign = ({ selectedProducts }) => {
   const { campaigns } = useSelector(store => store.campaigns)

   const [selectedCampaign, setSelectedCampaign] = useState('')
   const [selectedCampaignInfo, setSelectedCampaignInfo] = useState({})

   const dispatch = useDispatch()

   // batch işlemleri çoklu collection da aynı anda veri yazma
   const batch = writeBatch(db)

   useEffect(() => {
      const found = campaigns.find(item => item.id == selectedCampaign)
      setSelectedCampaignInfo(found || {})
   }, [selectedCampaign])


   const addCampaignOnProducts = async () => {
      if (selectedProducts.length == 0) {
         return toast.info("Kampanya eklenecek ürün seçimi yapmadınız!")
      }

      if (selectedCampaign) {
         selectedProducts.forEach(id => {
            const refDoc = doc(db, "products", id)
            batch.update(refDoc, { campaignId: selectedCampaign })
         })

         batch.commit()
            .then(res => {
               toast.success("Kampanya seçili tüm ürünlere eklendi.")
               dispatch({
                  type:ActionTypes.DASHBOARD_PRODUCTS_ADD_CAMPAIGN, payload: {campaignId: selectedCampaign, selectedProducts}
               })
            })
            .catch(err => toast.error("Bir sorun oluştu! [batch.commit]: " + err.code))
      } else {
         toast.info("Kampanya seçimi yapmadınız!")
      }
      
   }

   return (
      <div className="flex flex-col gap-2 mb-4">
         <div className="flex gap-2 justify-between">
            <select className="capitalize text-sm border" value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
               <option value={""}>Kampanya seçiniz</option>
               {
                  campaigns.map((item, i) =>
                     <option key={i} value={item.id} >
                        {item.title}
                     </option>)
               }
            </select>

            <button className={`w-fit px-2 py-1 text-sm rounded-md border text-white disabled:bg-gray-300 bg-gray-700 `} disabled={!selectedCampaign} onClick={addCampaignOnProducts}>
               KAYDET
            </button>
         </div>

         {/** Seçili kampanya bilgileri gösterilecek */}
         {
            selectedCampaign !== "" && (
               <div className="bg-yellow-500">
                  <table className="w-full text-xs text-center rtl:text-center text-gray-500 dark:text-gray-400">
                     <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                           <th scope="col" className="px-3">İndirim %</th>
                           <th scope="col" className="px-3">Aktif mi</th>
                           <th scope="col" className="py-1">Başlama T.</th>
                           <th scope="col" className="py-1">Bitiş Tar.</th>
                        </tr>
                     </thead>
                     <tbody className="text-white ">
                        <tr>
                           <th scope="col" className="py-1">{selectedCampaignInfo.discount}</th>
                           <th scope="col " className="py-1">{selectedCampaignInfo.isActive ? "Aktif" : "Pasif"}</th>
                           <th scope="col" className="px-1">{dateFormatter(selectedCampaignInfo.startDate)}</th>
                           <th scope="col" className="px-1">{dateFormatter(selectedCampaignInfo.endDate)}</th>
                        </tr>
                     </tbody>
                  </table>
               </div>
            )
         }
      </div>
   )
}

export default MatchCampaign
