import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import Navbar from './components/Navbar'
import ColorManager from './components/ColorManager'

const App = () => {
  return (
    // react segement
    <>
      <BrowserRouter>
        <Navbar />
        <ColorManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
