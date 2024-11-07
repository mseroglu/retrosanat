import { Link, useParams } from "react-router-dom"
import Container from "../components/Container"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../db-operations/config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { GrFormPrevious } from "react-icons/gr";
import Tag from "../components/Tag"


const Detail = () => {
  const [data, setData] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  const docRef = doc(db, "products", params.id)

  useEffect(() => {
    setIsLoading(true)
    getDoc(docRef)
      .then((res) => {
        setData(res.data())
        setImageIndex(res.data().indexMainImage)
      })
      .catch(err => toast.error("Veri alınamadı! HATA: " + err.code))
    setIsLoading(false)
  }, [])


  return (
    <Container className="grid place-items-center ">
      {isLoading
        ? <Loader />
        : data && (
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 shadow-md shadow-slate-900 bg-zinc-100 relative w-fit place-items-center">

            <div className="absolute top-[-30px] left-0 ">
              <Link to={-1} className="flex items-center bg-yellow-300 rounded-full pe-3 hover:bg-yellow-400">
                <GrFormPrevious className="text-3xl" />önceki sayfa
              </Link>
            </div>

            <div className="col-span-1 flex w-full ">
              <div className="h-[460px] w-[360px] ">
                <img src={data.photos[imageIndex || 0]} alt="image"
                  className="h-full w-full transition object-cover hover:scale-125  bg-zinc-200" />
              </div>
            </div>

            <div className="flex flex-col h-full w-full bg-zinc-100">
              <div className="flex flex-col px-5 pb-3 pt-5 h-full justify-between">
                <div className="grid gap-3 w-full items-center " >
                  <h2 className="font-bold text-2xl capitalize">{data.title}</h2>
                  <p className="capitalize">{data.description}</p>
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
                <div className="flex gap-1 h-max ">
                  {data.tags?.map((item, i) => (
                    <Tag key={i} item={item} className="border-2 border-gray-600 bg-yellow-300" />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 bg-zinc-300 py-3 justify-center">
                {data.photos.map((item, i) =>
                  <img key={i} src={item} alt="product-image"
                    className="w-20 h-20 object-center rounded-full border-4 border-zinc-100"
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
