import { Link } from "react-router-dom"
import Container from "./Container"
import { FaSearch } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { BsMenuUp } from "react-icons/bs";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Navbar = () => {
   const [activeUser, setActiveUser] = useState(null)

   const handleSignOut = () => {
      signOut(auth)
         .then(res => {
            setActiveUser(null)
            toast.info("Oturum kapatıldı..", { position: "bottom-right" })
         })
         .catch(err => toast.error("Oturum kapatılamadı " + err.code, { position: "bottom-right" }))
   }
   return (
      <>
         <Container stil="bg-zinc-200 fixed left-0 right-0 z-[999] bg-opacity-75" >
            <header className="py-3 flex items-center justify-between  ">
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


               <div className="flex gap-2 font-semibold items-center cursor-pointer">

                  <BsMenuUp className="md:hidden text-xl font-bold" />
                  <div className="relative max-md:hidden">
                     <input type="text" placeholder="ürün ara" className="w-60 outline-none p-1 rounded-md" />
                     <FaSearch className="absolute right-1 top-2" />
                  </div>
                  <div className="max-md:hidden">
                     {
                        auth.currentUser
                           ? (
                              <Link to={"/"} onClick={handleSignOut}
                                 className="text-sm border-2 rounded-md w-30 border-zinc-500 grid place-items-center transition overflow-hidden group">
                                 <div className="text-center text-xs w-full whitespace-nowrap overflow-hidden px-1 flex bg-yellow-400 group-hover:bg-slate-900 group-hover:text-yellow-400 transition"> {activeUser?.displayName}
                                 </div>
                                 <div className="flex w-full items-center justify-center gap-2 ps-2 text-black bg-yellow-400 "> Çıkış <IoMdExit className="text-lg bg-yellow-400 text-black rounded-full group-hover:scale-105 transition" />
                                 </div>
                              </Link>
                           ) : (
                              <Link to={"/login"} onClick={() => setActiveUser(auth.currentUser)}
                                 className="border-2 rounded-md w-20 border-zinc-500 grid place-items-center transition hover:bg-slate-900 hover:text-white" >
                                 Giriş
                              </Link>
                           )
                     }
                  </div>
               </div>
            </header>
         </Container>
      </>
   )
}

export default Navbar
