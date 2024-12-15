import { FiEdit, FiSave } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { delCampaign } from "../../../db-operations/delProduct";
import { useEffect, useState } from "react";
import { db } from "../../../db-operations/config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ActionTypes from "../../../constants/ActionTypes";
import dateFormatter from "../../../utils/DateFormatter";


const ListItem = ({ item }) => {
   const [edit, setEdit] = useState(false)
   const [title, setTitle] = useState(item.title || "")
   const [discount, setDiscount] = useState(item.discount || 0)
   const [isActive, setIsActive] = useState(item.isActive || true)
   const [startDate, setStartDate] = useState(item.startDate || "")
   const [endDate, setEndDate] = useState(item.endDate || "")

   const dispatch = useDispatch()


   const handleDelete = async (id) => {
      const result = confirm("Ürünü silmek istediğine emin misin? ")
      if (result) {
         await delCampaign(id)
         dispatch({type: ActionTypes.CAMPAIGN_DEL, payload: id})
      }
   }

   const handleEdit = async (item) => {
      const data = { title, discount, isActive, startDate, endDate, }

      try {
         const docRef = doc(db, "campaigns", item.id)
         await updateDoc(docRef, data)
         toast.success("Ürün başarıyla güncellendi..")
         dispatch({type: ActionTypes.CAMPAIGN_UPDATE, payload: data})
         setEdit(false)
      } catch (error) {
         toast.error("Kampanya kaydı başarısız! " + error.code)
      }
   }

   return (
      <tr className="text-xs lg:text-sm bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
         <td className="px-4 py-2">
            {edit ? <input type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} className="border indent-1 " /> : title}
         </td>
         <td className="px-4 py-2 text-center">
            {edit ? <input type="number" value={discount} onChange={(e) => setDiscount(+e.target.value)} className="border indent-1" /> : discount}
         </td>
         <td className="px-4 py-2 text-center">
            {edit ?
               <select className="border" value={isActive} onChange={(e) => setIsActive(e.target.value == "false" ? false : true)} >
                  <option value={true}>Aktif</option>
                  <option value={false}>Pasif</option>
               </select>
               : isActive ? "Aktif" : "Pasif"}
         </td>
         <td className="px-4 py-2 ">
            {edit ? <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border indent-1" /> : dateFormatter(startDate)}
         </td>
         <td className="px-4 py-2 ">
            {edit ? <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border indent-1" /> : dateFormatter(endDate)}
         </td>
         <td className="px-4 py-2 text-right">
            <span className="flex gap-2">
               {!edit && <button onClick={() => handleDelete(item.id)}><MdOutlineDelete className="text-lg hover:text-red-500" /></button>}
               {edit && <button onClick={() => handleEdit(item)}><FiSave className="text-lg hover:text-green-600" /></button>}
               <button onClick={() => setEdit(prev => !prev)}><FiEdit className="text-md hover:text-blue-600" /></button>
            </span>
         </td>
      </tr>
   )
}

export default ListItem
