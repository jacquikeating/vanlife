import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans" 
import VanDetail from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import "./server"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/host" element={<Dashboard />} />
        <Route path="/host/income" element={<Income />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
