import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../db-operations/config"


const Products = () => {
  const [products, setProducts] = useState([])

  // collection un referansı
  const productsColl = collection(db, "products")

  useEffect(() => {
    // sorgu ayarları 
    const q = query(productsColl, orderBy("created_at", "desc"), limit(15))

    const temp = []
    // tüm ürünleri alma
    getDocs(q)
      .then(res => res.forEach(item => {
        temp.push({ ...item.data(), id: item.id })
        setProducts(temp)
      }))
      .catch(err => console.log(err))

  }, [])

  const liste = new Array(10).fill(1)
  console.log(liste)

  return (
    <Container stil="flex-grow py-20">
      <div id="categories" className="flex gap-1 justify-between items-center mb-10">
        {liste.map((item) => (
          <span className={`w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-4 grid place-items-center text-center cursor-pointer border-yellow-400`}></span>
          ))}
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {products?.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>
    </Container>
  )
}

export default Products
