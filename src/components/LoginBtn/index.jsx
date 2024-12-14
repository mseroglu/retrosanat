import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../db-operations/config'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import ActionTypes from '../../constants/ActionTypes'
import { BiLogIn, BiLogOut } from 'react-icons/bi'


const LoginBtn = ({ className, setIsOpen }) => {

   const navigate = useNavigate()

   const categoryReset = () => {
      dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: null })
   }

   const handleSignOut = () => {
      signOut(auth)
         .then(res => {
            navigate("/")
            setIsOpen(false)
            localStorage.removeItem("user")
            toast.info("Oturum kapatıldı..")
         })
         .catch(err => toast.error("Oturum kapatılamadı " + err.code))
   }

   return (
      <div className={`flex flex-col gap-2 items-center ${className}`}>
         {
            JSON.parse(localStorage.getItem("user"))?.email &&
            <Link to={"/dashboard"} onClick={categoryReset}
               className="text-slate-600 transition hover:underline text-xs font-semibold whitespace-nowrap " >
               Yönetici Paneli
            </Link>
         }
         {
            JSON.parse(localStorage.getItem("user"))?.email
               ? (
                  <Link to={"/"} onClick={handleSignOut}
                     className="text-sm border-2 rounded-md w-30 border-zinc-500 grid place-items-center transition overflow-hidden group">
                     <div className="text-center text-xs w-full whitespace-nowrap overflow-hidden px-1 flex bg-yellow-400 group-hover:bg-slate-900 group-hover:text-yellow-400 transition"> {JSON.parse(localStorage.getItem("user"))?.name}
                     </div>
                     <div className="flex w-full items-center justify-center gap-2 ps-2 text-black bg-yellow-400 "> 
                        <BiLogOut className="text-lg bg-yellow-400 text-black rounded-full group-hover:scale-105 transition" />
                        Çıkış 
                     </div>
                  </Link>
               ) : (
                  <Link to={"/login"} onClick={() => setIsOpen(false)}
                     className="border-2 rounded-md w-20 border-zinc-500 flex items-center gap-1 justify-center transition hover:bg-slate-900 hover:text-white" >
                        <BiLogIn />
                     Giriş
                  </Link>
               )
         }
      </div>
   )
}

export default LoginBtn
