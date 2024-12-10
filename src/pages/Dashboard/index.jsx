import Container from "../../components/Container"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ActionTypes from "../../constants/ActionTypes";
import { useState } from "react";
import Loader from "../../components/Loader"
import { getPageProducts } from "../../redux/actions";
import Products from "./Products";
import Campaigns from "./Campaigns"
import AddProduct from "./AddProduct";

const Dashboard = () => {
   const [page, setPage] = useState("products")

   const dispatch = useDispatch()
   const navigate = useNavigate()



   return (
      <Container >
         <main className="flex gap-1">

            <aside className="flex flex-col bg-zinc-300 h-fit ">
               <button className={`text-left border-b border-s-4 hover:border-yellow-300 p-2 ${page == "products" && "bg-yellow-400"}`} onClick={() => setPage("products")}>Ürünler</button>

               <button className={`text-left border-b border-s-4 hover:border-yellow-300 p-2 ${page == "addProduct" && "bg-yellow-400"}`}
                  onClick={() => {
                     setPage("addProduct")
                     dispatch({ type: ActionTypes.EDIT_PRODUCT, payload: null })
                  }}>
                     Ürün Ekle
                  </button>

               <button className={`text-left border-b border-s-4 hover:border-yellow-300 p-2 ${page == "addCampaign" && "bg-yellow-400"}`} onClick={() => setPage("addCampaign")}>
                  Kampanya Ekle
               </button>
            </aside>

            <aside className="flex-1">
               {
                  page == "products" && <Products setPage={setPage} />
               }
               {
                  page == "addProduct" && <AddProduct />
               }
               {
                  page == "addCampaign" && <Campaigns />
               }
            </aside>

         </main>
      </Container>
   )
}

export default Dashboard


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
