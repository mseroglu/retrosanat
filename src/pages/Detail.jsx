import Container from "../components/Container"


const Detail = () => {

  return (
    <Container stil="flex-grow mt-10 py-20 grid place-items-center">
      <div className="flex gap-4 border-2 rounded-xl w-2/3 p-5 shadow-lg bg-zinc-100">

        <img src="" alt="image" 
        className="h-[300px] w-[300px] border rounded-lg bg-red-400" />
        
        <div className="grid gap-3">
          <h2 className="font-bold">Başlık</h2>
          <p>Açıklama</p>
          <table >
            <tr>
              <td>Stok </td>
              <td className="w-4  text-center"> : </td>
              <td> 25 Adet</td>
            </tr>
            <tr>
              <td> Fiyat </td>
              <td className="w-4 text-center"> : </td>
              <td> 235 ₺</td>
            </tr>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default Detail
