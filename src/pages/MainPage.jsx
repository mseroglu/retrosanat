import Carousel from "../components/Carousel"
import Container from "../components/Container"
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useEffect, useState } from "react";
import { db } from "../db-operations/config";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"


const MainPage = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // collection un referansı
  const productsColl = collection(db, "products")

  useEffect(() => {
    // sorgu ayarları 
    const q = query(productsColl, where("indexMainImage", "in", [0, 1, 2, 3]), orderBy("created_at", "desc"), limit(10))

    const result = []
    setIsLoading(true)
    // ürünleri alma
    getDocs(q)
      .then(res => {
        res.forEach(item => { result.push({ ...item.data(), id: item.id }) })
        setProducts(result)
      })
      .catch(err => {
        console.log(err.code)
        setError(err.code)
      })
    setIsLoading(false)

  }, [])

  console.log(products)

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
    </Container>

  )
}

export default MainPage
