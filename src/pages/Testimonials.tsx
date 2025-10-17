import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alemayehu T.',
      location: 'Hossana',
      condition: 'Hip Replacement Surgery',
      rating: 5,
      text: 'After surgery at DAMC, I could walk again pain-free. Dr. Habtamu and his team treated me like family — their care was life-changing. The rehabilitation program was excellent and I\'m back to my normal activities.',
      date: '2024'
    },
    {
      name: 'Meseret K.',
      location: 'Wolaita',
      condition: 'Sports Injury Recovery',
      rating: 5,
      text: 'The rehabilitation program at DAMC helped me recover completely from my sports injury. I\'m back to playing football! The physiotherapy team was amazing and Dr. Habtamu\'s expertise made all the difference.',
      date: '2024'
    },
    {
      name: 'Tigist M.',
      location: 'Hawassa',
      condition: 'Pediatric Orthopedic Care',
      rating: 5,
      text: 'Professional, compassionate care. My child\'s orthopedic condition was treated with such expertise and kindness. Dr. Habtamu took the time to explain everything and made us feel comfortable throughout the process.',
      date: '2024'
    },
    {
      name: 'Getachew A.',
      location: 'Sodo',
      condition: 'Trauma Surgery',
      rating: 5,
      text: 'When I had a serious accident, Dr. Habtamu\'s emergency care saved my leg. The trauma surgery was successful and the follow-up care was exceptional. I\'m forever grateful for the expertise at DAMC.',
      date: '2023'
    },
    {
      name: 'Fikirte B.',
      location: 'Arba Minch',
      condition: 'Knee Arthroscopy',
      rating: 5,
      text: 'The knee arthroscopy procedure was minimally invasive and recovery was much faster than I expected. Dr. Habtamu\'s skill and the modern equipment at the clinic made all the difference in my treatment.',
      date: '2023'
    },
    {
      name: 'Yonas D.',
      location: 'Jimma',
      condition: 'Spinal Surgery',
      rating: 5,
      text: 'After years of back pain, Dr. Habtamu\'s spinal surgery gave me my life back. The procedure was successful and the post-operative care was thorough. I can now work and play with my children without pain.',
      date: '2023'
    }
  ];

  const stats = [
    { number: '98%', label: 'Patient Satisfaction Rate' },
    { number: '500+', label: 'Successful Surgeries' },
    { number: '1000+', label: 'Patients Treated' },
    { number: '15+', label: 'Years of Experience' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Patient Testimonials</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Hear from our patients about their experience at Dr. Habtamu Medium Clinic
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence in orthopedic and trauma care
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real patients who have experienced our care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-600 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                      <div className="text-sm text-blue-600 font-medium">{testimonial.condition}</div>
                      <div className="text-xs text-gray-500">{testimonial.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Patients Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Patients Choose DAMC
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The qualities that make our patients recommend us to their family and friends
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Care</h3>
              <p className="text-gray-700">
                Board-certified orthopedic surgeon with 15+ years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compassionate Treatment</h3>
              <p className="text-gray-700">
                Personalized care that treats each patient with dignity and respect
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Modern Facilities</h3>
              <p className="text-gray-700">
                State-of-the-art equipment and modern surgical techniques
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Follow-up</h3>
              <p className="text-gray-700">
                Complete rehabilitation and ongoing support throughout recovery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Our Care?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join the hundreds of patients who have trusted Dr. Habtamu Medium Clinic with their orthopedic care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Book Your Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn About Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
