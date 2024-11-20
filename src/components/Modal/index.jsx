import { IoMdCloseCircleOutline } from "react-icons/io";
import SearchBar from "../SearchInput";
import LoginBtn from "../LoginBtn";



const Modal = ({ setIsOpen }) => {

   return (
      <div className="absolute top-8 right-0 w-[300px] bg-slate-200 md:hidden border-2 border-zinc-500 rounded-lg z-50">

         <div className="border relative flex gap-2 bg-zinc-200 py-5 px-2 rounded-lg items-center">

            <IoMdCloseCircleOutline
               className="absolute top-1 right-1 text-lg cursor-pointer"
               onClick={() => setIsOpen(false)} />

            <SearchBar />

            <LoginBtn setIsOpen={setIsOpen} />
         </div>

      </div>
   )
}

export default Modal
