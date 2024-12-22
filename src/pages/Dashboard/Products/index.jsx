
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Loader from "../../../components/Loader"
import { getPageProducts } from "../../../redux/actions";
import MatchCampaign from "./MatchCampaign";
import ListItem from "./ListItem";


const Products = ({ setPage }) => {
   const { isLoading, error, products, hasDoc, lastVisible } = useSelector(store => store.dashboard)
   

   let selectedProducts = []

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


   return (
      <>
         {isLoading
            ? <Loader />
            : error
               ? <Error err={error} />
               : (
                  <div className="flex flex-col h-full">

                     {/** KAMPANYA SEÇME VE GÖSTERME  */}
                     <MatchCampaign selectedProducts={selectedProducts} />

                     {/** ÜRÜNLER TABLOSU */}

                     <table className="w-full text-xs text-left rtl:text-right text-gray-300 dark:text-gray-800">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                           <tr >
                              <th scope="col" className="py-2 ps-1">#</th>
                              <th scope="col" className="py-2">Ürün Adı</th>
                              <th scope="col" className="py-2">Kampanya</th>
                              <th scope="col" className="py-2 text-center">Yeni Kampanya</th>
                              <th scope="col" className="py-2 text-right">Stok</th>
                              <th scope="col" className="py-2 text-right">Fiyat</th>
                              <th scope="col" className="py-2 text-center">İşlemler</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              products?.map((item, i) => (
                                 <ListItem key={item.id} item={item} number={i} setPage={setPage} selectedProducts={selectedProducts} />
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

