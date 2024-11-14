import Container from "../components/Container"
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import delProduct from "../db-operations/delProduct";
import Pagination from "../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import ActionTypes from "../constants/ActionTypes";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../db-operations/config";
import Loader from "../components/Loader"

const Dashboard = () => {
   const [products, setProducts] = useState([])
   const [lastVisible, setLastVisible] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)
   const [hasDoc, setHasDoc] = useState(true)

   const observerRef = useRef()

   useEffect(() => {
      const observerDiv = observerRef.current
      if (!observerDiv || !hasDoc) return

      const observer = new IntersectionObserver((entires) => {

         entires.forEach(entry => {
            console.log(entry)
            if (entry.isIntersecting) {
               getPageProducts()
            }
         })
      },
         {
            root: null, // root null ise, viewport (ekran) gözlemlenir
            threshold: 1.0 // Div tamamen ekrana girdiğinde tetiklenir
         }
      )
      // div takibi başlasın
      observer.observe(observerDiv)

      // komponent ekrandan ayrınca takibi bırak
      return () => observer.disconnect()
   }, [lastVisible])


   const dispatch = useDispatch()
   const navigate = useNavigate()

   const getPageProducts = async () => {
      // istenen döcüman sayısının bir fazlası çekilir ki bu sayede mevcut sayfa son sayfa mı belirlenir
      const lim = 21
      setIsLoading(true)
      try {
         let q;
         if (lastVisible) {
            q = query(collection(db, 'products'), orderBy('created_at', 'desc'), startAfter(lastVisible), limit(lim));
         } else {
            q = query(collection(db, 'products'), orderBy('created_at', 'desc'), limit(lim));
         }
         const snapshot = await getDocs(q)
         const newProd = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
         setProducts([...products, ...newProd.slice(0, lim-1)])
         setLastVisible(snapshot.docs[snapshot.docs.length - 2])
         // istenen sayıda dökümanın gelirse sonraki sayfa  var demektir
         setHasDoc(snapshot.docs.length == lim)
         console.log("snapshot.docs.length: ", snapshot.docs.length)
      } catch (err) {
         setError(err.code)
      } finally {
         setIsLoading(false)
      }
   }

   useEffect(() => {
      getPageProducts()

   }, [])



   console.log(products)

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
         {isLoading
            ? <Loader />
            : error
               ? <Error err={error} />
               : (
                  <div className="flex flex-col h-full">
                     <h2 className="text-center text-xl font-bold mb-3">Ürünler</h2>

                     <Link to={"/addProduct"} className="border py-1 px-3 w-max self-end bg-yellow-300 mb-2 font-semibold rounded-sm text-sm" onClick={() => dispatch({ type: ActionTypes.EDIT_PRODUCT, payload: null })}>Ürün Ekle</Link>
                     <table className="table table-warning ">
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

                     {/* Görünmeyen div  */}
                     <div ref={observerRef} ></div>

                  </div>
               )}



      </Container>
   )
}

export default Dashboard
