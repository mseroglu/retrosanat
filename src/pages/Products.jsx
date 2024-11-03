import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../redux/ActionTypes"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { collection, getDocs, limit, or, orderBy, query, where } from "firebase/firestore"
import { db } from "../db-operations/config"
import { SORT_PARAMS } from "../utils/categories"
import { useSearchParams } from "react-router-dom"


const Products = () => {
  let { isLoading, error, products } = useSelector(store => store)
  const [filter, setFilter] = useState(["created_at", "desc"])

  const dispatch = useDispatch()

  const handleFilter = (e) => {
    setFilter(SORT_PARAMS[e.target.value])
  }

  // collection un referansı
  const productsColl = collection(db, "products")

  useEffect(() => {
    // sorgu ayarları 
    const q = query(productsColl, orderBy(...filter), limit(30))

    const result = []
    // tüm ürünleri alma
    dispatch({ type: ActionTypes.PRODUCTS_LOADING })
    getDocs(q)
      .then(res => {
        res.forEach(item => { result.push({ ...item.data(), id: item.id }) })
        //setProducts(result)        
        dispatch({ type: ActionTypes.PRODUCTS_SUCCESS, payload: result })
      })
      .catch(err => {
        dispatch({ type: ActionTypes.PRODUCTS_ERROR, payload: err.code })
      })

  }, [filter])


  return (
    <Container stil="flex flex-col gap-3">
      <div className="flex gap-5 self-center p-3 rounded-md border">
        <label htmlFor="filter">Sırala</label>
        <select onChange={handleFilter} name="filter" id="filter" className="border">
          <option value="desc-created_at">Son eklenen</option>
          <option value="asc-price">Ucuzdan pahalıya</option>
          <option value="desc-price">Pahalıdan ucuza</option>
          <option value="asc-title">Ürün Adı A&gt;Z</option>
          <option value="desc-title">Ürün Adı Z&gt;A</option>
        </select>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {
          isLoading
            ? <Loader />
            : error
              ? <Error err={error} />
              : products?.map((item, i) => <ProductCard key={i} product={item} />)
        }
      </div>
    </Container>
  )
}

export default Products
