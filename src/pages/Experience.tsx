import { ArrowRight } from 'lucide-react';

type Institution = {
  name: string;
  role: string;
  period: string;
  metrics: { label: string; value: string }[];
};

const Experience = () => {
  const institutions: Institution[] = [
    {
      name: 'Hossana General Hospital',
      role: 'Orthopedic Surgeon',
      period: '2014 – 2018',
      metrics: [
        { label: 'Successful Surgeries', value: '500+' },
        { label: 'Years Experience', value: '5+' },
        { label: 'Patients Treated', value: '1000+' },
        { label: 'Success Rate', value: '98%' },
      ],
    },
    {
      name: 'Wachemo University Teaching Hospital',
      role: 'Assistant Professor, Orthopedics',
      period: '2018 – 2022',
      metrics: [
        { label: 'Successful Surgeries', value: '700+' },
        { label: 'Years Experience', value: '4+' },
        { label: 'Patients Treated', value: '1500+' },
        { label: 'Success Rate', value: '97%' },
      ],
    },
    {
      name: 'Dr. Habtamu Medium Clinic',
      role: 'Medical Director, Orthopedic Surgeon',
      period: '2022 – Present',
      metrics: [
        { label: 'Successful Surgeries', value: '300+' },
        { label: 'Years Experience', value: '3+' },
        { label: 'Patients Treated', value: '800+' },
        { label: 'Success Rate', value: '99%' },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Experience</h1>
          <p className="text-blue-100 max-w-3xl mx-auto">Detailed institutional experience and key performance metrics.</p>
        </div>
      </section>

      {/* Institutions */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {institutions.map((inst) => (
            <div key={inst.name} className="rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{inst.name}</h2>
                  <div className="text-gray-600 text-sm sm:text-base">{inst.role} • {inst.period}</div>
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
                  {inst.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-200 mb-1">{m.value}</div>
                      <div className="text-sm sm:text-base text-blue-100">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;


