import { Link } from 'react-router-dom';
import { ArrowRight, Award, Trophy, Star, Shield, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const Certificates = () => {
  const awards = [
    {
      title: 'Best Performing Director of the Year',
      organization: 'Wachemo University',
      year: '2021',
      description: 'Recognized for exceptional leadership and outstanding performance as Director of College of Medicine.',
      category: 'Leadership Excellence'
    },
    {
      title: 'Compassionate and Caring Senior',
      organization: 'NEMMCS Hospital',
      year: '2021',
      description: 'Awarded for demonstrating exceptional compassion and care in patient treatment and medical practice.',
      category: 'Patient Care Excellence'
    },
    {
      title: 'Presenter Award',
      organization: 'ESOT Conference',
      year: '2018',
      description: 'Recognized for outstanding presentation and contribution to the Ethiopian Society of Orthopedic Surgery.',
      category: 'Academic Excellence'
    }
  ];

  const certifications = [
    {
      title: 'COSECSA Certification',
      organization: 'College of Surgeons of East, Central, and Southern Africa',
      description: 'Fellow of the College of Surgeons (FCS-ECSA) - Orthopedic Surgery',
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: 'SIGN Care International',
      organization: 'Surgical Implant Generation Network',
      description: 'Certified in orthopedic trauma care and surgical implant techniques',
      icon: <Award className="h-8 w-8" />
    },
    {
      title: 'CURE Ethiopia Certification',
      organization: 'CURE International',
      description: 'Specialized training and certification in pediatric orthopedic care',
      icon: <Star className="h-8 w-8" />
    },
    {
      title: 'AO Alliance Faculty',
      organization: 'AO Foundation',
      description: 'Faculty member for trauma and orthopedic surgery education programs',
      icon: <GraduationCap className="h-8 w-8" />
    }
  ];

  const professionalMemberships = [
    {
      name: 'Ethiopian Society of Orthopedic Surgery',
      role: 'Active Member',
      description: 'Professional society for orthopedic surgeons in Ethiopia'
    },
    {
      name: 'AO Alliance',
      role: 'Faculty Member',
      description: 'International organization for trauma and orthopedic education'
    },
    {
      name: 'College of Surgeons of East, Central, and Southern Africa',
      role: 'Fellow',
      description: 'Regional college for surgical education and certification'
    },
    {
      name: 'Wachemo University',
      role: 'Assistant Professor',
      description: 'Academic position in medical education and research'
    }
  ];

  const recognitionStats = [
    { number: '15+', label: 'Years of Excellence' },
    { number: '3', label: 'Major Awards' },
    { number: '4', label: 'Professional Certifications' },
    { number: '30000+', label: 'Patients Treated' }
  ];

  // Certificates image slider
  const certificateImages = [
    '/src/img/certificates/6012332002944077734.jpg',
    '/src/img/certificates/6012332002944077735.jpg',
    '/src/img/certificates/6012332002944077736.jpg',
    '/src/img/certificates/6012332002944077737.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [certificateImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % certificateImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + certificateImages.length) % certificateImages.length);

  return (
    <div className="min-h-screen">

      {/* Recognition Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recognition Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our dedication to excellence and continuous improvement
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {recognitionStats.map((stat, index) => (
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

      {/* Awards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Major awards recognizing excellence in medical practice, leadership, and patient care
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {award.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-lg font-medium text-blue-600">
                      {award.organization}
                    </p>
                    <p className="text-gray-600">{award.year}</p>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {award.category}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Certifications - replaced with image slider */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Internationally recognized certifications that validate our expertise and commitment to quality care
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow">
              <div className="relative h-[340px] sm:h-[420px] bg-gray-100">
                {certificateImages.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Certificate ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  />)
                )}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="flex justify-center mt-4 space-x-2">
              {certificateImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full ${idx === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Memberships */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Memberships
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Active participation in professional organizations that advance orthopedic care and medical education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalMemberships.map((membership, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {membership.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {membership.role}
                    </p>
                    <p className="text-gray-700">
                      {membership.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Learning */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commitment to Continuous Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedication to staying at the forefront of orthopedic and trauma care through ongoing education and certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Education</h3>
              <p className="text-gray-700">
                Regular participation in international conferences, workshops, and training programs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Standards</h3>
              <p className="text-gray-700">
                Maintaining the highest standards of care through continuous certification and assessment
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence Recognition</h3>
              <p className="text-gray-700">
                Consistent recognition for excellence in medical practice, leadership, and patient care
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Certificates;
