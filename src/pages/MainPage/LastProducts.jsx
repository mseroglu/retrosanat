import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db } from "../../db-operations/config"
import { useEffect, useState } from "react"

const LastProducts = () => {
   const [products, setProducts] = useState([])

   const navigate = useNavigate()

   const productsColl = collection(db, "products")

   useEffect(() => {
      const result = []
      const q = query(productsColl, orderBy("created_at", "desc"), limit(20))

      getDocs(q)
         .then(res => {
            res.forEach(item => result.push({ ...item.data(), id: item.id }))
            setProducts(result)
         })
         .catch(err => {
            console.log(err)            
         })
   }, [])

   const getProduct = (id) => {
      navigate("/product/detail/"+id)

   }

   return (
      <div className="flex flex-col mt-10 gap-2 max-sm:p-4">
      <h2 className="font-bold text-xl">YENİ ÜRÜNLER</h2>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">  
         {
            products.map((prod, i) => (
               <div key={prod.id} className="col-span-1 relative cursor-pointer" onClick={()=>getProduct(prod.id)}>
                  <img src={prod.photos[prod.indexMainImage||0]} className="rounded-lg w-full h-[200px] object-cover" />
                  <span
                     className="absolute top-1 left-1 px-2 text-sm font-semibold bg-opacity-40 rounded-lg bg-green-300 capitalize">
                     {prod.title}
                  </span>
               </div>
            ))
         }
      </div>
         </div>       
   )
}

export default LastProducts
