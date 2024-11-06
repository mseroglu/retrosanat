import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../constants/ActionTypes"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { collection, getDocs, limit, or, orderBy, query, where } from "firebase/firestore"
import { db } from "../db-operations/config"
import { useSearchParams } from "react-router-dom"


const Products = () => {
  let { isLoading, error, products } = useSelector(store => store)
  const [sorting, setSorting] = useState(["created_at", "desc"])
  console.log(products)
  const dispatch = useDispatch()

  const handleSorting = (e) => {
    let f = e.target.value
    f = f.split("-")
    setSorting(f)
  }

  // collection un referansı
  const productsColl = collection(db, "products")

  useEffect(() => {
    // sorgu ayarları 
    const q = query(productsColl, orderBy(...sorting), limit(30))

    const result = []
    // ürünleri alma
    dispatch({ type: ActionTypes.PRODUCTS_LOADING })
    getDocs(q)
      .then(res => {
        res.forEach(item => result.push({ ...item.data(), id: item.id }) )                
        dispatch({ type: ActionTypes.PRODUCTS_SUCCESS, payload: result })
      })
      .catch(err => {
        dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code })
      })

  }, [sorting])


  return (
    <Container className="flex flex-col gap-3">
      <select onChange={handleSorting} name="sorting" id="sorting"
        className="self-center rounded-md border-2 px-2 py-1">
        <option value="created_at-desc">Sırala (Varsayılan son eklenen)</option>
        <option value="price-asc">Ucuzdan pahalıya</option>
        <option value="price-desc">Pahalıdan ucuza</option>
        <option value="title-asc">Ürün Adı A &gt; Z</option>
        <option value="title-desc">Ürün Adı Z &gt; A</option>
      </select>
      
      <div className="flex gap-4 flex-wrap justify-center min-h-[400px]">
        {
          isLoading
            ? <Loader />
            : error
              ? <Error err={error} />
              : products.length == 0
                ? <h2 className="mt-20">Ürün bulunamadı..</h2>
                : products?.map((item, i) => <ProductCard key={i} product={item} />)
        }
      </div>
    </Container>
  )
}

export default Products
