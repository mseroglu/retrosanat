import { FiEdit, FiSave } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import {  useState } from "react";
import { db } from "../../../db-operations/config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ActionTypes from "../../../constants/ActionTypes";
import dateFormatter from "../../../utils/DateFormatter";
import { FcCancel } from "react-icons/fc";


const ListItem = ({ item }) => {
   const [edit, setEdit] = useState(false)
   const [title, setTitle] = useState(item.title)
   const [discount, setDiscount] = useState(item.discount)
   const [isActive, setIsActive] = useState(item.isActive)
   const [startDate, setStartDate] = useState(item.startDate)
   const [endDate, setEndDate] = useState(item.endDate)


   const dispatch = useDispatch()


   const handleDelete = async (id) => {
      const result = confirm(`${item.title.toLocaleUpperCase()} isimli kampanyayı silmek istediğine emin misin? `)
      if (result) {
         try {
            await deleteDoc(doc(db, "campaigns", id))            
            dispatch({ type: ActionTypes.CAMPAIGN_DEL, payload: id })   
            toast.success("Kampanya silindi.")         
         } catch (error) {
            toast.error("Kampanya silinmedi Hata: ", error.code)
         }
      }
   }

   const handleEdit = async (id) => {
      const data = { id, title, discount, isActive, startDate, endDate }
      try {
         const docRef = doc(db, "campaigns", id)
         await updateDoc(docRef, data)         
         toast.success("Kampanya başarıyla güncellendi..")
         dispatch({type:ActionTypes.CAMPAIGN_UPDATE, payload: data})
         setEdit(false)
      } catch (error) {
         toast.error("Kampanya güncelleme başarısız! " + error.code)
      }
   }

   const handleChangeSelection = (e) => {
      setIsActive(e.target.value == "false" ? false : true)
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
               <select className="border" value={isActive} onChange={handleChangeSelection} >
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
               {edit && <button onClick={() => handleEdit(item.id)}><FiSave className="text-lg hover:text-green-600" /></button>}
               <button onClick={() => setEdit(prev => !prev)}>
                  {edit ? <FcCancel className="text-lg hover:scale-105 rounded-full" /> : <FiEdit className="text-md hover:text-blue-600" />}
               </button>
            </span>
         </td>

      </tr>
   )
}

export default ListItem
