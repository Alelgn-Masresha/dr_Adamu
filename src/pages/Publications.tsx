import { BookOpen, FileText, Calendar, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { publicationsAPI } from '../services/api';

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  url: string;
  abstract: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch publications from API
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const data = await publicationsAPI.getAll();
        setPublications(data);
      } catch (error) {
        console.error('Error fetching publications:', error);
        setError('Failed to load publications');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

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
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Loading publications...</div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500">{error}</div>
              </div>
            ) : publications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">No publications available at the moment.</div>
              </div>
            ) : (
              publications.map((pub) => (
                <div key={pub.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
                        {pub.abstract}
                      </p>
                      {pub.topics && pub.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pub.topics.map((topic, topicIndex) => (
                            <span key={topicIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                      {pub.doi && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>DOI:</strong> {pub.doi}
                        </p>
                      )}
                      
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      {pub.url ? (
                        <a 
                          href={pub.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          View Publication
                        </a>
                      ) : (
                        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center">
                          View Publication
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
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

      

      
    </div>
  );
};

export default Publications;
