import Carousel from "../../components/Carousel"
import Container from "../../components/Container"
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { useEffect, useState } from "react";
import { db } from "../../db-operations/config";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { useDispatch } from "react-redux";
import ActionTypes from "../../constants/ActionTypes";
import { useSearchParams } from "react-router-dom";
import LastProducts from "./LastProducts";
import ShowCampaigns from "./ShowCampaigns";


const MainPage = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  // collection un referansı
  const productsColl = collection(db, "products")

  useEffect(() => {
    // seçili kategoriyi temizliyoruz
    dispatch({ type: ActionTypes.SELECTED_CATEGORY, payload: null })
    // sorgu ayarları 
    const q = query(productsColl,
      where("indexMainImage", "in", [0, 1, 2, 3]),
      orderBy("created_at", "desc"),
      limit(10))

    const result = []
    setIsLoading(true)
    // ürünleri alma

    getDocs(q)
      .then(res => {
        res.forEach(item => { result.push({ ...item.data(), id: item.id }) })
        setProducts(result)
      })
      .catch(err => {
        console.log(err)
        setError(err.code)
      })
    setIsLoading(false)

  }, [])





  return (
    <>
      <Container className={"mt-24"}>
        <div className="w-full h-fit ">
          {
            isLoading
              ? <Loader />
              : error
                ? <Error err={error} />
                : <Carousel products={products} />
          }
        </div>
      </Container>

      {/** KAMPANYALAR */}
      <Container className="bg-zinc-200 mt-20" >
        <ShowCampaigns />
      </Container>

      <Container className="bg-zinc-100">
        <div className="w-full h-fit ">
          <LastProducts />
        </div>
      </Container>



    </>

  )
}

export default MainPage
