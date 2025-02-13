import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import ListUsers from './pages/ListUsers'
import Login from './pages/Login'

function App() {
  //const [count, setCount] = useState(0)

  return (
    < >


      <BrowserRouter>
      <NavBar/>
      <div className='container mx-auto mt-20'>
        <Routes>
          <Route path='#' element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path="/listUsers" element={<ListUsers/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          


        </Routes>
        </div>
      </BrowserRouter>
      
    </>
  )
}

export default App
