import { useEffect, useRef, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { useParams, useSearchParams } from "react-router-dom"
import { getProducts } from "../redux/actions"
import ActionTypes from "../constants/ActionTypes"


const Products = () => {
  let { isLoading, error, products, hasDoc, lastVisible, } = useSelector(store => store.products)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedSubCategory, setSelectedSubCategory] = useState()
  const [selectedTag, setSelectedTag] = useState()
  const [sorting, setSorting] = useState(searchParams.get("sırala")?.split("-") || ["created_at", "desc"])


  const dispatch = useDispatch()
  const observerRef = useRef(null)
  const params = useParams()


  const handleSorting = (e) => {
    const val = e.target.value
    searchParams.set("sırala", val)
    setSorting(val.split("-"))

    if (val == "created_at-desc") { searchParams.delete("sırala") }
    setSearchParams(searchParams)
  }

  useEffect(() => {
    setSelectedCategory(params.category)
    setSelectedSubCategory(params.subCategory)
    setSelectedTag(params.tag)

    // sıralama parametresi varsa
    const sirala = searchParams.get("sırala")
    if (sirala) {
      setSorting(sirala.split("-"))
    }

    // arama parametresi varsa
    setSearchKeyword(searchParams.get("ara")||"")

  }, [params, searchParams])

  useEffect(() => {
    // sorting değişince verileri temizliyoruz
    dispatch({ type: ActionTypes.SELECTED_SORT })

    if (!hasDoc) {
      dispatch(getProducts(sorting, selectedCategory, selectedTag, lastVisible, searchKeyword, selectedSubCategory))
    }
  }, [sorting, searchKeyword,selectedSubCategory])

  useEffect(() => {
    const observerDiv = observerRef.current
    // hasDoc başka sayfa olup olmadığını tutan state
    if (!observerDiv || !hasDoc) return
    
    const observer = new IntersectionObserver((entires) => {
      entires.forEach(entry => {
        if (entry.isIntersecting) {
          console.log([lastVisible, sorting, selectedCategory, selectedTag, searchKeyword, selectedSubCategory])
          dispatch(getProducts(sorting, selectedCategory, selectedTag, lastVisible, searchKeyword, selectedSubCategory))
        }
      })
    },
      {
        root: null, // root null ise, viewport (ekran) gözlemlenir
        threshold: 1.0 // Div tamamen ekrana girdiğinde tetiklenir
      }
    )
    // div takibi başlasın
    observer.observe(observerDiv)

    // komponent ekrandan ayrılınca takibi bırak
    return () => observer.disconnect()

  }, [lastVisible, sorting, selectedCategory, selectedTag, searchKeyword, selectedSubCategory])


  return (
    <Container className="flex flex-col gap-3">

      <select onChange={handleSorting} name="sorting" id="sorting" defaultValue={searchParams.get("sırala") || "created_at-desc"}
        className="self-center rounded-md border-2 px-2 py-1 mt-16 text-sm">
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
