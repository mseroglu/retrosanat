import { Link, useParams } from "react-router-dom"
import Container from "../components/Container"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../db-operations/config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { GrFormPrevious } from "react-icons/gr";
import { useSelector } from "react-redux"


const Detail = () => {
  const params = useParams()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const docRef = doc(db, "products", params.id)

  useEffect(() => {
    setIsLoading(true)
    getDoc(docRef)
      .then((res) => setData(res.data()))
      .catch(err => toast.error("Veri alınamadı! HATA: " + err.code))
    setIsLoading(false)
  }, [])


  return (
    <Container stil="flex-grow grid place-items-center ">
      {isLoading
        ? <Loader />
        : data && (<div className="flex gap-4 max-md:flex-col border-2 rounded-xl max-md:w-fit max-lg:w-full lg:w-2/3 p-2 mt-[60px] shadow-lg bg-zinc-100 max-w-[700px] relative">

          <Link to={-1} className="flex items-center absolute top-[-30px] left-0 ">
            <GrFormPrevious className="text-3xl" />önceki sayfa
          </Link>

          {/* Burası düzeltilecek */}
         
            <img src={data.photos ? data.photos[0] : data.foto} alt="image"
              className="h-[400px] w-[300px] border rounded-lg object-cover" />

            <div className="grid gap-3 w-full items-center">
              <h2 className="font-bold text-2xl capitalize">{data.title}</h2>
              <p className="capitalize">{data.description}</p>
              <table>
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
