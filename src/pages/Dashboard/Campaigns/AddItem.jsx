import { FiSave } from "react-icons/fi";
import { useState } from "react";
import { db } from "../../../db-operations/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ActionTypes from "../../../constants/ActionTypes";


const AddItem = ({ setIsOpenAddArea }) => {

   const [title, setTitle] = useState("")
   const [discount, setDiscount] = useState(10)
   const [isActive, setIsActive] = useState(true)
   const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 11)+"00:00")
   const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 11)+"23:59")

   const dispatch = useDispatch()

   const handleSave = async () => {
      const newCampaign = { title, discount, isActive, startDate, endDate, }

      if (title == ""){
         return toast.info("Kampanya adı boş bırakılamaz!")
      }

      try {
         const campaignCollection = collection(db, "campaigns")
         const res = await addDoc(campaignCollection, newCampaign)
         
         newCampaign["id"] = res?.id
         setIsOpenAddArea(false)
         dispatch({type: ActionTypes.CAMPAIGN_ADD, payload: newCampaign})
         toast.success("Kampanya başarıyla kaydedildi.")
      } catch (error) {
         console.log(error)
         toast.error("Kampanya kaydı başarısız! " + error.code)
      }
   }

   return (
      <tr className=" bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
         <td className="px-6 py-3">
            <input type="text" autoFocus required value={title} onChange={(e) => setTitle(e.target.value)} className="border indent-1 " />
         </td>
         <td className="px-6 py-3">
            <input type="number" value={discount} onChange={(e) => setDiscount(+e.target.value)} className="border indent-1" />
         </td>
         <td className="px-6 py-3">
            <select className="border" value={isActive} onChange={(e) => setIsActive(e.target.value == "false" ? false : true)} >
               <option value={true}>Aktif</option>
               <option value={false}>Pasif</option>
            </select>
         </td>
         <td className="px-6 py-3">
            <input
               type="datetime-local"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
               className="border indent-1" />
         </td>
         <td className="px-6 py-3">
            <input
               type="datetime-local"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
               className="border indent-1" />
         </td>
         <td className="px-6 py-3 text-right">
            <span className="flex gap-3">
               <button onClick={handleSave}><FiSave className="text-lg hover:text-green-600" /></button>
            </span>
         </td>
      </tr>
   )
}

export default AddItem
