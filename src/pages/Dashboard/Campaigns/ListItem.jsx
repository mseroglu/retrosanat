import { FiEdit, FiSave } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { delCampaign } from "../../../db-operations/delProduct";
import ActionTypes from "../../../constants/ActionTypes";
import { useState } from "react";


const ListItem = ({ item, campaigns, setCampaigns }) => {
   const [edit, setEdit] = useState(false)

   const dateFormatter = (isoDate) => {
      const date = new Date(isoDate);

      const readableDate = date.toLocaleString("tr-TR", {
         weekday: "short",
         day: "numeric",
         month: "short",
         year: "numeric",
         hour: "2-digit",
         minute: "2-digit"
      });
      return readableDate
   }

   const handleDelete = async (id) => {
      const result = confirm("Ürünü silmek istediğine emin misin? ")
      if (result) {
         await delCampaign(id)
         const filtered = campaigns.filter(item => item.id !== id)
         setCampaigns(filtered)
      }
   }

   const handleEdit = (item) => {
      
   }

   return (
      <tr class=" bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
         <td class="px-6 py-3">
            {edit ? <input type="text" autoFocus defaultValue={item.title} className="border indent-1 " /> : item.title}
         </td>
         <td class="px-6 py-3">
            {edit ? <input type="number" defaultValue={item.discount} className="border indent-1" /> : item.discount}
         </td>
         <td class="px-6 py-3">
            {edit ?
               <select className="border">
                  <option value={true}>Aktif</option>
                  <option value={false}>Pasif</option>
               </select>
               : item.status ? "Aktif" : "Pasif"}
         </td>
         <td class="px-6 py-3">
            {edit ? <input type="datetime-local" defaultValue={item.startDate} className="border indent-1" /> : dateFormatter(item.startDate)}
         </td>
         <td class="px-6 py-3">
         {edit ? <input type="datetime-local" defaultValue={item.endDate} className="border indent-1" /> : dateFormatter(item.endDate)}
         </td>
         <td class="px-6 py-3 text-right">
            <span className="flex gap-3">
               {!edit && <button onClick={() => handleDelete(item.id)}><MdOutlineDelete className="text-lg hover:text-red-500" /></button>}
               {edit && <button onClick={() => handleEdit(item)}><FiSave className="text-lg hover:text-green-600" /></button>}
               <button onClick={() => setEdit(prev => !prev) }><FiEdit className="text-md hover:text-blue-600" /></button>
            </span>
         </td>
      </tr>
   )
}

export default ListItem
