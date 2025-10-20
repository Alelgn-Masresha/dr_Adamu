import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Globe, Award, HandHeart } from 'lucide-react';

const Contributions = () => {
  const volunteerWork = [
    {
      title: 'Jewish Voice Ministries International',
      description: 'Volunteer orthopedic services providing surgical care and medical assistance to underserved communities.',
      duration: '2018 - Present',
      impact: '500+ patients treated',
      icon: <Heart className="h-8 w-8" />
    },
    {
      title: 'Rural Hospital Mentorship',
      description: 'Training and mentoring orthopedic surgeons and medical staff at rural hospitals across Ethiopia.',
      duration: '2015 - Present',
      impact: '20+ hospitals supported',
      icon: <Users className="h-8 w-8" />
    },
    {
      title: 'Medical Student Education',
      description: 'Volunteer teaching and mentorship for medical students and young doctors in orthopedic care.',
      duration: '2010 - Present',
      impact: '300+ students mentored',
      icon: <Award className="h-8 w-8" />
    }
  ];

  const communityInitiatives = [
    {
      title: 'Orthopedic Outreach Program',
      description: 'Monthly outreach programs providing free orthopedic consultations and basic treatment to rural communities.',
      beneficiaries: 'Rural communities in Central Ethiopia',
      frequency: 'Monthly'
    },
    {
      title: 'Medical Equipment Donation',
      description: 'Coordinating donations of medical equipment and supplies to rural hospitals and clinics.',
      beneficiaries: 'Rural hospitals and clinics',
      frequency: 'Ongoing'
    },
    {
      title: 'Health Education Campaigns',
      description: 'Community education programs on bone health, injury prevention, and orthopedic care.',
      beneficiaries: 'General public',
      frequency: 'Quarterly'
    }
  ];

  const professionalContributions = [
    {
      organization: 'Ethiopian Society of Orthopedic Surgery',
      role: 'Active Member',
      contribution: 'Contributing to professional standards and continuing education programs'
    },
    {
      organization: 'AO Alliance Faculty',
      role: 'Faculty Member',
      contribution: 'Teaching and mentoring orthopedic surgeons in trauma care techniques'
    },
    {
      organization: 'Wachemo University',
      role: 'Assistant Professor',
      contribution: 'Medical education, research, and academic leadership'
    },
    {
      organization: 'CURE Ethiopia',
      role: 'Collaborating Partner',
      contribution: 'Specialized pediatric orthopedic care and training programs'
    }
  ];

  const impactStats = [
    { number: '500+', label: 'Volunteer Patients Treated' },
    { number: '20+', label: 'Rural Hospitals Supported' },
    { number: '300+', label: 'Medical Students Mentored' },
    { number: '15+', label: 'Years of Service' }
  ];

  return (
    <div className="min-h-screen">

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to serving communities and advancing healthcare
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
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

      {/* Volunteer Work */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Volunteer Work & Humanitarian Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated service to underserved communities and medical education
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {volunteerWork.map((work, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">
                      {work.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {work.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {work.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Duration:</strong> {work.duration}
                    </p>
                    <p className="text-sm text-blue-600 font-medium">
                      <strong>Impact:</strong> {work.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Initiatives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Initiatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ongoing programs that bring orthopedic care to underserved communities
            </p>
          </div>

          <div className="space-y-8">
            {communityInitiatives.map((initiative, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <HandHeart className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {initiative.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {initiative.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Beneficiaries:</span>
                        <p className="text-sm text-gray-700">{initiative.beneficiaries}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Frequency:</span>
                        <p className="text-sm text-blue-600 font-medium">{initiative.frequency}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Contributions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Contributions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Active participation in professional organizations and academic institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalContributions.map((contribution, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {contribution.organization}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {contribution.role}
                    </p>
                    <p className="text-gray-700">
                      {contribution.contribution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Recognition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recognition for Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Awards and recognition for our commitment to community service and humanitarian work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Humanitarian Service Award
              </h3>
              <p className="text-gray-700">
                Recognized for outstanding volunteer work with Jewish Voice Ministries International
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Impact Award
              </h3>
              <p className="text-gray-700">
                Honored for significant contributions to rural healthcare and medical education
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mentorship Excellence
              </h3>
              <p className="text-gray-700">
                Recognized for exceptional mentorship of medical students and young doctors
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contributions;
