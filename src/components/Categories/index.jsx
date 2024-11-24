import CATEGORIES from "../../constants/categories"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../../constants/ActionTypes"
import { useNavigate } from "react-router-dom"


const Categories = () => {
   const { selectedCategory } = useSelector(store => store.products)
   const [category, setCategory] = useState(null)
   const [subMenu, setSubMenu] = useState(null)

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
      <div id="categories" className="flex text-[14px] md:text-[16px] justify-center bg-zinc-300 border-t-4 border-yellow-400 ">
         {
            CATEGORIES.map((item, i) => {
               return (
                  <div key={item.key} className="relative" onMouseOver={() => setSubMenu(i)} onMouseLeave={() => setSubMenu(null)}>
                     <button onClick={handleClick} data-category={item.key}
                        className={`${selectedCategory == item.key && "bg-zinc-100"} font-semibold py-1 px-2 md:w-32 lg:w-40 border-x hover:bg-zinc-200 text-sm uppercase`} >
                        {item.value}
                     </button>
                     {/* ALT MENULER */}
                     <div className={`${subMenu !== i && "hidden"} flex flex-col gap-2 border absolute top-7 text-sm bg-zinc-100 md:p-2 w-full py-2 transition`}>
                        {
                           item?.subs?.map(sub =>
                              <a key={sub} href="#" className="hover:bg-yellow-300 text-center text-xs py-1 hover:font-semibold transition capitalize ">
                                 {sub.value}
                              </a>
                           )
                        }

                     </div>
                  </div>
               )
            })
         }

      </div>
   )
}

export default Categories
