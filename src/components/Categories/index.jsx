import CATEGORIES from "../../constants/categories"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../../constants/ActionTypes"
import { useNavigate, useParams } from "react-router-dom"


const Categories = () => {
   const { selectedCategory } = useSelector(store => store.products)
   const [category, setCategory] = useState(null)
   const [subCategories, setSubCategories] = useState([])

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleClick = (e) => {
      const cat = e.target.getAttribute("data-category")
      setCategory(cat)
      const found = CATEGORIES.find(item => item.key == cat)
      setSubCategories(found?.subs)
   }

   useEffect(() => {
      dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: category })

      if (category) {
         navigate("/products/category/" + category)
      } else {
         navigate("/products")
      }

   }, [category])

   return (
      <>
         <div id="categories" className="flex text-[14px] md:text-[16px] justify-center bg-zinc-300 border-t-4 border-yellow-400 ">
            <span onClick={()=> navigate("/products")}>
               <button onClick={handleClick} data-category={null}
                  className={`font-semibold py-1 px-2 md:w-32 lg:w-40 border-x hover:bg-zinc-200 text-[12px] uppercase`} >
                  Tüm Ürünler
               </button>
            </span>
            {
               CATEGORIES.map((item, i) => (
                  <button key={item.key} onClick={handleClick} data-category={item.key}
                     className={`${selectedCategory == item.key && "bg-zinc-100"} font-semibold py-1 px-2 md:w-32 lg:w-40 border-x hover:bg-zinc-200 text-[12px] uppercase`} >
                     {item.value}
                  </button>
               ))
            }
         </div>

         {/* ALT KATEGORİLER    */}
         <div className={`${!selectedCategory && "hidden"} bg-zinc-100 flex justify-center md:gap-5 md:p-2 w-full py-2 transition`}>
            {
               subCategories?.map(sub => (
                  <span key={sub.key} className="border-4 rounded-full ">
                     <button key={sub.key} className="hover:bg-yellow-300 text-center font-semibold text-xs py-1 hover:font-semibold transition capitalize rounded-full h-16 w-16 border-2 border-yellow-300 grid place-items-center">
                        { sub.value }
                     </button>
                  </span>
               )
               )
            }
         </div>
      </>

   )
}

export default Categories
