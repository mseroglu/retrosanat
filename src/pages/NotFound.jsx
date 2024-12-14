import Container from "../components/Container"

const NotFound = () => {
   return (
      <Container className="grid place-items-center bg-black h-full ">
         <div className="h-full grid place-items-center text-center text-yellow-400">
            <h2 className="font-bold text-3xl">Aradığınız sayfa bulunamadı</h2>
         </div>
      </Container>
   )
}

export default NotFound
