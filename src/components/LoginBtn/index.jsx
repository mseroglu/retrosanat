import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../db-operations/config'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { IoMdExit } from 'react-icons/io'


const LoginBtn = ({className, setIsOpen=()=>{} }) => {

   const navigate = useNavigate()

   
   const handleSignOut = () => {
      signOut(auth)
         .then(res => {
            navigate("/")
            toast.info("Oturum kapatıldı..")
            setIsOpen(false)
         })
         .catch(err => toast.error("Oturum kapatılamadı " + err.code))
   }

   return (
      <div className={className}>
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
                  <Link to={"/login"} onClick={()=> setIsOpen(false)}
                     className="border-2 rounded-md w-20 border-zinc-500 grid place-items-center transition hover:bg-slate-900 hover:text-white" >
                     Giriş
                  </Link>
               )
         }
      </div>
   )
}

export default LoginBtn
