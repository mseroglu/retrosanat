import { useEffect, useState } from "react";
import Container from "../components/Container"
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../db-operations/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
    

  const handleClick = () => {
    setIsLoading(true)
    signInWithPopup(auth, provider)
      .then(res => {
        toast.success("Giriş başarılı..", { position: "bottom-right" })
        localStorage.setItem("user", JSON.stringify({name: res.user.displayName, email: res.user.email}))
        navigate("/products")
      })
      .catch(err => {
        toast.error("Giriş başarısız!  HATA:" + err.code, { position: "bottom-right" })
      })
    setIsLoading(false)
  }

  const handleSignOut = () => {
    setIsLoading(true)
    signOut(auth)
    .then(res => {
      toast.info("Oturum kapatıldı..", {position:"bottom-right"})
      navigate("/")
      localStorage.removeItem("user")
    })
    .catch(err => {
      toast.error("Oturum kapatılamadı "+err.code, {position: "bottom-right"})
    })
    setIsLoading(false)
  }

  useEffect(()=> {
    console.log(auth.currentUser)
  }, [auth.currentUser])

  return (
    <Container >
      <div className="grid place-items-center h-[450px]">
        {
          isLoading
            ? <Loader />
            : JSON.parse(localStorage.getItem("user"))
              ? (
                <button onClick={handleSignOut}
                  className="border-2 rounded-full px-5 py-3 grid place-items-center ">
                  <img src="google-logo.svg" alt="google-logo" width={50} />
                  Google Çıkış
                </button>)
              : (
                <button onClick={handleClick}
                  className="border-2 rounded-full px-5 py-3 grid place-items-center ">
                  <img src="google-logo.svg" alt="google-logo" width={50} />
                  Google Giriş
                </button>
              )
        }
      </div>
    </Container>
  )
}

export default Login
