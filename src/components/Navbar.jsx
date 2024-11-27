import { Link } from "react-router-dom"
import { IoMdExit } from "react-icons/io";
import { BsMenuUp } from "react-icons/bs";

import { auth } from "../db-operations/config";
import Categories from "./Categories";
import ActionTypes from "../constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "../components/Modal";
import SearchBar from "./SearchInput";
import LoginBtn from "./LoginBtn";


const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false)

   const dispatch = useDispatch()

   const categoryReset = () => {
      dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: null })
   }


   return (
      <div className="fixed w-full z-[999]">
         <div className="bg-zinc-200 w-full bg-opacity-75  px-10 md:px-20" >
            <header className="py-2 flex items-center justify-between gap-2 md:gap-5 lg:gap-10 ">
               <div className="flex gap-3 items-center">

                  <Link to={"/"} className="text-xl md:text-3xl">
                     <div className="font-semibold underline cursor-pointer hover:scale-105 transition logo md:text-[32] xl:text-[40px]">retro
                        <span className="text-yellow-400 logo ">sanat</span>
                     </div>
                  </Link>

                  {/*      BURASI SİLİNECEK
                  <Link to={"/products"}
                     onClick={categoryReset} className="text-slate-600 transition hover:underline text-sm font-semibold" > Ürünler
                  </Link>
                   */}

                  <div className="flex gap-3 font-normal text-slate-700 ">
                  </div>
               </div>


               <SearchBar className="max-md:hidden111" />

               {isOpen && <Modal setIsOpen={setIsOpen} />}

               <div className="flex flex-col gap-2 items-center">
                  {
                     // şart devreye alınacak
                     // auth.currentUser !== null  &&
                     
                     <Link to={"/dashboard"} onClick={categoryReset} className="text-slate-600 transition hover:underline text-xs font-semibold whitespace-nowrap " > Yönetici Paneli
                     </Link>
                     
                  }

                  {/* menu butonu */}
                  <BsMenuUp className="md:hidden text-xl font-bold cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                  <LoginBtn className="max-md:hidden" />
               </div>

            </header>
         </div>
         <Categories />
      </div>
   )
}

export default Navbar
