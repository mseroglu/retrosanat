import Container from "../components/Container"
import ProductCard from "../components/ProductCard"


const Products = () => {

  const data = [
    {
      id: 1,
      title: "ürün adı 2",
      description: "ürün açıklaması Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ipsa.",
      amount: 10,
      price: 100,
      photo: "art-5.jpg"
    },
    {
      id: 2,
      title: "ürün adı 2",
      description: "ürün açıklaması Lorem ipsum dolor sit amet.",
      amount: 10,
      price: 100,
      photo: "art-4.jpg"
    },
    {
      id: 3,
      title: "ürün adı ürün adı ürün adı ürün adı ürün adı 3",
      description: "ürün açıklaması Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ipsa.",
      amount: 110,
      price: 150,
      photo: "art-3.jpg"
    }
  ]
  return (
    <Container stil="flex-grow mt-20 py-20">
      <div className="flex gap-3 flex-wrap justify-center">        
        {data.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>
    </Container>
  )
}

export default Products
