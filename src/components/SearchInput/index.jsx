import { useNavigate, useSearchParams } from "react-router-dom"
import debounce from "../../utils/Debounce"
import { FaSearch } from "react-icons/fa"
import { useDispatch } from "react-redux"
import ActionTypes from "../../constants/ActionTypes"


const SearchBar = ({ className }) => {
   const [searchParams, setSearchParams] = useSearchParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSearch = (e) => {
      // redux yapıldıktan sonra burası yapılacak
      const searchText = e.target.value.trim()

      if (searchText == "") {
         searchParams.delete("ara")
      } else {
         searchParams.set("ara", searchText)
      }
      setSearchParams(searchParams)
      dispatch({type: ActionTypes.ADD_SEARCH_PARAMS, payload: searchParams.get("ara")})
   }

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
