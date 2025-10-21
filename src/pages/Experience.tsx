import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ExperienceItem {
  id: string;
  institution: string;
  role: string;
  period: string;
  metrics: {
    successfulSurgeries: string;
    years: string;
    patients: string;
    successRate: string;
  };
  sort_order: number;
  created_at: string;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/experiences`);
        if (response.ok) {
          const data = await response.json();
          // Sort by sort_order
          const sortedExperiences = data.sort((a: ExperienceItem, b: ExperienceItem) => a.sort_order - b.sort_order);
          setExperiences(sortedExperiences);
          setError(null);
        } else {
          console.error('Failed to fetch experiences');
          setError('Failed to load experience data');
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setError('Failed to load experience data');
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Institutions */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Loading experience data...</div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600">{error}</div>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-600">No experience data available at the moment.</div>
            </div>
          ) : (
            experiences.map((experience) => (
              <div key={experience.id} className="rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{experience.institution}</h2>
                    <div className="text-gray-600 text-sm sm:text-base">{experience.role} • {experience.period}</div>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="bg-blue-900 text-white">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-6 sm:px-8 py-8">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-200 mb-1">{experience.metrics.successfulSurgeries}</div>
                      <div className="text-sm sm:text-base text-blue-100">Successful Surgeries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-200 mb-1">{experience.metrics.years}</div>
                      <div className="text-sm sm:text-base text-blue-100">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-200 mb-1">{experience.metrics.patients}</div>
                      <div className="text-sm sm:text-base text-blue-100">Patients Treated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-200 mb-1">{experience.metrics.successRate}</div>
                      <div className="text-sm sm:text-base text-blue-100">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Experience;


