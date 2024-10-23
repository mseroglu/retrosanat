import Carosel from "../components/Carosel"
import Container from "../components/Container"
import Loader from "../components/Loader"

const MainPage = () => {

  return (
    <Container stil="flex-grow ">
      <div className="h-max"> Anasayfa </div>
      
      <Carosel />

    </Container>

  )
}

export default MainPage
