import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { db } from "../../../db-operations/config"
import ListItem from "./ListItem"
import AddItem from "./AddItem"
import { CgAdd } from "react-icons/cg"


const Campaigns = () => {
   //const { campaigns } = useSelector(store => store.campaigns)
   const [campaigns, setCampaigns] = useState([])
   const [isOpenAddArea, setIsOpenAddArea] = useState(false)

   const campaignsColl = collection(db, "campaigns")

   useEffect(() => {
      const result = []
      const q = query(campaignsColl, orderBy("endDate", "desc"))

      getDocs(q).then(res => {
         res.forEach(item => result.push({ ...item.data(), id: item.id }))
         setCampaigns(result)
      })
   }, [campaigns])


   return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                  <th scope="col" className="px-6 py-3">
                     Kampanya Adı
                  </th>
                  <th scope="col" className="px-6 py-3">
                     İndirim %
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Durum
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Başlangıç Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Bitiş Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3">
                     <span className={`flex gap-1 py-1 w-fit hover:text-yellow-300 cursor-pointer items-center transition ${isOpenAddArea && "text-white"}`} onClick={()=> setIsOpenAddArea(prev=> !prev)}>
                        <CgAdd className="text-lg " />
                        Ekle
                     </span>
                  </th>
               </tr>
            </thead>

            <tbody className="capitalize">
               {
                  isOpenAddArea && <AddItem campaigns={campaigns} setCampaigns={setCampaigns} setIsOpenAddArea={setIsOpenAddArea} />
               }
               {
                  campaigns?.map(item => <ListItem key={item.id} item={item} campaigns={campaigns} setCampaigns={setCampaigns} />)
               }
            </tbody>
         </table>
      </div>

   )
}

export default Campaigns
