import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Heart, Users, Activity, Shield, Clock, CheckCircle } from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      icon: <Stethoscope className="h-12 w-12" />,
      title: 'Orthopedic Surgery',
      description: 'Advanced surgical procedures for bone and joint conditions including fractures, arthritis, and deformities.',
      features: [
        'Joint Replacement Surgery',
        'Fracture Repair & Fixation',
        'Arthroscopic Surgery',
        'Spinal Surgery',
        'Hand & Upper Extremity Surgery'
      ]
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: 'Trauma Care',
      description: 'Emergency and critical care for traumatic injuries with rapid response and specialized treatment protocols.',
      features: [
        'Emergency Fracture Treatment',
        'Critical Trauma Surgery',
        'Multi-System Injury Care',
        'Emergency Room Services',
        'Intensive Care Management'
      ]
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: 'Pediatric Orthopedics',
      description: 'Specialized care for children with orthopedic conditions, growth disorders, and congenital deformities.',
      features: [
        'Congenital Deformities',
        'Growth Plate Injuries',
        'Developmental Disorders',
        'Pediatric Fractures',
        'Clubfoot Treatment'
      ]
    },
    {
      icon: <Activity className="h-12 w-12" />,
      title: 'Rehabilitation & Physiotherapy',
      description: 'Comprehensive rehabilitation programs to restore function and mobility after injury or surgery.',
      features: [
        'Post-Surgical Rehabilitation',
        'Physical Therapy',
        'Occupational Therapy',
        'Pain Management',
        'Mobility Training'
      ]
    }
  ];

  const additionalServices = [
    {
      title: 'Sports & Occupational Injury Care',
      description: 'Specialized treatment for sports-related injuries and workplace accidents.',
      icon: <Activity className="h-8 w-8" />
    },
    {
      title: 'Bone & Joint Reconstruction',
      description: 'Complex reconstructive procedures for severe bone and joint damage.',
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: 'Emergency & Critical Care',
      description: '24/7 emergency orthopedic services for urgent trauma cases.',
      icon: <Clock className="h-8 w-8" />
    },
    {
      title: 'Preventive Care & Consultations',
      description: 'Regular check-ups and preventive care for orthopedic health.',
      icon: <CheckCircle className="h-8 w-8" />
    }
  ];

  const whyChooseUs = [
    {
      title: 'Experienced Team',
      description: 'Led by Dr. Habtamu with over 15 years of orthopedic expertise'
    },
    {
      title: 'Modern Equipment',
      description: 'State-of-the-art surgical and diagnostic equipment'
    },
    {
      title: 'Personalized Care',
      description: 'Individualized treatment plans tailored to each patient'
    },
    {
      title: 'Comprehensive Follow-up',
      description: 'Complete post-operative care and rehabilitation support'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive orthopedic and trauma care services designed to restore your mobility and improve your quality of life
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our primary areas of expertise in orthopedic and trauma care
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-start space-x-6">
                  <div className="text-blue-600 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized services to meet all your orthopedic and trauma care needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-blue-600 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-700">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Dr. Habtamu Medium Clinic?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What sets us apart in providing exceptional orthopedic and trauma care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Treatment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to ensure the best possible outcomes for our patients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Initial Consultation</h3>
              <p className="text-gray-700">
                Comprehensive evaluation and diagnosis of your condition
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Treatment Planning</h3>
              <p className="text-gray-700">
                Customized treatment plan tailored to your specific needs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Treatment Delivery</h3>
              <p className="text-gray-700">
                Expert surgical or non-surgical treatment with modern techniques
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Follow-up Care</h3>
              <p className="text-gray-700">
                Comprehensive rehabilitation and ongoing monitoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Emergency Orthopedic Care</h2>
            <p className="text-xl mb-6 text-red-100">
              For urgent orthopedic injuries and trauma, we provide immediate emergency care services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold">
                Emergency Hotline: +251 912 243 888
              </div>
              <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold">
                Available 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Restore Your Mobility?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Contact us today to schedule a consultation and learn more about how we can help you regain your quality of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Book Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Emergency Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
