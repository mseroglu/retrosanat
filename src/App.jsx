import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Footer from './components/Footer'
import Detail from './pages/Detail'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Protected from './pages/Protected'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter >
        <div className='flex flex-col min-h-screen '>
          <Navbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/home' element={<MainPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/tag/:tag' element={<Products />} />
            <Route path='/products/category/:category' element={<Products />} />
            <Route path='/products/category/:category/:subCategory' element={<Products />} />
            <Route path='/product/detail/:id' element={<Detail />} />

            {/* Burası protecteda alınacak */}


            {/** Protected - Giriş yapmadan erişilemez alanlar */}
            <Route element={<Protected />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
        <ToastContainer position='bottom-right' theme='colored' />
      </BrowserRouter>
    </>
  )
}

export default App
