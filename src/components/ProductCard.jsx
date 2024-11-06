import { Link } from "react-router-dom"
import CATEGORIES from "../constants/categories"

const ProductCard = ({ product }) => {

   const found = CATEGORIES.find(item => item.key == product.category)

   return (
      <div>
         <div className="flex flex-col w-60 md:w-80 rounded-md overflow-hidden border transition hover:scale-105 shadow-md h-full">

            <img src={product.photos[product.indexMainImage]} alt="product-image" className="w-full h-60 object-cover " />
            <div className="flex flex-col flex-grow">
               
               {/* Taglar alanı tıklanır olacak */}
               <div className="flex gap-1 bg-yellow-300 justify-center">
                  {product.tags?.map((item, i) => (<span key={i} className="border-2 text-sm border-gray-600 rounded-full px-2 z-[99]">{item}</span>))}
               </div>

               <div className="flex-grow px-2 pt-4 bg-gray-200">
                  <h3 className="font-semibold mb-3 capitalize ">{product.title}</h3>
                  <p className="first-letter:uppercase">{product.description}</p>
                  <p className="first-letter:uppercase font-semibold text-sm">
                     Kategori: {found?.value}</p>
               </div>

               <div className="px-2 pb-2 bg-gray-300">
                  <p className="mt-3">Stok  : {product.stock} Adet</p>
                  <p className="font-semibold">Fiyat : {product.price} ₺</p>
               </div>
            </div>
            <Link to={"/product/detail/" + product.id}>
               <div className="font-semibold bg-yellow-500 text-center py-2">
                  Detay
               </div>
            </Link>
         </div>
      </div>
   )
}

export default ProductCard
