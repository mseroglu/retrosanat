import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import ActionTypes from "../../constants/ActionTypes"


const Tag = ({ item, className }) => {

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleClickTag = (e) => {      
      const tag = e.target.innerText.toLocaleLowerCase()
      dispatch({ type: ActionTypes.SELECTED_TAG, payload: tag })
      navigate("/products/tag/" + tag)
   }
   return (
      <span onClick={handleClickTag}
         className={`${className} text-xs rounded-full cursor-pointer px-2 z-[99]`}>
         {item}
      </span>
   )
}

export default Tag
