import { Link } from "react-router-dom"
import Container from "./Container"

const Navbar = () => {

   return (
      <>
         <Container >
            <header className="border py-3 flex items-center justify-between border-b-gray-300 border-x-0">
               <div>
                  <Link to={"/"}>
                     <div className="font-semibold underline text-xl cursor-pointer md:text-2xl hover:scale-105 transition ">retro
                        <span className="text-yellow-400">sanat</span>
                     </div>
                  </Link>
               </div>

               <div className="flex gap-3 font-semibold text-slate-700">
                  <Link to={"/products"} className="transition hover:underline md:text-xl" >Ürünler</Link>
                  <Link to={"/addProduct"} className="transition hover:underline md:text-xl" >Ürün Ekle</Link>
               </div>

               <div className="flex gap-2 font-semibold">
                  <Link to={"/login"}
                     className="border rounded-md w-20 border-zinc-500 grid place-items-center transition hover:bg-slate-900 hover:text-white" >
                     Giriş</Link>
                  <Link to={"/register"}
                     className="border rounded-md w-20 border-zinc-500 grid place-items-center transition hover:bg-slate-900 hover:text-white">
                     Kayıt Ol</Link>
               </div>
            </header>
         </Container>
      </>
   )
}

export default Navbar
