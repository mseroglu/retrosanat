import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import ActionTypes from "../redux/ActionTypes"
import Loader from "../components/Loader"
import Error from "../components/Error"


const Products = () => {
  //const [product, setProducts] = useState([])
  const { isLoading, error, products } = useSelector(store => store)


  return (
    <Container stil="">

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
