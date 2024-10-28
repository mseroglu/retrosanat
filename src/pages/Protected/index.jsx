import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/config"


const Protected = () => {
   const [isAuth, setIsAuth] = useState()

   useEffect(() => {
      // kullanıcı durunmunu sürekli izleyen fonksiyon
      onAuthStateChanged(auth, (user) => {
         setIsAuth(user ? true : false)
      })
   }, [])


   if (isAuth === false) {
      // useNavigate yerine bu bileşeni kullanıyoruz, performans için
      return <Navigate to="/" />
   }

   return (<Outlet />)
}

export default Protected
