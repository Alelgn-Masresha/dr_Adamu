import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Trainings from './pages/Trainings';
import Presentations from './pages/Presentations';
import Certificates from './pages/Certificates';
import Contributions from './pages/Contributions';
import Testimonials from './pages/Testimonials';
import Publications from './pages/Publications';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/presentations" element={<Presentations />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;