import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSettings from './pages/admin/AdminSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPublications from './pages/admin/AdminPublications';
import AdminExperiences from './pages/admin/AdminExperiences';
import AdminPhysicians from './pages/admin/AdminPhysicians';
import AdminNews from './pages/admin/AdminNews';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
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
      <Routes>
        {/* Public routes use PublicLayout to include Header/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contributions" element={<Contributions />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/physician/:id" element={<PhysicianDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Route>

        {/* Admin login route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="publications" element={<AdminPublications />} />
          <Route path="experiences" element={<AdminExperiences />} />
          <Route path="physicians" element={<AdminPhysicians />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;