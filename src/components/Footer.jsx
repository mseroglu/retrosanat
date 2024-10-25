import { Link } from "react-router-dom";
import Container from "./Container"
import { FaFacebook, FaInstagram, FaSquareYoutube } from "react-icons/fa6";


const Footer = () => {
   return (
      <Container stil="h-[200px] bg-slate-800 text-white flex flex-col gap-3 py-10">
         <div className="flex items-center justify-center gap-3">
            <Link to="https://www.facebook.com/">
               <FaFacebook className="w-6 h-6 hover:text-blue-500 transition" />
            </Link>
            <Link to="https://www.instagram.com/">
               <FaInstagram className="w-6 h-6 hover:text-orange-400 transition" />
            </Link>
            <Link to="https://www.youtube.com/">
               <FaSquareYoutube className="w-6 h-6 hover:text-red-600 transition" />
            </Link>
         </div>
         <div className="flex gap-3 items-center justify-center">
            <Link to={"/"} className="hover:text-yellow-400 transition">Anasayfa</Link>
            <Link to={"/"} className="hover:text-yellow-400 transition">Ürünler</Link>
            <Link to={"/"} className="hover:text-yellow-400 transition">Ürün ekle</Link>
         </div>
         <div className="text-center mt-5 text-xs ">
            All Right Reserved, Copyright 2024
         </div>
      </Container>

   )
}

export default Footer
