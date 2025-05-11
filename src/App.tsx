
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/home"
import { FlightResults } from "./pages/FlightResult"
import Navbar from "./components/Navbar"




function App() {
  return (
    <div className="w-full h-full overflow-x-hidden dark:bg-[#202124]">
      <Navbar />
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<FlightResults />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App
