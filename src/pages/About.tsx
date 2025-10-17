import { Link } from 'react-router-dom';
import { ArrowRight, Award, GraduationCap, Users, Heart, Target, Eye, Shield, Lightbulb } from 'lucide-react';

const About = () => {
  const qualifications = [
    'MD - Doctor of Medicine',
    'FCS-ECSA - Fellow of the College of Surgeons of East, Central, and Southern Africa',
    'Orthopedic Surgeon',
    'Assistant Professor',
    'Former Dean of College of Medicine at Wachemo University'
  ];

  const affiliations = [
    'Ethiopian Society of Orthopedic Surgery',
    'AO Alliance Faculty',
    'COSECSA Certified',
    'SIGN Care International',
    'CURE Ethiopia',
    'Wachemo University'
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Compassion',
      description: 'We treat every patient with empathy, understanding, and genuine care, recognizing that healing involves both physical and emotional support.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards of medical care, continuously improving our skills and staying updated with the latest medical advances.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation',
      description: 'We embrace cutting-edge surgical techniques, advanced technology, and evidence-based practices to provide the best possible outcomes.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our practices, ensuring transparency, honesty, and accountability in patient care.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">About Dr. Habtamu Medium Clinic</h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto px-4">
              A leading orthopedic and trauma care center dedicated to restoring movement and renewing lives
            </p>
          </div>
        </div>
      </section>

      {/* Dr. Habtamu Biography */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                Dr. Habtamu Tamrat Derilo, MD, FCS-ECSA
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                <p>
                  Dr. Habtamu Tamrat Derilo is a distinguished orthopedic surgeon with over 15 years of experience 
                  in providing exceptional orthopedic and trauma care. As the founder and lead surgeon of Dr. Habtamu 
                  Medium Clinic, he has dedicated his career to advancing orthopedic surgery in Ethiopia and East Africa.
                </p>
                <p>
                  Dr. Habtamu serves as an Assistant Professor and was the Former Dean of College of Medicine at 
                  Wachemo University, where he has played a pivotal role in medical education and training. His 
                  leadership has shaped the next generation of medical professionals in Ethiopia.
                </p>
                <p>
                  With his extensive qualifications and international training, Dr. Habtamu brings world-class 
                  expertise to Central Ethiopia, ensuring that patients receive the highest standard of orthopedic 
                  and trauma care without having to travel abroad.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-lg order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Professional Qualifications</h3>
              <div className="space-y-2 sm:space-y-3">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base">{qual}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Our Mission, Vision & Values
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              The guiding principles that drive our commitment to exceptional patient care
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {/* Mission */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
              <div className="text-center mb-4 sm:mb-6">
                <Target className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 text-center">
                To deliver world-class orthopedic and trauma care that restores function, relieves pain, 
                and improves quality of life for our patients, while advancing medical education and 
                research in Ethiopia.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
              <div className="text-center mb-4 sm:mb-6">
                <Eye className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 text-center">
                To be a leading orthopedic and trauma care center in Ethiopia and East Africa, 
                recognized for excellence in patient care, medical education, and research innovation.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
              <div className="text-center mb-4 sm:mb-6">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">Our Values</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 text-center">
                Compassion, Excellence, Innovation, and Integrity guide every aspect of our patient care 
                and medical practice, ensuring the highest standards of treatment and service.
              </p>
            </div>
          </div>

          {/* Detailed Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="text-blue-600 flex-shrink-0">
                    <div className="h-6 w-6 sm:h-8 sm:w-8">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      {value.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Affiliations */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Professional Affiliations & Certifications
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Dr. Habtamu's commitment to excellence is reflected in his professional memberships and certifications
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {affiliations.map((affiliation, index) => (
              <div key={index} className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{affiliation}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Training */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Education & Training
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive medical education and specialized training in orthopedic surgery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Academic Background</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 sm:pl-6">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Medical Degree</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Doctor of Medicine (MD)</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 sm:pl-6">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Surgical Fellowship</h4>
                  <p className="text-gray-600 text-sm sm:text-base">FCS-ECSA - Fellow of the College of Surgeons of East, Central, and Southern Africa</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 sm:pl-6">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Specialization</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Orthopedic Surgery</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Leadership Roles</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 sm:pl-6">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Assistant Professor</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Wachemo University College of Medicine</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 sm:pl-6">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Former Dean</h4>
                  <p className="text-gray-600 text-sm sm:text-base">College of Medicine, Wachemo University</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 sm:pl-6">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Founder & Lead Surgeon</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Dr. Habtamu Medium Clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Experience World-Class Orthopedic Care
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto px-4">
            Schedule a consultation with Dr. Habtamu and his experienced team to discuss your orthopedic needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-sm sm:text-base"
            >
              Book Consultation
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
