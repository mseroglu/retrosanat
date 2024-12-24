import { Link } from "react-router-dom";
import Container from "../Container"
import { FaFacebook, FaInstagram, FaSquareYoutube } from "react-icons/fa6";
import GoogleMap from "./GoogleMap";


const Footer = () => {
   return (
      <Container className="max-h-max bg-slate-800 text-white flex flex-col lg:flex-row gap-5">
         <div className="flex justify-center rounded-3xl overflow-hidden shadow-white shadow-md w-full sm:w-fit mx-auto ">
            <GoogleMap />
         </div>
         <div className="flex flex-col gap-3 items-center justify-center flex-grow ">
            <div className="flex items-center justify-center gap-3">
               <Link to="https://www.facebook.com/retrosanat72" target="_blank" >
                  <FaFacebook className="w-6 h-6 hover:text-blue-500 transition" />
               </Link>
               <Link to="https://www.instagram.com/retrosanat72" target="_blank">
                  <FaInstagram className="w-6 h-6 hover:text-orange-400 transition" />
               </Link>
            </div>
            <div className="flex gap-3 items-center justify-center">
               <Link to={"/"} className="hover:text-yellow-400 transition">Anasayfa</Link>
               <Link to={"/products"} className="hover:text-yellow-400 transition">Ürünler</Link>
               <Link to={"/addProduct"} className="hover:text-yellow-400 transition">Ürün ekle</Link>
            </div>
            <div className="text-center mt-5 text-xs ">
               All Right Reserved, Copyright 2024
            </div>
         </div>
      </Container>

   )
}

export default Footer
