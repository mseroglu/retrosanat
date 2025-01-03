import { useDispatch, useSelector } from "react-redux"
import { db } from "../../db-operations/config"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ActionTypes from "../../constants/ActionTypes"


const ShowCampaigns = () => {
   const { campaigns } = useSelector(store => store.campaigns)
   const [searchParams, setSearchParams] = useSearchParams()
   const [selectedCampaign, setSelectedCampaign] = useState("")

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const campaignsColl = collection(db, "campaigns")

   useEffect(() => {
      const result = []
      const q = query(campaignsColl, where("isActive", "==", true), orderBy("startDate", "desc"))

      getDocs(q)
         .then(res => {
            res.forEach(item => result.push({ ...item.data(), id: item.id }))
            dispatch({ type: ActionTypes.CAMPAIGNS_SUCCESS, payload: result })
         })
         .catch(err => {
            console.log(err)
            dispatch({ type: ActionTypes.CAMPAIGNS_ERROR, payload: err.code })
         })
   }, [])

   const getCampaignProducts = (campId) => {
      setSelectedCampaign(campId)
   }

   useEffect(() => {
      if (selectedCampaign) {
         navigate("/products?kampanya="+selectedCampaign)
      }
   }, [selectedCampaign])



   return (
      <div className="flex flex-col text-xl gap-2 ">
         <h2 className="font-bold text-3xl text-zinc-600">KAMPANYALAR</h2>
         <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {
               campaigns.map((campaign, i) => (
                  <div key={campaign.id} className="col-span-1 relative cursor-pointer"
                     onClick={() => getCampaignProducts(campaign.id)}>
                     <img src={`art-${i + 3}.jpg`} className="rounded-lg w-full h-[200px]" />
                     <span
                        className="absolute top-1 left-1 px-2 text-sm font-semibold bg-opacity-40 rounded-lg bg-yellow-300 capitalize">
                        {campaign.title}
                     </span>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default ShowCampaigns
