import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import debounce from "../../utils/Debounce"
import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"



const SearchBar = ({ className }) => {
   const [searchParams, setSearchParams] = useSearchParams()
   const location = useLocation()
   const [searchText, setSearchText] = useState("")
   const navigate = useNavigate()

   const handleSearch = (e) =>{
      const text = e.target.value.trim()
      setSearchText(text.toLocaleLowerCase())    

      // arama yapılırken başka sayfada ise /products sayfasına git
      if (!location.pathname.startsWith("/products")){
         navigate("/products")
      }  
   }

   useEffect(() => {
      if (searchText == "") {
         searchParams.delete("ara")
      } else {
         searchParams.set("ara", searchText)
      }
      setSearchParams(searchParams)
   }, [searchText])

   const debouncedHandleInput = debounce(handleSearch, 1500);

   return (
      <div className={`${className} relative w-full h-full max-w-[500px]`}>
         <input type="text" placeholder="Ne aramıştınız?" autoFocus onChange={debouncedHandleInput}
            className="w-full outline-none py-1 px-3 rounded-full placeholder:text-sm placeholder:font-normal" />
         <FaSearch className="absolute right-0 top-0 text-lg text-white bg-gray-500 rounded-full w-8 h-8 p-2" />
      </div>
   )
}

export default SearchBar
