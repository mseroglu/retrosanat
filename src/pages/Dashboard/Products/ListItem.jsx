import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import delProduct from "../../../db-operations/delProduct";
import ActionTypes from "../../../constants/ActionTypes";
import { DASHBOARD_PAGES } from "../../../constants/DashboardPages";
import { useDispatch, useSelector } from "react-redux";


const ListItem = ({ item, number, setPage, selectedProducts }) => {
   const { campaigns } = useSelector(store => store.campaigns)

   const dispatch = useDispatch()
   
   
   const handleCheckBox = (e) => {
      const prodId = e.target.value
      if (e.target.checked) {
         selectedProducts.push(prodId)
      } else {
         selectedProducts = selectedProducts.filter(item => item !== prodId)
      }
   }

   const handleEdit = (product) => {
      dispatch({ type: ActionTypes.EDIT_PRODUCT, payload: product })
      setPage(DASHBOARD_PAGES[1].page)
   }

   const handleDelete = async (product) => {
      const result = confirm("Ürünü silmek istediğine emin misin? ")
      if (result) {
         await delProduct(product)
         // ürün silindikten sonra state i güncelle
         const filtred = products.filter(item => item.id !== product.id)
         dispatch({ type: ActionTypes.DASHBOARD_PRODUCTS_UPDATE, payload: filtred })
      }
   }

   return (
      <tr className="text-sm capitalize border-t ">
         <th scope="row" className="py-2 ps-1" >{number + 1}</th>
         <td className="py-2">{item.title} </td>
         <td className="py-2">{campaigns.find(i => i.id == item.campaignId)?.title || "-"} </td>
         <td className="py-2 text-center">
            <input type="checkbox" value={item.id} onChange={handleCheckBox} />
         </td>
         <td className="py-2 text-right">{item.stock} </td>
         <td className="py-2 text-right">{item.price} </td>
         <td className="py-2 ">
            <span className="flex gap-1 justify-center">
               <button onClick={() => handleDelete(item)}><MdOutlineDelete className="text-lg hover:text-red-500" /></button>
               <button onClick={() => handleEdit(item)}><FiEdit className="text-md hover:text-blue-600" /></button>
            </span>
         </td>
      </tr>
   )
}

export default ListItem
