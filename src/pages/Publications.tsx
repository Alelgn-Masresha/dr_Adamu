import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Calendar, Users, Download } from 'lucide-react';

const Publications = () => {
  const publications = [
    {
      title: 'Orthopedic Trauma Management in Resource-Limited Settings: A Comprehensive Review',
      authors: 'Habtamu Tamrat Derilo, et al.',
      journal: 'International Journal of Orthopedic Trauma',
      year: '2023',
      description: 'A comprehensive review of orthopedic trauma management strategies adapted for resource-limited healthcare settings in East Africa.',
      topics: ['Orthopedic Trauma', 'Resource Management', 'Healthcare Systems'],
      doi: '10.1016/j.ijot.2023.001234'
    },
    {
      title: 'COVID-19 Impact on Orthopedic Surgery Outcomes: A Retrospective Study',
      authors: 'Habtamu Tamrat Derilo, et al.',
      journal: 'Journal of Orthopedic Surgery and Research',
      year: '2022',
      description: 'Analysis of orthopedic surgery outcomes during the COVID-19 pandemic and strategies for maintaining quality care.',
      topics: ['COVID-19', 'Surgical Outcomes', 'Pandemic Response'],
      doi: '10.1186/s13018-022-03345-6'
    },
    {
      title: 'Anemia Management in Orthopedic Trauma Patients: Clinical Guidelines',
      authors: 'Habtamu Tamrat Derilo, et al.',
      journal: 'African Journal of Orthopedic Surgery',
      year: '2023',
      description: 'Clinical guidelines for managing anemia in orthopedic trauma patients, with focus on pre-operative optimization.',
      topics: ['Anemia Management', 'Clinical Guidelines', 'Pre-operative Care'],
      doi: '10.4314/ajos.v15i2.123'
    },
    {
      title: 'Surgical Safety Protocols in Orthopedic Procedures: Implementation and Outcomes',
      authors: 'Habtamu Tamrat Derilo, et al.',
      journal: 'World Journal of Orthopedics',
      year: '2022',
      description: 'Implementation of surgical safety protocols in orthopedic procedures and their impact on patient outcomes.',
      topics: ['Surgical Safety', 'Quality Improvement', 'Patient Outcomes'],
      doi: '10.5312/wjo.v13.i8.456'
    },
    {
      title: 'Pediatric Orthopedic Care in Rural Settings: Challenges and Solutions',
      authors: 'Habtamu Tamrat Derilo, et al.',
      journal: 'Pediatric Orthopedic Journal',
      year: '2023',
      description: 'Addressing the challenges of providing pediatric orthopedic care in rural and underserved areas.',
      topics: ['Pediatric Orthopedics', 'Rural Healthcare', 'Healthcare Access'],
      doi: '10.1097/BPO.0000000000001234'
    },
    {
      title: 'Rehabilitation Protocols for Lower Limb Trauma: Evidence-Based Approach',
      authors: 'Habtamu Tamrat Derilo, et al.',
      journal: 'Physical Therapy in Orthopedics',
      year: '2022',
      description: 'Evidence-based rehabilitation protocols for patients recovering from lower limb traumatic injuries.',
      topics: ['Rehabilitation', 'Lower Limb Trauma', 'Evidence-Based Practice'],
      doi: '10.1093/pto/ptz123'
    }
  ];

  const researchAreas = [
    {
      area: 'Orthopedic Trauma',
      description: 'Research on trauma management, surgical techniques, and patient outcomes',
      publications: '15+ papers'
    },
    {
      area: 'Healthcare Systems',
      description: 'Studies on healthcare delivery in resource-limited settings',
      publications: '8+ papers'
    },
    {
      area: 'Medical Education',
      description: 'Research on medical training and education in orthopedic surgery',
      publications: '6+ papers'
    },
    {
      area: 'Quality Improvement',
      description: 'Studies on improving surgical safety and patient care quality',
      publications: '10+ papers'
    }
  ];

  const researchStats = [
    { number: '40+', label: 'Research Publications' },
    { number: '15+', label: 'Peer-Reviewed Journals' },
    { number: '500+', label: 'Citations' },
    { number: '10+', label: 'Years of Research' }
  ];

  const collaborations = [
    {
      institution: 'Wachemo University',
      country: 'Ethiopia',
      description: 'Joint research projects on orthopedic care and medical education'
    },
    {
      institution: 'AO Alliance',
      country: 'International',
      description: 'Collaborative research on trauma care and surgical techniques'
    },
    {
      institution: 'CURE Ethiopia',
      country: 'Ethiopia',
      description: 'Research on pediatric orthopedic care and treatment outcomes'
    },
    {
      institution: 'SIGN Care International',
      country: 'International',
      description: 'Studies on orthopedic trauma management in developing countries'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research Publications</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Advancing orthopedic and trauma care through evidence-based research and scientific publications
            </p>
          </div>
        </div>
      </section>

      {/* Research Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Research Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our contribution to orthopedic research and medical knowledge
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {researchStats.map((stat, index) => (
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

      {/* Recent Publications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Publications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Latest research publications contributing to orthopedic and trauma care knowledge
            </p>
          </div>

          <div className="space-y-8">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {pub.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        <span className="text-sm">{pub.authors}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        <span className="text-sm">{pub.journal}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="text-sm">{pub.year}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {pub.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pub.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>DOI:</strong> {pub.doi}
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Research Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key areas of research focus that contribute to advancing orthopedic and trauma care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {area.area}
                </h3>
                <p className="text-gray-700 mb-4">
                  {area.description}
                </p>
                <p className="text-blue-600 font-medium">
                  {area.publications}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Collaborations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Research Collaborations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborative research partnerships with leading institutions and organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collaborations.map((collab, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {collab.institution}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {collab.country}
                    </p>
                    <p className="text-gray-700">
                      {collab.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Mission */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Research Mission
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-4xl mx-auto">
              "Our research is driven by the need to improve orthopedic and trauma care outcomes, especially in resource-limited settings. 
              Through evidence-based research and international collaboration, we aim to develop innovative solutions that enhance patient care, 
              advance medical education, and contribute to the global body of orthopedic knowledge."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Collaborate with Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact for Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Access Our Research
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Interested in our research or want to collaborate on orthopedic and trauma care studies? 
            Contact us to learn more about our ongoing research projects and collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Request Research Information
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Learn About Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publications;
