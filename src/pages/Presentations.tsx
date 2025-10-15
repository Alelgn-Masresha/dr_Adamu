import { Link } from 'react-router-dom';
import { ArrowRight, Presentation, Calendar, MapPin, Award } from 'lucide-react';

const Presentations = () => {
  const presentations = [
    {
      title: '19th SIGN Conference',
      location: 'United States',
      year: '2023',
      description: 'Presented on innovative orthopedic trauma techniques and their application in resource-limited settings.',
      topics: [
        'Orthopedic trauma management',
        'Resource-limited surgery',
        'International collaboration'
      ]
    },
    {
      title: '20th SIGN Conference',
      location: 'United States',
      year: '2024',
      description: 'Keynote presentation on advancing orthopedic care in East Africa and building sustainable medical education programs.',
      topics: [
        'Medical education in Africa',
        'Sustainable healthcare systems',
        'Orthopedic innovation'
      ]
    },
    {
      title: 'ESOT Scientific Conference',
      location: 'Addis Ababa, Ethiopia',
      year: '2023',
      description: 'Presented research findings on orthopedic trauma outcomes and rehabilitation protocols in Ethiopian healthcare settings.',
      topics: [
        'Clinical outcomes research',
        'Rehabilitation protocols',
        'Healthcare quality improvement'
      ]
    },
    {
      title: 'AO Alliance Regional Meeting',
      location: 'Nairobi, Kenya',
      year: '2023',
      description: 'Facilitated workshop on advanced trauma surgery techniques for East African orthopedic surgeons.',
      topics: [
        'Advanced trauma surgery',
        'Surgical training',
        'Regional collaboration'
      ]
    },
    {
      title: 'CURE Ethiopia Annual Conference',
      location: 'Addis Ababa, Ethiopia',
      year: '2022',
      description: 'Presented on pediatric orthopedic care and the importance of early intervention in congenital conditions.',
      topics: [
        'Pediatric orthopedics',
        'Congenital conditions',
        'Early intervention strategies'
      ]
    },
    {
      title: 'Wachemo University Medical Conference',
      location: 'Hossana, Ethiopia',
      year: '2023',
      description: 'Delivered keynote address on the future of medical education and the role of orthopedic surgery in comprehensive healthcare.',
      topics: [
        'Medical education',
        'Healthcare systems',
        'Academic leadership'
      ]
    }
  ];

  const presentationStats = [
    { number: '15+', label: 'International Presentations' },
    { number: '8', label: 'Countries Visited' },
    { number: '500+', label: 'Healthcare Professionals Reached' },
    { number: '6', label: 'Years of Speaking' }
  ];

  const upcomingEvents = [
    {
      title: '21st SIGN Conference',
      location: 'United States',
      date: '2025',
      description: 'Upcoming presentation on global orthopedic care initiatives'
    },
    {
      title: 'East African Orthopedic Summit',
      location: 'Tanzania',
      date: '2025',
      description: 'Regional conference on advancing orthopedic care in East Africa'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">International Presentations</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Sharing expertise and advancing orthopedic care through international conferences and presentations
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Presentation Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to advancing orthopedic knowledge globally
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {presentationStats.map((stat, index) => (
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

      {/* Major Presentations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Major International Presentations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key presentations that have shaped orthopedic care and medical education
            </p>
          </div>

          <div className="space-y-8">
            {presentations.map((presentation, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Presentation className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {presentation.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{presentation.year}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{presentation.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">
                      {presentation.description}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {presentation.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Presentations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Future engagements and presentations planned for 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-4 mb-3 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact and Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Impact and Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How our presentations have contributed to the global orthopedic community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">International Recognition</h3>
              <p className="text-gray-700">
                Recognized as a leading voice in orthopedic trauma care and medical education in East Africa
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Presentation className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Knowledge Sharing</h3>
              <p className="text-gray-700">
                Sharing best practices and innovative techniques with healthcare professionals worldwide
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Collaboration</h3>
              <p className="text-gray-700">
                Building partnerships and collaborations that advance orthopedic care globally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Invite Dr. Habtamu to Speak
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Interested in having Dr. Habtamu present at your conference or event? Contact us to discuss speaking opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Request Speaker
              <ArrowRight className="ml-2 h-5 w-5" />
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

export default Presentations;
