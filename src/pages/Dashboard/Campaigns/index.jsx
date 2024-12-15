import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../db-operations/config"
import ListItem from "./ListItem"
import AddItem from "./AddItem"
import { CgAdd } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../../../constants/ActionTypes"


const Campaigns = () => {
   const { campaigns } = useSelector(store => store.campaigns)
   //const [campaigns, setCampaigns] = useState([])
   const [isOpenAddArea, setIsOpenAddArea] = useState(false)

   const dispatch = useDispatch()

   const campaignsColl = collection(db, "campaigns")

   useEffect(() => {
      const result = []
      const q = query(campaignsColl, orderBy("endDate", "desc"))

      getDocs(q).then(res => {
         res.forEach(item => result.push({ ...item.data(), id: item.id }))
         dispatch({type:ActionTypes.CAMPAIGNS_SUCCESS, payload: result})
      })
   }, [])


   return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                  <th scope="col" className="px-6 py-3">
                     Kampanya Adı
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                     İndirim %
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                     Durum
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                     Başlangıç Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Bitiş Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                     <span className={`flex gap-1 py-1 w-fit hover:text-yellow-300 cursor-pointer items-center transition ${isOpenAddArea && "text-white"}`} onClick={()=> setIsOpenAddArea(prev=> !prev)}>
                        <CgAdd className="text-lg " />
                        Ekle
                     </span>
                  </th>
               </tr>
            </thead>

            <tbody className="capitalize">
               {
                  isOpenAddArea && <AddItem setIsOpenAddArea={setIsOpenAddArea} />
               }
               {
                  campaigns?.map(item => <ListItem key={item.id} item={item} />)
               }
            </tbody>
         </table>
      </div>

   )
}

export default Campaigns
