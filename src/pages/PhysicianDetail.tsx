import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

const PhysicianDetail = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock physician data - in real app, this would come from API
  const physician = {
    id: 1,
    name: 'Dr. Selam Habtu',
    specialty: 'Emergency Medicine (Specialist)',
    department: 'Emergency medicine',
    avatar: '/src/img/doctor/dr_best.jpg',
    bio: 'Dr. Selam Habtu is a highly experienced emergency medicine specialist with over 10 years of practice in emergency care. She specializes in trauma management and critical care.',
    education: 'MD in Emergency Medicine, PhD in Critical Care',
    experience: '10+ years',
    languages: ['English', 'Amharic', 'Oromo'],
    certifications: ['Board Certified Emergency Medicine', 'Advanced Cardiac Life Support', 'Pediatric Advanced Life Support']
  };

  // Schedule data
  const schedule = [
    { day: 'Sunday', time: '----------', action: 'Schedule' },
    { day: 'Monday', time: '----------', action: 'Schedule' },
    { day: 'Tuesday', time: '----------', action: 'Schedule' },
    { day: 'Wednesday', time: '----------', action: 'Schedule' },
    { day: 'Thursday', time: '----------', action: 'Schedule' },
    { day: 'Friday', time: '----------', action: 'Schedule' },
    { day: 'Saturday', time: '----------', action: 'Schedule' }
  ];

  // Other physicians data
  const otherPhysicians = [
    { id: 1, name: 'Dr. Meron Tadesse', specialty: 'Psychiatry', avatar: '/src/img/doctor/dr_best.jpg' },
    { id: 2, name: 'Dr. Yohannes Adugna', specialty: 'Dentistry', avatar: '/src/img/doctor/5929338507342494306.jpg' },
    { id: 3, name: 'Dr. Mihret Dagne', specialty: 'Anesthesiology', avatar: '/src/img/doctor/5929338507342494312.jpg' },
    { id: 4, name: 'Dr. Demeke Kebede', specialty: 'Anesthesiology', avatar: '/src/img/doctor/6015007097554586213.jpg' },
    { id: 5, name: 'Dr. Almaz Bekele', specialty: 'Orthopedics', avatar: '/src/img/doctor/6015007097554586214.jpg' },
    { id: 6, name: 'Dr. Habtamu Tamrat', specialty: 'Orthopedics', avatar: '/src/img/doctor/dr_best.jpg' }
  ];

  // Filter physicians based on search
  const filteredPhysicians = otherPhysicians.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Doctor Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={physician.avatar}
                  alt={physician.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{physician.name}</h1>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Speciality: </span>
                  <span className="text-gray-600">{physician.specialty}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Department: </span>
                  <span className="text-gray-600">{physician.department}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Experience: </span>
                  <span className="text-gray-600">{physician.experience}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Education: </span>
                  <span className="text-gray-600">{physician.education}</span>
                </div>
              </div>
              
              <div className="mt-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600 text-sm">{physician.bio}</p>
              </div>

              <div className="mt-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {physician.languages.map((language, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {physician.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{physician.name}'s Schedules</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Days</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Schedule</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((day, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-2 text-gray-900">{day.day}</td>
                      <td className="py-3 px-2 text-gray-600">{day.time}</td>
                      <td className="py-3 px-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          {day.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Other Physicians Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Other Physicians</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search name or department"
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
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-xs text-gray-600">{doctor.specialty}</p>
              </Link>
            ))}
          </div>

          {filteredPhysicians.length === 0 && (
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
