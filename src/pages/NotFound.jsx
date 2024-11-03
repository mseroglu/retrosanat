import Container from "../components/Container"

const NotFound = () => {
   return (
      <Container stil="grid place-items-center ">
         <div className="h-60 md:h-96 grid place-items-center text-center">
            <h2 className="font-bold">Aradığınız sayfa bulunamadı</h2>
         </div>
      </Container>
   )
}

export default NotFound
