import { useEffect } from "react";
import Container from "../components/Container"
import { toast } from 'react-toastify';

const Login = () => {

  useEffect(()=>{
    toast.success("Login sayfası")
  }, [])
  
  return (
    <Container>
      <div>
        
      </div>
    </Container>
  )
}

export default Login
