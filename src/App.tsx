import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Presentations from './pages/Presentations';
import Certificates from './pages/Certificates';
import Contributions from './pages/Contributions';
import Testimonials from './pages/Testimonials';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import PhysicianDetail from './pages/PhysicianDetail';
import NewsDetail from './pages/NewsDetail';

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
            <Route path="/presentations" element={<Presentations />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/physician/:id" element={<PhysicianDetail />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;