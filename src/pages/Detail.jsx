import { Link, useParams } from "react-router-dom"
import Container from "../components/Container"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../db-operations/config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { GrFormPrevious } from "react-icons/gr";


const Detail = () => {
  const [data, setData] = useState(null)
  const [imageIndex, setImageIndex] = useState()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)

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
    <Container stil="grid place-items-center ">
      {isLoading
        ? <Loader />
        : data && (
          <div className="flex gap-4 max-md:flex-col border-2 rounded-xl max-md:w-fit max-lg:w-full lg:w-2/3 p-2 mt-2 shadow-lg bg-zinc-100 max-w-[700px] relative">

            <Link to={-1} className="flex items-center absolute top-[-30px] left-0 ">
              <GrFormPrevious className="text-3xl" />önceki sayfa
            </Link>

            <div className="flex flex-col gap-3">
              <img src={data.photos[imageIndex]} alt="image"
                className="h-[400px] w-[300px] border rounded-lg object-cover" />

              <div className="flex justify-around gap-1">
                {data.photos.map((item, i) =>
                  <img src={item} alt="product-image" className="h-[60px]" onMouseEnter={() => setImageIndex(i)} />
                )}
              </div>
            </div>

            <div className="grid gap-3 w-full items-center">
              <h2 className="font-bold text-2xl capitalize">{data.title}</h2>
              <p className="capitalize">{data.description}</p>
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
              <div className="flex gap-1 h-max">
                {data.categories?.map((item, i) => (
                  <span key={i} className="border-2 text-sm border-gray-600 rounded-full px-2 bg-yellow-300 cursor-pointer">{item}</span>
                ))}
              </div>
            </div>

          </div>
        )}
    </Container>
  )
}

export default Detail
