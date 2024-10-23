import Container from "../Container"
import "./loader.css"

const Loader = () => {
   return (
      <div className="w-full flex justify-center mt-20">
         <div className="loading ">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
         </div>
      </div>
   )
}

export default Loader
