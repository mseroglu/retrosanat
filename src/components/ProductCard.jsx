import { Link } from "react-router-dom"


const ProductCard = ({ product }) => {
   return (
      <Link to={"/product/detail/" + product.id}>
         <div className="flex flex-col w-60 md:w-80 rounded-md overflow-hidden border transition hover:scale-105 shadow-md h-full">
            <img src={product.photo} alt="product" className="w-full h-40 object-cover " />
            <div className="flex flex-col flex-grow">
               <div className="flex-grow px-2 py-2 bg-gray-200">
                  <h3 className="font-semibold mb-3">{product.title}</h3>
                  <p>{product.description}</p>
               </div>
               <div className="px-2 pb-2 bg-gray-300">
                  <p className="mt-3">Stok  : {product.amount} Adet</p>
                  <p className="font-semibold">Fiyat : {product.price} &#8378;</p>
               </div>
            </div>
            <div className="font-semibold bg-yellow-500 text-center py-2">
               Detay
            </div>
         </div>
      </Link>
   )
}

export default ProductCard
