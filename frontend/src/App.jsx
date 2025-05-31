import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AboutUs from './pages/About'
// import Quiz from './pages/Quiz'
// import Result from './pages/Result'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} /> */}
      </Routes>
    </Router>
  )
}

export default App
