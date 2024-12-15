import Carousel from "../components/Carousel"
import Container from "../components/Container"
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useEffect, useState } from "react";
import { db } from "../db-operations/config";
import { collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../constants/ActionTypes";
import { Link, useNavigate, useSearchParams } from "react-router-dom";


const MainPage = () => {
  const { campaigns, } = useSelector(store => store.campaigns)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // collection un referansı
  const productsColl = collection(db, "products")
  const campaignsColl = collection(db, "campaigns")

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
    /*  onSnapshot(q, (snapshot)=>{
      snapshot.forEach(item => { result.push({ ...item.data(), id: item.id }) })
      setProducts(result)      
    })    */
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

  useEffect(() => {
    const result = []
    const q = query(campaignsColl, where("isActive", "==", true), orderBy("startDate", "desc"))

    getDocs(q)
      .then(res => {
        res.forEach(item => result.push({ ...item.data(), id: item.id }))
        dispatch({ type: ActionTypes.CAMPAIGNS_SUCCESS, payload: result })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: ActionTypes.CAMPAIGNS_ERROR, payload: err.code })
      })
  }, [])

  const getCampaignProduct = ()=> {
    navigate("/products/")
    setSearchParams({})
  }


  return (
    <Container >
      <div className="w-full h-fit ">
        {
          isLoading
            ? <Loader />
            : error
              ? <Error err={error} />
              : <Carousel products={products} />
        }
      </div>

      {/** KAMPANYALAR */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20">
        {
          campaigns.map((campaign,i) => (
            <div key={campaign.id} className="col-span-1 relative cursor-pointer" onClick={getCampaignProduct }>
              <img src={`art-${i+3}.jpg`} className="rounded-lg w-full h-[200px]" />
              <span className="absolute top-1 left-1 px-2 text-sm font-semibold bg-opacity-40 rounded-lg bg-yellow-300 capitalize">{ campaign.title }</span>
            </div>
          ))
        }
      </div>
    </Container>

  )
}

export default MainPage
