import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { getProducts } from "../db-operations/getProducts"
import { useSearchParams } from "react-router-dom"


const Products = () => {
  let { isLoading, error, products, selectedCategory, selectedTag } = useSelector(store => store)
  const [sorting, setSorting] = useState(["created_at", "desc"])
  console.log(products)
  const dispatch = useDispatch()

  const handleSorting = (e) => {
    let f = e.target.value
    f = f.split("-")
    setSorting(f)
  }

  useEffect(() => {
    getProducts(sorting, dispatch, selectedCategory, selectedTag)
    console.log(sorting, selectedCategory, selectedTag)
  }, [sorting, selectedCategory, selectedTag])

  console.log("Products render oldu")
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
                ? <h2 className="mt-20 font-semibold">Ürün bulunamadı..</h2>
                : products?.map((item, i) => <ProductCard key={i} product={item} />)
        }
      </div>
    </Container>
  )
}

export default Products
