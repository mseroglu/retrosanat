import CATEGORIES from "../../constants/categories"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../../constants/ActionTypes"
import { useNavigate } from "react-router-dom"


const Categories = () => {
   const { selectedCategory } = useSelector(store => store)
   const [category, setCategory] = useState(null)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleClick = (e) => {
      const cat = e.target.getAttribute("data-category")
      setCategory(cat)
   }
   
   useEffect(() => {
      dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: category })

      if (category) navigate("/products/category/" + category)

   }, [category])

   return (
      <div id="categories" className="flex text-[14px] md:text-[16px] justify-center bg-zinc-300 border-t-4 border-yellow-400">
         {
            CATEGORIES.map(item => {
               return <button key={item.key} onClick={handleClick} data-category={item.key}
                  className={`${selectedCategory == item.key && "bg-zinc-100"} font-semibold py-1 px-2 w-40 border-x hover:bg-zinc-200`} >
                  {item.value}</button>
            })
         }
      </div>
   )
}

export default Categories
