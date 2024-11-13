import { useSearchParams } from "react-router-dom"
import debounce from "../../utils/Debounce"
import { FaSearch } from "react-icons/fa"


const SearchBar = ({className}) => {
   const [searchParams, setSearchParams] = useSearchParams()

   const handleSearch = (e) => {
      // redux yapıldıktan sonra burası yapılacak
      const searchText = e.target.value.trim()

      if (searchText == "") {
         searchParams.delete("ara")
      } else {
         searchParams.set("ara", e.target.value.trim())
      }

      setSearchParams(searchParams)
   }

   const debouncedHandleInput = debounce(handleSearch, 1500);

   return (
      <div className={`${className} relative w-full h-full`}>
         <input type="text" placeholder="ürün ara" autoFocus onChange={debouncedHandleInput}
            className="max-w-60 w-full outline-none p-1 rounded-sm placeholder:text-sm placeholder:font-normal" />
         <FaSearch className="absolute right-1 top-2 text-lg " />
      </div>
   )
}

export default SearchBar
