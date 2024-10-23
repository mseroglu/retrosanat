import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import Login from './pages/Login'
import Register from './pages/Register'
import SaveProduct from './pages/SaveProduct'
import Products from './pages/Products'
import Footer from './components/Footer'
import Detail from './pages/Detail'

function App() {

  return (
    <>
      <BrowserRouter >
        <div className='flex flex-col h-screen '>
        <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/product/detail/:id' element={<Detail />} />
          <Route path='/products' element={<Products />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addProduct' element={<SaveProduct />} />
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
