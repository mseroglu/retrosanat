import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { BsMenuUp } from "react-icons/bs";

import { signOut } from "firebase/auth";
import { auth } from "../db-operations/config";
import { toast } from "react-toastify";
import Categories from "./Categories";
import ActionTypes from "../constants/ActionTypes";

// Debounce fonksiyonu
function debounce(func, delay) {
   let timeoutId;

   return function (...args) {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
         func.apply(this, args);
      }, delay);
   };
}

const Navbar = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   //const [searchQuery, setSearchQuery] = useState(searchParams.get("word") || "")
   
   const navigate = useNavigate()

   const handleSearch = (e) => {
      // redux yapıldıktan sonra burası yapılacak
      const searchText = e.target.value.trim()

      if (searchText == ""){
         searchParams.delete("ara")
      }else{
         searchParams.set("ara", e.target.value.trim())
      }
      //setSearchQuery(e.target.value.trim())
      //navigate("/products")
      
      setSearchParams(searchParams)
   }

   const debouncedHandleInput = debounce(handleSearch, 1000);

   const handleSignOut = () => {
      signOut(auth)
         .then(res => {
            navigate("/")
            toast.info("Oturum kapatıldı..")
         })
         .catch(err => toast.error("Oturum kapatılamadı " + err.code))
   }



   return (
      <div className="fixed w-full z-[999]">
         <div className="bg-zinc-200 w-full bg-opacity-75  px-10 md:px-20" >
            <header className="py-3 flex items-center justify-between ">
               <div className="flex gap-3 items-end">
                  <Link to={"/"} className="text-xl md:text-3xl">
                     <div className="font-semibold underline cursor-pointer hover:scale-105 transition logo md:text-[32] xl:text-[40px]">retro
                        <span className="text-yellow-400 logo ">sanat</span>
                     </div>
                  </Link>

                  <Link to={"/products"} 
                  onClick={()=> dispatch({type: ActionTypes.SELECTED_CATEGORY,payload:null})} className="text-slate-600 transition hover:underline md:text-[16px] font-semibold" >Ürünler</Link>
                  {
                     // şart devreye alıanacak
                     // auth.currentUser !== null  &&
                     <Link to={"/addProduct"} className="text-slate-600 transition hover:underline md:text-[16px] font-semibold whitespace-nowrap" >Ürün Ekle</Link>
                  }
                  <div className="flex gap-3 font-normal text-slate-700 ">
                  </div>
               </div>


               <div className="flex gap-2 font-semibold items-center cursor-pointer">
                  {/* menu butonu */}
                  <BsMenuUp className="md:hidden text-xl font-bold" />

                  <div className="relative max-md:hidden ">
                     <input type="text" placeholder="ürün ara" onChange={debouncedHandleInput}
                        className="max-w-60 outline-none p-1 rounded-md" />
                     <FaSearch className="absolute right-1 top-2" />
                  </div>

                  <div className="max-md:hidden">
                     {
                        auth.currentUser
                           ? (
                              <Link to={"/"} onClick={handleSignOut}
                                 className="text-sm border-2 rounded-md w-30 border-zinc-500 grid place-items-center transition overflow-hidden group">
                                 <div className="text-center text-xs w-full whitespace-nowrap overflow-hidden px-1 flex bg-yellow-400 group-hover:bg-slate-900 group-hover:text-yellow-400 transition"> {auth.currentUser?.displayName}
                                 </div>
                                 <div className="flex w-full items-center justify-center gap-2 ps-2 text-black bg-yellow-400 "> Çıkış <IoMdExit className="text-lg bg-yellow-400 text-black rounded-full group-hover:scale-105 transition" />
                                 </div>
                              </Link>
                           ) : (
                              <Link to={"/login"}
                                 className="border-2 rounded-md w-20 border-zinc-500 grid place-items-center transition hover:bg-slate-900 hover:text-white" >
                                 Giriş
                              </Link>
                           )
                     }
                  </div>
               </div>
            </header>
         </div>
         <Categories />
      </div>
   )
}

export default Navbar
