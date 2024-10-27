import { useEffect } from "react";
import Container from "../components/Container"
import { toast } from 'react-toastify';
import Loader from "../components/Loader";

const Login = () => {

  useEffect(()=>{
    toast.success("Login sayfası")
  }, [])
  
  return (
    <Container stil="flex-grow mt-20 py-20">
      <div>
        <Loader />
      </div>
    </Container>
  )
}

export default Login
