import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, BookOpen, Award, Target } from 'lucide-react';

const Trainings = () => {
  const trainingPrograms = [
    {
      title: 'Medical Student Training',
      description: 'Comprehensive hands-on training for medical students in orthopedic surgery techniques and patient care.',
      duration: '4-8 weeks',
      participants: 'Medical students',
      features: [
        'Clinical rotations in orthopedic surgery',
        'Observing surgical procedures',
        'Patient assessment and diagnosis',
        'Case presentations and discussions'
      ]
    },
    {
      title: 'Resident Mentorship',
      description: 'Advanced training program for orthopedic surgery residents with direct mentorship from Dr. Habtamu.',
      duration: '1-2 years',
      participants: 'Orthopedic residents',
      features: [
        'Supervised surgical procedures',
        'Research project mentorship',
        'Academic presentations',
        'Clinical decision-making training'
      ]
    },
    {
      title: 'Practitioner Workshops',
      description: 'Continuing education workshops for practicing orthopedic surgeons and medical professionals.',
      duration: '1-5 days',
      participants: 'Practicing surgeons',
      features: [
        'Latest surgical techniques',
        'Equipment training',
        'Case study discussions',
        'International best practices'
      ]
    }
  ];

  const collaborations = [
    {
      name: 'Wachemo University',
      description: 'Academic partnership for medical education and research',
      type: 'Academic Institution'
    },
    {
      name: 'AO Alliance',
      description: 'International organization for orthopedic trauma education',
      type: 'International Organization'
    },
    {
      name: 'CURE Ethiopia',
      description: 'Specialized training in pediatric orthopedic care',
      type: 'Medical Charity'
    }
  ];

  const trainingFeatures = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Hands-on Experience',
      description: 'Practical training with real patients and surgical procedures'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Small Group Learning',
      description: 'Personalized attention with small class sizes for optimal learning'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Evidence-Based Curriculum',
      description: 'Training based on latest medical research and international standards'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Certification Programs',
      description: 'Recognized certificates upon completion of training programs'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Medical Training & Education</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Hands-on training and mentorship programs for medical students, residents, and practitioners
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Excellence in Medical Education
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Dr. Habtamu Tamrat Derilo is committed to advancing medical education and training in Ethiopia. 
                As a former Dean of College of Medicine at Wachemo University and current Assistant Professor, 
                he brings extensive academic and clinical experience to medical training.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our training programs combine theoretical knowledge with practical experience, providing 
                participants with the skills and confidence needed to excel in orthopedic and trauma care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  Apply for Training
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Training Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Medical Students Trained</span>
                  <span className="text-2xl font-bold text-blue-600">200+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Residents Mentored</span>
                  <span className="text-2xl font-bold text-blue-600">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Workshops Conducted</span>
                  <span className="text-2xl font-bold text-blue-600">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Years of Teaching</span>
                  <span className="text-2xl font-bold text-blue-600">15+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training programs designed for different levels of medical professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {program.description}
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {program.duration}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                      {program.participants}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Program Features:</h4>
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Training?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The advantages of training with Dr. Habtamu and his experienced team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Training Collaborations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partnerships with leading institutions and organizations for enhanced training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborations.map((collaboration, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {collaboration.name}
                </h3>
                <p className="text-gray-700 mb-3">
                  {collaboration.description}
                </p>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {collaboration.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Apply
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start your training journey with Dr. Adamu Medium Clinic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Submit Application</h3>
              <p className="text-gray-700">
                Complete the application form with your credentials and training preferences
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Process</h3>
              <p className="text-gray-700">
                Our team reviews your application and determines the best training program
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Program Assignment</h3>
              <p className="text-gray-700">
                You'll be assigned to an appropriate training program with clear objectives
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Begin Training</h3>
              <p className="text-gray-700">
                Start your hands-on training with experienced mentors and modern facilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Medical Training Journey
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join our training programs and advance your skills in orthopedic and trauma care under expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact for Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trainings;
