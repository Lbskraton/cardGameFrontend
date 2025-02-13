import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import NavBar from './components/NavBar'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>


      <BrowserRouter>
      <NavBar/>
      <div className='container mx-auto mt-20'>
        <Routes>
          <Route path='#' element={<Home/>}/>
          <Route path='Register' element={<Register/>}/>
          


        </Routes>
        </div>
      </BrowserRouter>
      
    </>
  )
}

export default App
