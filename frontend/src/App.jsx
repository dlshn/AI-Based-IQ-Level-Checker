import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AboutUs from './pages/About'
import Service from './pages/Service'
import Signup from './pages/SignUp'
import Signin from './pages/SignIn'
import Quiz from './pages/Quiz'
import Final from './pages/Final'
import Contact from './pages/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/service" element={<Service />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/quiz/:age" element={<Quiz />} />
        <Route path="/result" element={<Final />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
