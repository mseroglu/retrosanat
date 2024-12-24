import Container from "../../components/Container"
import { useState } from "react";
import Products from "./Products";
import Campaigns from "./Campaigns"
import AddProduct from "./AddProduct";
import AddCampaign from "./AddCampaign";
import { DASHBOARD_PAGES } from "../../constants/DashboardPages";
import SideButtons from "./SideButtons";




const Dashboard = () => {
   const [page, setPage] = useState(DASHBOARD_PAGES[0].page)


   return (
      <Container className="mt-24">
         <main className="flex gap-1">

            <aside className="flex flex-col bg-zinc-300 h-fit ">
               <SideButtons selectedPage={page} setSelectedPage={setPage} />
            </aside>

            <aside className="flex-1">
               {
                  page == DASHBOARD_PAGES[0].page && <Products setPage={setPage} />
               }
               {
                  page == DASHBOARD_PAGES[1].page && <AddProduct />
               }
               {
                  page == DASHBOARD_PAGES[2].page && <AddCampaign />
               }
               {
                  page == DASHBOARD_PAGES[3].page && <Campaigns />
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
