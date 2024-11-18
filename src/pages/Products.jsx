import { useEffect, useRef, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { useSearchParams } from "react-router-dom"
import { getProducts } from "../redux/actions"
import ActionTypes from "../constants/ActionTypes"


const Products = () => {
  let { isLoading, error, products, hasDoc, lastVisible, selectedCategory, selectedTag } = useSelector(store => store.products)
  const [searchParams, setSearchParams] = useSearchParams()
  const [sorting, setSorting] = useState(searchParams.get("sırala")?.split("-") || ["created_at", "desc"])
  const [sortActive, setSortActive] = useState(false)


  const dispatch = useDispatch()
  const observerRef = useRef(null)


  const handleSorting = (e) => {
    let f = e.target.value
    searchParams.set("sırala", f)
    setSorting(f.split("-"))
    setSortActive(true)
    if (f == "created_at-desc") { searchParams.delete("sırala") }
    setSearchParams(searchParams)
  }

  useEffect(() => {
    // sorting değişince verileri temizliyoruz
    dispatch({ type: ActionTypes.SELECTED_SORT })
    if (!hasDoc){
      dispatch(getProducts(sorting, selectedCategory, selectedTag, lastVisible, hasDoc))
    }
  }, [sorting])

  useEffect(() => {

    const observerDiv = observerRef.current
    // hasDoc başka sayfa olup olmadığını tutan state
    if (!observerDiv || !hasDoc) return

    const observer = new IntersectionObserver((entires) => {
      entires.forEach(entry => {
        if (entry.isIntersecting) {
          dispatch(getProducts(sorting, selectedCategory, selectedTag, lastVisible, hasDoc))
        }
      })
    },
      {
        root: null, // root null ise, viewport (ekran) gözlemlenir
        threshold: 1.0 // Div tamamen ekrana girdiğinde tetiklenir
      }
    )
    setSortActive(false)
    // div takibi başlasın
    observer.observe(observerDiv)

    // komponent ekrandan ayrılınca takibi bırak
    return () => observer.disconnect()

  }, [lastVisible, sorting, selectedCategory, selectedTag])


  return (
    <Container className="flex flex-col gap-3">

      <select onChange={handleSorting} name="sorting" id="sorting" defaultValue={searchParams.get("sırala") || "created_at-desc"}
        className="self-center rounded-md border-2 px-2 py-1 text-sm">
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

      {/* Ekran girişi takip edilen div. Ekrana girdiğinde yeni ürünler gelir*/}
      <div ref={observerRef} ></div>
    </Container>
  )
}

export default Products
