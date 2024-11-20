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

   const categoryReset = ()=>{
      dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: null })
   }


   return (
      <div className="fixed w-full z-[999]">
         <div className="bg-zinc-200 w-full bg-opacity-75  px-10 md:px-20" >
            <header className="py-2 flex items-center justify-between ">
               <div className="flex gap-3 items-center">

                  <Link to={"/"} className="text-xl md:text-3xl">
                     <div className="font-semibold underline cursor-pointer hover:scale-105 transition logo md:text-[32] xl:text-[40px]">retro
                        <span className="text-yellow-400 logo ">sanat</span>
                     </div>
                  </Link>

                  <Link to={"/products"}
                     onClick={categoryReset} className="text-slate-600 transition hover:underline text-sm font-semibold" > Ürünler
                  </Link>
                  {
                     // şart devreye alınacak
                     // auth.currentUser !== null  &&

                     <Link to={"/dashboard"} onClick={categoryReset} className="text-slate-600 transition hover:underline text-sm font-semibold whitespace-nowrap" > Dashboard
                     </Link>

                  }
                  <div className="flex gap-3 font-normal text-slate-700 ">
                  </div>
               </div>


               <div className="flex gap-2 font-semibold items-center relative">
                  {/* menu butonu */}
                  <BsMenuUp className="md:hidden text-xl font-bold cursor-pointer" onClick={() => setIsOpen(!isOpen)} />

                  {isOpen && <Modal setIsOpen={setIsOpen} />}

                  <SearchBar className="max-md:hidden" />

                  <LoginBtn className="max-md:hidden" />

               </div>
            </header>
         </div>
         <Categories />
      </div>
   )
}

export default Navbar
