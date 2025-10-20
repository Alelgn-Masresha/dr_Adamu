import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

interface Physician {
  id: string;
  full_name: string;
  title?: string;
  bio?: string;
  avatar_file?: string;
  qualifications?: string[];
  affiliations?: string[];
  email?: string;
  phone?: string;
  location?: string;
  is_active: boolean;
  created_at: string;
}

const PhysicianDetail = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [physician, setPhysician] = useState<Physician | null>(null);
  const [otherPhysicians, setOtherPhysicians] = useState<Physician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch physician data from API
  useEffect(() => {
    const fetchPhysicianData = async () => {
      try {
        setLoading(true);
        
        // Fetch specific physician
        if (id) {
          const response = await fetch(`http://localhost:5000/api/physicians/${id}`);
          if (response.ok) {
            const data = await response.json();
            setPhysician(data);
          } else {
            setError('Physician not found');
          }
        }
        
        // Fetch all physicians for "Other Physicians" section
        const allPhysiciansResponse = await fetch('http://localhost:5000/api/physicians');
        if (allPhysiciansResponse.ok) {
          const allPhysicians = await allPhysiciansResponse.json();
          // Filter out current physician and only show active ones
          const filteredPhysicians = allPhysicians.filter((doc: Physician) => 
            doc.id !== id && doc.is_active
          );
          setOtherPhysicians(filteredPhysicians);
        }
        
      } catch (error) {
        console.error('Error fetching physician data:', error);
        setError('Failed to load physician data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhysicianData();
  }, [id]);

  // Removed legacy static schedule section

  // Filter physicians based on search
  const filteredPhysicians = otherPhysicians.filter(doctor =>
    doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.title && doctor.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading physician data...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600">{error}</div>
          </div>
        ) : !physician ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Physician not found.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                  {physician.avatar_file ? (
                    <img
                      src={`http://localhost:5000/uploads/${physician.avatar_file}`}
                      alt={physician.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      No Photo
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{physician.full_name}</h1>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Speciality: </span>
                    <span className="text-gray-600">{physician.title || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Location: </span>
                    <span className="text-gray-600">{physician.location || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Email: </span>
                    <span className="text-gray-600">{physician.email || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Phone: </span>
                    <span className="text-gray-600">{physician.phone || 'Not provided'}</span>
                  </div>
                </div>
                
                {physician.bio && (
                  <div className="mt-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600 text-sm">{physician.bio}</p>
                  </div>
                )}

                {physician.qualifications && physician.qualifications.length > 0 && (
                  <div className="mt-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-2">Qualifications</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {physician.qualifications.map((qual, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {physician.affiliations && physician.affiliations.length > 0 && (
                  <div className="mt-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-2">Affiliations</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {physician.affiliations.map((affiliation, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          {affiliation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          {/* Schedule Card removed */}
        </div>

        )
        }

        {/* Other Physicians Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Other Physicians</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPhysicians.map((doctor) => (
              <Link
                key={doctor.id}
                to={`/physician/${doctor.id}`}
                className="text-center hover:bg-gray-50 rounded-lg p-4 transition-colors"
              >
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden shadow-md">
                  {doctor.avatar_file ? (
                    <img
                      src={`http://localhost:5000/uploads/${doctor.avatar_file}`}
                      alt={doctor.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-xs">
                      No Photo
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{doctor.full_name}</h3>
                <p className="text-xs text-gray-600">{doctor.title || 'Not specified'}</p>
              </Link>
            ))}
          </div>

          {filteredPhysicians.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No physicians found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicianDetail;
