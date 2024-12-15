import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import delProduct from "../../db-operations/delProduct";
import ActionTypes from "../../constants/ActionTypes";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader"
import { getPageProducts } from "../../redux/actions";
import dateFormatter from "../../utils/DateFormatter";
import { doc } from "firebase/firestore";
import { batch, db } from "../../db-operations/config";
import { toast } from "react-toastify";
import {DASHBOARD_PAGES} from "../../constants/DashboardPages";

const Products = ({ setPage }) => {
   const { isLoading, error, products, hasDoc, lastVisible } = useSelector(store => store.dashboard)
   const { campaigns } = useSelector(store => store.campaigns)

   const [selectedCampaign, setSelectedCampaign] = useState('')
   const [selectedCampaignInfo, setSelectedCampaignInfo] = useState({})


   const dispatch = useDispatch()
   const observerRef = useRef()

   useEffect(() => {
      const found = campaigns.find(item => item.id == selectedCampaign)
      setSelectedCampaignInfo(found || {})
   }, [selectedCampaign])


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
      setPage(DASHBOARD_PAGES[1].page)
   }

   const addCampaignOnProducts = async () => {
      if (selectedProducts.length==0){
         return toast.info("Kampanya eklenecek ürün seçimi yapmadınız!")
      }
      if (selectedCampaign) {
         selectedProducts.forEach(id => {
            const refDoc = doc(db, "products", id)
            batch.update(refDoc, { campaignId: selectedCampaign })
         })

         batch.commit()
            .then(res => {
               toast.success("Seçilim tüm ürünlere kampanya eklendi.")
               setSelectedCampaign("")
               setSelectedCampaignInfo({})
            })
            .catch(err => toast.error("Bir sorun oluştu ! " + err.code))
      } else {
         toast.info("Kampanya seçimi yapmadınız!")
      }
   }

   let selectedProducts = []
   const handleCheckBox = (e) => {
      const prodId = e.target.value
      if (e.target.checked) {
         selectedProducts.push(prodId)
      } else {
         selectedProducts = selectedProducts.filter(item => item !== prodId)
      }
   }


   return (
      <>
         {isLoading
            ? <Loader />
            : error
               ? <Error err={error} />
               : (
                  <div className="flex flex-col h-full">

                     {/** KAMPANYA SEÇME VE GÖSTERME  */}
                     <div className="flex flex-col gap-2 mb-4">
                        <div className="flex gap-2 justify-between">
                           <select className="capitalize text-sm border" value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
                              <option value={""}>Kampanya seçiniz</option>
                              {
                                 campaigns.map((item, i) =>
                                    <option key={i} value={item.id} >
                                       {item.title}
                                    </option>)
                              }
                           </select>

                           <button className={`w-fit px-2 py-1 text-sm rounded-md border text-white disabled:bg-gray-300 bg-gray-700 `} disabled={!selectedCampaign} onClick={addCampaignOnProducts}>
                              KAYDET
                           </button>
                        </div>

                        {/** Seçili kampanya bilgileri gösterilecek */}
                        {
                           selectedCampaign !== "" && (
                              <div className="bg-yellow-500">
                                 <table className="w-full text-xs text-center rtl:text-center text-gray-500 dark:text-gray-400">
                                    <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                       <tr >
                                          <th scope="col" className="px-3">İndirim %</th>
                                          <th scope="col" className="px-3">Aktif mi</th>
                                          <th scope="col" className="py-1">Başlama T.</th>
                                          <th scope="col" className="py-1">Bitiş Tar.</th>
                                       </tr>
                                    </thead>
                                    <tbody className="text-white ">
                                       <tr>
                                          <th scope="col" className="py-1">{selectedCampaignInfo.discount}</th>
                                          <th scope="col " className="py-1">{selectedCampaignInfo.isActive ? "Aktif" : "Pasif"}</th>
                                          <th scope="col" className="px-1">{dateFormatter(selectedCampaignInfo.startDate)}</th>
                                          <th scope="col" className="px-1">{dateFormatter(selectedCampaignInfo.endDate)}</th>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           )
                        }
                     </div>

                     {/** ÜRÜNLER TABLOSU */}

                     <table className="w-full text-xs text-left rtl:text-right text-gray-300 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                           <tr >
                              <th scope="col" className="py-2 ps-1">#</th>
                              <th scope="col" className="py-2">Ürün Adı</th>
                              <th scope="col" className="py-2 text-center">Kampanya</th>
                              <th scope="col" className="py-2 text-right">Stok</th>
                              <th scope="col" className="py-2 text-right">Fiyat</th>
                              <th scope="col" className="py-2 text-center">İşlemler</th>
                           </tr>
                        </thead>
                        <tbody>

                           {
                              products?.map((item, i) => (
                                 <tr key={item.id} className="text-sm capitalize">
                                    <th scope="row" className="py-2 ps-1" >{i + 1}</th>
                                    <td className="py-2">{item.title} </td>
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

