import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import CATEGORIES from "../../utils/categories"
import { db } from "../../db-operations/config"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import ActionTypes from "../../redux/ActionTypes"
import { useNavigate } from "react-router-dom"


const Categories = () => {
   const [category, setCategory] = useState(null)
   console.log(category)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const productColl = collection(db, "products")
   
   const handleClick = (e) => {
      const cat = e.target.getAttribute("data-category")
      setCategory(cat)
      navigate("/products/category/" + cat)
      
      const q = query(productColl, where("category", "==", cat), limit(30))
      dispatch({ type: ActionTypes.PRODUCTS_LOADING })

      const result = []
      getDocs(q)
         .then((resp) => {
            resp.forEach(item => { result.push({ ...item.data(), id: item.id }) })
            dispatch({ type: ActionTypes.PRODUCTS_SUCCESS, payload: result })
         })
         .catch((err) => dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code }))
   }

   return (
      <div id="categories" className="flex text-[14px] md:text-[16px] justify-center bg-zinc-300 border-t-4 border-yellow-400">
         {
            CATEGORIES.map(item => {
               return <button key={item.key} onClick={handleClick} data-category={item.key}
                  className={`${category == item.key && "bg-zinc-100"} font-semibold py-1 px-2 w-40 border-x hover:bg-zinc-200`} >
                  {item.value}</button>
            })
         }
      </div>
   )
}

export default Categories
