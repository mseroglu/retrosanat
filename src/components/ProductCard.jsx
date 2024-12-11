import { Link } from "react-router-dom"
import CATEGORIES from "../constants/categories"
import Tag from "./Tag"
import ActionTypes from "../constants/ActionTypes"
import { useDispatch } from "react-redux"

const ProductCard = ({ product }) => {

   const dispatch = useDispatch()


   const found = CATEGORIES.find(item => item.key == product.category)

   const handleClick = ()=>{
      dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: null })
   }
   

   return (
      <div>
         <div className="flex flex-col w-40 md:w-60 rounded-md overflow-hidden border transition hover:scale-105 shadow-md h-80 text-sm ">

            <img src={product.photos[product.indexMainImage || 0]} alt="product-image" className="w-full h-36 object-cover " />
            <div className="flex flex-col flex-grow">

               <div className="flex-grow px-2 pt-2 bg-gray-200">
                  <h3 className="font-semibold mb-2 capitalize leading-tight">{product.title}</h3>
                  <p className="first-letter:uppercase text-[10px] leading-tight">{product.description}</p>
                  <p className="first-letter:uppercase font-semibold text-[11px] capitalize">Kategori: { found?.value }</p>
               </div>

               <div className="px-2 pb-1 bg-gray-300">
                  <p className="mt-3 text-xs">Stok  : {product.stock} Adet</p>
                  <p className="font-semibold text-xs">Fiyat : {product.price} ₺</p>
               </div>
            </div>

            {/* Taglar alanı */}
            <div className="flex flex-wrap gap-1 bg-gray-400 justify-center">
               {product.tags?.map((item, i) => (
                  <Tag key={i} item={item} className="text-white bg-gray-600" />
                  ))}
            </div>

            <Link to={"/product/detail/" + product.id} onClick={handleClick}>
               <div className="font-semibold bg-yellow-500 text-center py-2">
                  Detay
               </div>
            </Link>
         </div>
      </div>
   )
}

export default ProductCard
