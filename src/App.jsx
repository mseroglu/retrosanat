import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import Login from './pages/Login'
import Register from './pages/Register'
import SaveProduct from './pages/SaveProduct'
import Products from './pages/Products'
import Footer from './components/Footer'
import Detail from './pages/Detail'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Protected from './pages/Protected'

function App() {

  return (
    <>
      <div className='flex flex-col h-screen '>
        <BrowserRouter >
          <Navbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/home' element={<MainPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/detail/:id' element={<Detail />} />

            {/** Protected - Giriş yapmadan erişilemez alanlar */}
            <Route element={<Protected />}>
              <Route path='/addProduct' element={<SaveProduct />} />

            </Route>
          </Routes>
          <Footer />
          <ToastContainer position='bottom-right' theme='colored'/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
