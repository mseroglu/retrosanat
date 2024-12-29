import CATEGORIES from "../../constants/categories"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../../constants/ActionTypes"
import { useNavigate, useParams } from "react-router-dom"

const Categories = () => {
   const params = useParams()
   const { selectedCategory } = useSelector(store => store.products)
   const [category, setCategory] = useState(params.category)
   const [subCategory, setSubCategory] = useState(params.subCategory)
   const [subCategories, setSubCategories] = useState([])

   const dispatch = useDispatch()
   const navigate = useNavigate()


   const handleClickCategory = (e) => {
      const cat = e.target.getAttribute("data-category")
      if (cat == category || cat == null) {
         setCategory(null)
         navigate("/products")
      } else {
         setCategory(cat)
      }

      // Burası useEffect içine alınamaz, alınırsa anasayfa yerine sürekli products sayfası ilk gelir
      if (!cat) {
         setSubCategory(null)
      }
   }

   const handleClickSubCategory = (e) => {
      const cat = e.target.getAttribute("data-category")
      // aynı kategoriyi tıklayınca seçili ise kaldır
      if (cat == subCategory) {
         setSubCategory(null)
         // bunu useffect içine taşımak sorun çıkarır.
         navigate("/products/category/" + category)
      } else {
         setSubCategory(cat)
      }
   }

   useEffect(() => {
      if (subCategory) {
         navigate(`/products/category/${category}/${subCategory}`)
      }

   }, [subCategory])


   useEffect(() => {
      dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: category })
      if (category) {
         navigate("/products/category/" + category)
         const found = CATEGORIES.find(item => item.key == category)
         setSubCategories(found?.subs)
      }
      console.log("Category: ", category)
   }, [category])


   return (
      <>
         <div id="categories" className="flex md:text-[14px] justify-center items-center bg-zinc-300 border-t-4 border-yellow-400 overflow-x-auto scrollbar-none">

            <button onClick={handleClickCategory} data-category={null}
               className={`h-full font-semibold text-xs max-sm:ms-20 py-1 px-2 md:w-32 lg:w-40 border-x hover:bg-zinc-200 uppercase `} >
               Tüm Ürünler
            </button>

            {
               CATEGORIES.map(item => (
                  <button key={item.key} onClick={handleClickCategory} data-category={item.key}
                     className={`${selectedCategory == item.key && "bg-zinc-100"} font-semibold py-1 px-2 md:w-32 lg:w-40 border-x hover:bg-zinc-200 text-xs uppercase `} >
                     {item.value}
                  </button>
               ))
            }
         </div>

         {/* ALT KATEGORİLER    */}
         <div className={`${!selectedCategory && "hidden"} bg-zinc-100 flex justify-center md:gap-5 md:p-2 w-full py-2 transition overflow-x-auto scrollbar-none`}>
            {
               subCategories?.map(sub => (
                  <span key={sub.key} className="border-4 rounded-full ">
                     <button className={`${sub.key == subCategory && "bg-yellow-300"} hover:scale-105 text-center font-semibold text-xs py-1 hover:font-semibold transition capitalize rounded-full h-16 w-16 border-2 border-yellow-300 grid place-items-center`} onClick={handleClickSubCategory} data-category={sub.key}>
                        {sub.value}
                     </button>
                  </span>
               ))
            }
         </div>
      </>

   )
}

export default Categories
