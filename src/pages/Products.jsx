import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { useParams, useSearchParams } from "react-router-dom"
import { getProducts } from "../redux/actions"
import ActionTypes from "../constants/ActionTypes"


const Products = () => {
  let { isLoading, error, products, hasDoc, lastVisible } = useSelector(store => store.products)
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("ara") || "")
  const [selectedCategory, setSelectedCategory] = useState(params.category)
  const [selectedSubCategory, setSelectedSubCategory] = useState(params.subCategory)
  const [selectedTag, setSelectedTag] = useState(params.tag)
  const [moreData, setMoreData] = useState(false)
  const [sorting, setSorting] = useState(searchParams.get("sırala")?.split("-") || ["created_at", "desc"])


  const dispatch = useDispatch()


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
    setSearchKeyword(searchParams.get("ara") || "")

  }, [params, searchParams])

  useEffect(() => {
    console.log("Products render oldu...")
    // sorting değişince verileri temizliyoruz
    dispatch({ type: ActionTypes.SELECTED_SORT })

    dispatch(getProducts(sorting, selectedCategory, selectedTag, lastVisible, searchKeyword, selectedSubCategory))

    // en üste konumlandır
    window.scrollTo(0, 0)
  }, [sorting, selectedCategory, selectedTag, searchKeyword, selectedSubCategory, moreData])


  return (
    <Container className="flex flex-col gap-3 lg:gap-4 align-items-center mt-24">

      <select onChange={handleSorting} name="sorting" id="sorting" defaultValue={searchParams.get("sırala") || "created_at-desc"}
        className="self-center rounded-md border-2 px-2 py-1 mt-16 text-sm">
        <option value="created_at-desc">Sırala (Varsayılan önce yeni)</option>
        <option value="price-asc">Ucuzdan pahalıya</option>
        <option value="price-desc">Pahalıdan ucuza</option>
        <option value="title-asc">Ürün Adı A &gt; Z</option>
        <option value="title-desc">Ürün Adı Z &gt; A</option>
      </select>

      <div className="grid place-items-center" >

        {
          isLoading
            ? <Loader />
            : error
              ? <Error err={error} />
              : <>
                {
                  products.length == 0
                    ? <h2 className="mt-20 font-semibold">Ürün bulunamadı..</h2>
                    :
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-12 justify-center min-h-[400px] ">
                      {
                        products?.map((item, i) => <ProductCard key={i} product={item} />)
                      }
                    </div>
                }
              </>

        }
      </div>

      {
        hasDoc &&
        <div onClick={() => setMoreData(prev => !prev)} className="border p-1 w-fit rounded-full px-3 cursor-pointer" >Daha Fazla Ürün</div>
      }

    </Container>
  )
}

export default Products


{/**
   useEffect(() => {
    const observerDiv = observerRef.current
    // hasDoc başka sayfa olup olmadığını tutan state
    if (!hasDoc){
     () => observer.disconnect()
    }

    if (!observerDiv || !hasDoc) return
    
    const observer = new IntersectionObserver((entires) => {
      entires.forEach(entry => {
        if (entry.isIntersecting) {

          //! BURASI SİLİNECEK
          //console.log([lastVisible, sorting, selectedCategory, selectedTag, searchKeyword, selectedSubCategory])
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
  
  */}