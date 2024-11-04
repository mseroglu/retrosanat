import Carousel from "../components/Carousel"
import Container from "../components/Container"
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useEffect } from "react";
import { db } from "../db-operations/config";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import ActionTypes from "../redux/ActionTypes";


const MainPage = () => {
  let { isLoading, error, productsCarousel } = useSelector(store => store)
  console.log(productsCarousel)
  
  const dispatch = useDispatch()

  // collection un referansı
  const productsColl = collection(db, "products")

  useEffect(() => {
    // sorgu ayarları 
    const q = query(productsColl, where("indexMainImage", "in", [0,1,2,3]), orderBy("created_at", "desc"), limit(10))

    const result = []
    // tüm ürünleri alma
    dispatch({ type: ActionTypes.PRODUCTS_LOADING })
    getDocs(q)
      .then(res => {
        res.forEach(item => { result.push({...item.data(), id:item.id}) })
        //setProducts(result)        
        dispatch({ type: ActionTypes.PRODUCTS_CAROUSEL_SUCCESS, payload: result })
      })
      .catch(err => {
        dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code })
      })

  }, [])



  return (
    <Container stil="">
      <div className="w-full h-fit ">
        {
          isLoading
            ? <Loader />
            : error
              ? <Error err={error} />
              : <Carousel products={productsCarousel}/>
        }
      </div>
    </Container>

  )
}

export default MainPage
