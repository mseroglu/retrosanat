import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import CATEGORIES from "../utils/categories"
import { db } from "../db-operations/config"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import ActionTypes from "../redux/ActionTypes"
import { useNavigate } from "react-router-dom"


const Categories = () => {
   const [category, setCategory] = useState(null)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const productColl = collection(db, "products")
   const q = query(productColl, where("category", "==", category), limit(30))

   useEffect(() => {
      dispatch({ type: ActionTypes.PRODUCTS_LOADING })

      const result = []
      getDocs(q)
      .then((resp)=> {
         resp.forEach(item=> { result.push({ ...item.data(), id: item.id }) })

         dispatch({type: ActionTypes.PRODUCTS_SUCCESS, payload: result})
         navigate("/products/category/"+category)
      })
      .catch((err)=> dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code }))

   }, [category])


   const handleClick = (e) => {
      const cat = e.target.getAttribute("data-category")
      console.log("category selected: ", cat)
      setCategory(cat)      
   }

   return (
      <div id="categories" className="flex text-[14px] md:text-[16px] justify-center bg-zinc-300 border-t-4 border-yellow-400">
         {
            CATEGORIES.map(item => {
               const [key, value] = Object.entries(item)[0]
               return <button key={key} onClick={handleClick} data-category={key}
                  className="font-semibold py-1 px-2 w-40 border-x  hover:bg-zinc-200" >
                  {value}</button>
            })
         }
      </div>
   )
}

export default Categories
