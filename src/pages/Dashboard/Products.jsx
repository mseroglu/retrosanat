import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import delProduct from "../../db-operations/delProduct";
import ActionTypes from "../../constants/ActionTypes";
import { useEffect, useRef } from "react";
import Loader from "../../components/Loader"
import { getPageProducts } from "../../redux/actions";

const Products = ({ setPage }) => {
   const { isLoading, error, products, hasDoc, lastVisible } = useSelector(store => store.dashboard)

   const dispatch = useDispatch()
   const observerRef = useRef()

   useEffect(() => {
      const observerDiv = observerRef.current
      if (!observerDiv || !hasDoc) return
      // gizli divi takip eder ve ekrana girdiğinde tekrar api isteği yapılmasını sağlar
      const observer = new IntersectionObserver((entires) => {

         entires.forEach(entry => {
            if (entry.isIntersecting) {
               dispatch(getPageProducts(lastVisible))
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

      // komponent ekrandan ayrılınca takibi bırak
      return () => observer.disconnect()
   }, [lastVisible])

   const handleDelete = async (product) => {
      const result = confirm("Ürünü silmek istediğine emin misin? ")
      if (result) {
         await delProduct(product)
         // ürün silindikten sonra state i güncelle
         const filtred = products.filter(item => item.id !== product.id)
         dispatch({ type: ActionTypes.DASHBOARD_PRODUCTS_UPDATE, payload: filtred })
      }
   }

   const handleEdit = (product) => {
      dispatch({ type: ActionTypes.EDIT_PRODUCT, payload: product })
      setPage("addProduct")
   }


   return (
      <>
         {isLoading
            ? <Loader />
            : error
               ? <Error err={error} />
               : (
                  <div className="flex flex-col h-full">


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
      </>
   )
}

export default Products


{/*
   //const [products, setProducts] = useState([])
   //const [lastVisible, setLastVisible] = useState(null)
   //const [isLoading, setIsLoading] = useState(false)
   // const [error, setError] = useState(null)
   //const [hasDoc, setHasDoc] = useState(true)
   

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
   
   
   */}

