import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Heart, Stethoscope, Clock, CheckCircle } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: 'Orthopedic Surgery',
      description: 'Advanced surgical procedures for bone and joint conditions'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Trauma Care',
      description: 'Emergency and critical care for traumatic injuries'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Pediatric Orthopedics',
      description: 'Specialized care for children with orthopedic conditions'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Rehabilitation',
      description: 'Comprehensive physiotherapy and recovery programs'
    }
  ];

  const stats = [
    { number: '500+', label: 'Successful Surgeries' },
    { number: '15+', label: 'Years Experience' },
    { number: '1000+', label: 'Patients Treated' },
    { number: '98%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      name: 'Alemayehu T.',
      location: 'Hossana',
      text: 'After surgery at DAMC, I could walk again pain-free. Dr. Habtamu and his team treated me like family — their care was life-changing.'
    },
    {
      name: 'Meseret K.',
      location: 'Wolaita',
      text: 'The rehabilitation program at DAMC helped me recover completely from my sports injury. I\'m back to playing football!'
    },
    {
      name: 'Tigist M.',
      location: 'Hawassa',
      text: 'Professional, compassionate care. My child\'s orthopedic condition was treated with such expertise and kindness.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Restoring Movement.<br />
              Renewing Lives.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Dr. Adamu Medium Clinic (DAMC) provides world-class orthopedic and trauma care 
              with compassion, excellence, and innovation in Central Ethiopia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Dr. Habtamu Tamrat Derilo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Orthopedic Surgeon, Assistant Professor, and Former Dean of College of Medicine at Wachemo University
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 mb-6">
                  To deliver world-class orthopedic and trauma care that restores function, 
                  relieves pain, and improves quality of life for our patients.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be a leading orthopedic and trauma care center in Ethiopia and East Africa, 
                  known for excellence in patient care, education, and research.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Compassion</h4>
                  <p className="text-gray-600">Treating every patient with empathy and understanding</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Excellence</h4>
                  <p className="text-gray-600">Maintaining the highest standards of medical care</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Innovation</h4>
                  <p className="text-gray-600">Embracing cutting-edge techniques and technology</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Integrity</h4>
                  <p className="text-gray-600">Maintaining ethical standards in all our practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive orthopedic and trauma care services tailored to meet your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-200 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our patients about their experience at Dr. Adamu Medium Clinic
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Read More Testimonials
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Restore Your Movement?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Contact Dr. Adamu Medium Clinic today to schedule your consultation and take the first step toward better health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Clock className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
