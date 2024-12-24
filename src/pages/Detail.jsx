import { Link, useParams } from "react-router-dom"
import Container from "../components/Container"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../db-operations/config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { GrFormPrevious } from "react-icons/gr";
import Tag from "../components/Tag"
import { useSelector } from "react-redux"


const Detail = () => {
  const { products } = useSelector(store => store.products)
  const [data, setData] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  const docRef = doc(db, "products", params.id)

  useEffect(() => {
    // data store da varsa ordan al, yoksa api den çek
    const found = products.find(item => item.id === params.id)
    if (found) {
      setData(found)
    } else {
      setIsLoading(true)
      getDoc(docRef)
        .then((res) => {
          setData(res.data())
          setImageIndex(res.data().indexMainImage)
        })
        .catch(err => toast.error("Veri alınamadı! HATA: " + err.code))
      setIsLoading(false)
    }
  }, [])


  return (
    <Container className="grid place-items-center ">
      {isLoading
        ? <Loader />
        : data && (
          <div className="grid grid-cols-1 md:grid-cols-2 shadow-md shadow-slate-900 bg-zinc-100 relative place-items-center
          w-[320px] min-h-min md:w-[640px] md:h-[320px] lg:w-[800px] lg:h-[400px] max-md:mt-24">

            <div className="absolute top-[-36px] right-0 ">
              <Link to={-1} className="flex items-center bg-yellow-300 rounded-full pe-3 hover:bg-yellow-400">
                <GrFormPrevious className="text-3xl" />önceki sayfa
              </Link>
            </div>

            <div className="col-span-1 h-full w-full ">
                <img src={data.photos[imageIndex || 0]} alt="product-image"
                  className="max-xs:h-[300px] max-xs:w-[300px] w-full h-full lg:h-[400px] lg:w-full transition object-cover hover:scale-125 " />
            </div>

            <div className="col-span-1 flex flex-col-reverse md:flex-col h-full w-full bg-zinc-100">
              <div className="flex flex-col px-5 pb-2 h-full justify-between ">
                <div className="grid gap-3 w-full items-center " >
                  <h2 className="font-bold text-2xl capitalize mt-3 lg:mt-5">{data.title}</h2>
                  <p className="first-letter:uppercase text-sm">{data.description}</p>

                  {/* Fiyat ve miktar düzeni için */}
                  <table>
                    <tbody>
                      <tr>
                        <td>Stok </td>
                        <td className="w-4  text-center"> : </td>
                        <td> {data.stock} Adet</td>
                      </tr>
                      <tr>
                        <td> Fiyat </td>
                        <td className="w-4 text-center"> : </td>
                        <td> {data.price} ₺</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* TAGLAR */}
                <div className="flex gap-1 h-max mt-5">
                  {data.tags?.map((item, i) => (
                    <Tag key={i} item={item} className="border-2 border-gray-600 bg-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Mini fotolar */}
              <div className="flex gap-2 bg-zinc-300 py-3 justify-center">
                {data.photos.map((item, i) =>
                  <img key={i} src={item} alt="product-image"
                    className={`w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-full border-4 ${imageIndex == i ? "border-zinc-100" : "border-zinc-400"}`}
                    onMouseEnter={() => setImageIndex(i)} />
                )}
              </div>
            </div>

          </div>
        )}
    </Container>
  )
}

export default Detail
