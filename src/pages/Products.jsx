import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../firebase_/config"


const Products = () => {
  const [products, setProducts] = useState([])

  // collection un referansı
  const productsColl = collection(db, "products")

  useEffect(() => {
    // sorgu ayarları 
    const q = query(productsColl, orderBy("created_at", "desc"), limit(5))

    const temp = []
    // tüm ürünleri alma
    getDocs(q)
      .then(res => res.forEach(item => {
        temp.push({ ...item.data(), id: item.id })
        setProducts(temp)
      }))
      .catch(err => console.log(err))   

  }, [])

  return (
    <Container stil="flex-grow mt-20 py-20">
      <div className="flex gap-4 flex-wrap justify-center">
        {products?.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>
    </Container>
  )
}

export default Products
