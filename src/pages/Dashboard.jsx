import Container from "../components/Container"
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import delProduct from "../db-operations/delProduct";
import Pagination from "../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import ActionTypes from "../constants/ActionTypes";
import { getProductsPagination, getProductsPaginationNext } from "../db-operations/getProducts";


const Dashboard = () => {
   const { products } = useSelector(store => store.products)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const dene = async ()=>{
      const last = await getProductsPagination()

      getProductsPaginationNext(last)
   }
   
   dene()


   const handleDelete = (product) => {
      const result = confirm("Ürünü silmek istediğine emin misin? ")
      if (result) {
         delProduct(product)
      }
   }

   const handleEdit = (product) => {

      dispatch({ type: ActionTypes.EDIT_PRODUCT, payload: product })
      navigate("/product/edit/" + product.id)
   }

   return (
      <Container >
         <div className="flex flex-col h-full">
            <h2 className="text-center text-xl font-bold mb-3">Ürünler</h2>

            <Link to={"/addProduct"} className="border py-1 px-3 w-max self-end bg-yellow-300 mb-2 font-semibold rounded-sm text-sm" onClick={()=> dispatch({type: ActionTypes.EDIT_PRODUCT, payload:null})}>Ürün Ekle</Link>
            <table className="table table-warning">
               <thead>
                  <tr className="table-danger">
                     <th scope="col ">#</th>
                     <th scope="col">Ürün Adı</th>
                     <th scope="col">Stok</th>
                     <th scope="col">Fiyat</th>
                     <th scope="col">İşlemler</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     products?.map((item, i) => (
                        <tr key={item.id} className="table-warning text-sm">
                           <th scope="row">{i + 1}</th>
                           <td className="">{item.title} </td>
                           <td className="">{item.stock} </td>
                           <td className="">{item.price} </td>
                           <td className="">
                              <span className="flex gap-3">
                                 <button onClick={() => handleDelete(item)}><MdOutlineDelete className="text-lg hover:text-red-500" /></button>
                                 <button onClick={() => handleEdit(item)}><FiEdit className="text-md hover:text-blue-600" /></button>
                              </span>
                           </td>
                        </tr>
                     ))
                  }
               </tbody>
            </table>


            <div className="mt-5">
               <Pagination />
            </div>
         </div>


      </Container>
   )
}

export default Dashboard
