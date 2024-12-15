import { Link } from "react-router-dom"
import { BsMenuUp } from "react-icons/bs";
import Categories from "./Categories";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import SearchBar from "./SearchInput";
import LoginBtn from "./LoginBtn";


const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false)

   useEffect(()=>{
      // Sayfa kapatıldığında storage deki user ı temizle
      return () => localStorage.removeItem("user")
   },[])


   return (
      <div className="fixed w-full z-[999]">
         <div className="bg-zinc-200 w-full bg-opacity-75 px-20 max-sm:px-2 max-md:px-10" >
            <header className="py-2 flex items-center justify-between gap-2 md:gap-5 lg:gap-10 ">
               <div className="flex gap-3 items-center">

                  <Link to={"/"} className="text-xl md:text-3xl">
                     <div className="font-semibold underline cursor-pointer hover:scale-105 transition logo md:text-[32] xl:text-[40px]">retro
                        <span className="text-yellow-400 logo">sanat</span>
                     </div>
                  </Link>

               </div>

               <SearchBar className="" />

               {isOpen && <Modal setIsOpen={setIsOpen} />}

               <div className="flex flex-col gap-2 items-center">
       
                  {/* menu butonu */}
                  <BsMenuUp className="md:hidden text-xl font-bold cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                  <LoginBtn className="max-md:hidden" setIsOpen={setIsOpen} />
               </div>

            </header>
         </div>

         <Categories />
      </div>
   )
}

export default Navbar
