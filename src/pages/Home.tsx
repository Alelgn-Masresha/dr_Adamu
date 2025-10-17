import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Heart, Stethoscope, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      image: '/src/img/hero/6015007097554586193.jpg',
      title: 'We Care God Heals',
      subtitle: 'Excellence',
      description: 'Our hospital is an international facility with a variety of specialists. We provide high-quality healthcare tailored to meet the unique needs of our patients.'
    },
    {
      id: 2,
      image: '/src/img/hero/6015007097554586191.jpg',
      title: 'We Care God Heals',
      subtitle: 'Expertise',
      description: 'Our hospital is an international facility with a variety of specialists. We provide high-quality healthcare tailored to meet the unique needs of our patients.'
    },
    {
      id: 3,
      image: '/src/img/hero/6015007097554586187.jpg',
      title: 'We Care God Heals',
      subtitle: 'Innovation',
      description: 'Our hospital is an international facility with a variety of specialists. We provide high-quality healthcare tailored to meet the unique needs of our patients.'
    },
    {
      id: 4,
      image: '/src/img/hero/6014611982038191001.jpg',
      title: 'We Care God Heals',
      subtitle: 'Excellence',
      description: 'Our hospital is an international facility with a variety of specialists. We provide high-quality healthcare tailored to meet the unique needs of our patients.'
    }
  ];

  const heroCards = [
    {
      id: 1,
      image: '/src/img/hero/6015007097554586193.jpg',
      title: 'DAMC Expertise',
      description: 'Advanced orthopedic and trauma care'
    },
    {
      id: 2,
      image: '/src/img/hero/6015007097554586191.jpg',
      title: 'DAMC Innovation',
      description: 'Cutting-edge medical technology'
    },
    {
      id: 3,
      image: '/src/img/hero/6015007097554586187.jpg',
      title: 'DAMC Excellence',
      description: 'World-class medical services'
    },
    {
      id: 4,
      image: '/src/img/hero/6014611982038191001.jpg',
      title: 'DAMC Care',
      description: 'Compassionate patient care'
    },
    {
      id: 5,
      image: '/src/img/hero/6015007097554586193.jpg',
      title: 'DAMC Quality',
      description: 'Highest standards of care'
    }
  ];

  // Auto-play functionality for hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const services = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: 'Orthopedic Surgery',
      description: 'Advanced surgical procedures for bone and joint conditions'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Trauma Care',
      description: 'Emergency and critical care for traumatic injuries'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Pediatric Orthopedics',
      description: 'Specialized care for children with orthopedic conditions'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Rehabilitation',
      description: 'Comprehensive physiotherapy and recovery programs'
    }
  ];

  const stats = [
    { number: '500+', label: 'Successful Surgeries' },
    { number: '15+', label: 'Years Experience' },
    { number: '1000+', label: 'Patients Treated' },
    { number: '98%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      name: 'Alemayehu T.',
      location: 'Hossana',
      text: 'After surgery at DAMC, I could walk again pain-free. Dr. Habtamu and his team treated me like family — their care was life-changing.'
    },
    {
      name: 'Meseret K.',
      location: 'Wolaita',
      text: 'The rehabilitation program at DAMC helped me recover completely from my sports injury. I\'m back to playing football!'
    },
    {
      name: 'Tigist M.',
      location: 'Hawassa',
      text: 'Professional, compassionate care. My child\'s orthopedic condition was treated with such expertise and kindness.'
    }
  ];

  const cardIndex = currentSlide % heroCards.length;

  // Physicians data for carousel
  const physicians = [
    {
      id: 1,
      name: 'Dr. Meron Tadesse',
      specialty: 'Psychiatrist (Specialist)',
      department: 'Psychiatry',
      avatar: '/src/img/doctor/dr_best.jpg'
    },
    {
      id: 2,
      name: 'Dr. Yohannes Adugna',
      specialty: 'Dentist GP',
      department: 'Dentistry',
      avatar: '/src/img/doctor/5929338507342494306.jpg'
    },
    {
      id: 3,
      name: 'Dr. Mihret Dagne',
      specialty: 'Anesthesiology (Specialist)',
      department: 'Anesthesiology',
      avatar: ''
    },
    {
      id: 4,
      name: 'Dr. Demeke Kebede',
      specialty: 'Anesthesiology (Specialist)',
      department: 'Anesthesiology',
      avatar: ''
    },
    {
      id: 5,
      name: 'Dr. Almaz Bekele',
      specialty: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      avatar: '/src/img/doctor/dr_best.jpg'
    }
  ];

  // News data for carousel
  const newsItems = [
    {
      id: 1,
      title: 'CPD Training on Stroke Care',
      description: 'All MCM Stroke Unit faculty members, ER and ICU nurses, and the Head Nurse are invited to participate in a CPD training on Stroke Care and Management.',
      image: '/src/img/news/5884433855463668554.jpg',
      date: 'March 11, 2024'
    },
    {
      id: 2,
      title: 'Trauma Center Excellence',
      description: 'Immediately cared by General Surgery, Orthopedic Surgery, Neurosurgery, Plastic Surgery, Emergency medicine and Critical Care specialists.',
      image: '/src/img/news/6012332002944077703.jpg',
      date: 'March 8, 2024'
    },
    {
      id: 3,
      title: 'Advanced Surgical Procedures',
      description: 'Our team successfully performed complex surgical procedures using the latest medical technology and techniques.',
      image: '/src/img/news/6012332002944077716.jpg',
      date: 'March 5, 2024'
    },
    {
      id: 4,
      title: 'Medical Innovation Update',
      description: 'Introduction of new medical equipment and procedures to enhance patient care and treatment outcomes.',
      image: '/src/img/news/6015007097554586216.jpg',
      date: 'March 2, 2024'
    },
    {
      id: 5,
      title: 'Community Health Program',
      description: 'Launching new community health initiatives to provide better healthcare access to underserved populations.',
      image: '/src/img/news/6015007097554586226.jpg',
      date: 'February 28, 2024'
    },
    {
      id: 6,
      title: 'Research Collaboration',
      description: 'Partnering with international medical institutions to advance orthopedic and trauma care research.',
      image: '/src/img/news/6015007097554586227.jpg',
      date: 'February 25, 2024'
    },
    {
      id: 7,
      title: 'Patient Success Stories',
      description: 'Celebrating successful recovery stories and patient testimonials from our orthopedic and trauma care programs.',
      image: '/src/img/news/6015007097554586231.jpg',
      date: 'February 22, 2024'
    }
  ];

  // Gallery images from all img folders
  const galleryImages = [
    { id: 1, src: '/src/img/news/5884433855463668554.jpg', alt: 'CPD Training Session' },
    { id: 2, src: '/src/img/news/6012332002944077716.jpg', alt: 'Medical Conference' },
    { id: 3, src: '/src/img/news/6012332002944077703.jpg', alt: 'Trauma Center' },
    { id: 4, src: '/src/img/news/6015007097554586231.jpg', alt: 'Surgical Procedure' },
    { id: 5, src: '/src/img/news/6015007097554586227.jpg', alt: 'Medical Research' },
    { id: 6, src: '/src/img/news/6015007097554586226.jpg', alt: 'Community Health' },
    { id: 7, src: '/src/img/news/6015007097554586216.jpg', alt: 'Medical Innovation' },
    { id: 8, src: '/src/img/doctor/5929338507342494306.jpg', alt: 'Medical Professional' },
    { id: 9, src: '/src/img/doctor/5929338507342494312.jpg', alt: 'Doctor Portrait' },
    { id: 10, src: '/src/img/doctor/dr_best.jpg', alt: 'Dr. Habtamu' },
    { id: 11, src: '/src/img/doctor/6015007097554586213.jpg', alt: 'Medical Team' },
    { id: 12, src: '/src/img/doctor/6015007097554586214.jpg', alt: 'Healthcare Staff' },
    { id: 13, src: '/src/img/doctor/6015007097554586229.jpg', alt: 'Medical Consultation' },
    { id: 14, src: '/src/img/doctor/6015007097554586230.jpg', alt: 'Clinical Setting' },
    { id: 15, src: '/src/img/hero/6015007097554586193.jpg', alt: 'Hospital Facility' },
    { id: 16, src: '/src/img/hero/6015007097554586191.jpg', alt: 'Medical Equipment' },
    { id: 17, src: '/src/img/hero/6015007097554586187.jpg', alt: 'Healthcare Environment' },
    { id: 18, src: '/src/img/hero/6014611982038191001.jpg', alt: 'Medical Center' }
  ];

  // Carousel scroll logic
  const physiciansRef = useRef<HTMLDivElement | null>(null);
  const newsRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const scrollPhysicians = (direction: 'left' | 'right') => {
    const container = physiciansRef.current;
    if (!container) return;
    const cardWidth = 400; // approximate card + gap width (380px + 32px gap)
    const amount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const scrollNews = (direction: 'left' | 'right') => {
    const container = newsRef.current;
    if (!container) return;
    const cardWidth = 350; // approximate card + gap width (320px + 30px gap)
    const amount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    const container = galleryRef.current;
    if (!container) return;
    const imageWidth = 340; // approximate image + gap width (320px + 20px gap)
    const amount = direction === 'left' ? -imageWidth : imageWidth;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = physiciansRef.current;
    if (!container) return;
    const interval = setInterval(() => {
      const nearEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      if (nearEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 400, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = newsRef.current;
    if (!container) return;
    const interval = setInterval(() => {
      const nearEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      if (nearEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 350, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;
    const interval = setInterval(() => {
      const nearEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      if (nearEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Main Hero Slider */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60" />
            </div>
          ))}
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {heroSlides[currentSlide].title}
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-blue-200 mb-6">
                  {heroSlides[currentSlide].subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-blue-100">
                  {heroSlides[currentSlide].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                  >
                    Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Cards Section */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="relative flex justify-end">
              {/* Compact single-card carousel aligned right */}
              <div className="relative w-64 sm:w-72 md:w-80 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${cardIndex * 100}%)` }}
                >
                  {heroCards.map((card) => (
                    <div key={card.id} className="w-full flex-shrink-0">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div
                          className="h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url(${card.image})` }}
                        />
                        <div className="p-3">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h3>
                          <p className="text-xs text-gray-600">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Navigation (syncs with main slider) */}
                <button
                  onClick={prevSlide}
                  className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 p-2 rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 p-2 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered header on top */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About Dr. Habtamu Tamrat Derilo
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
              Orthopedic Surgeon and Assistant Professor dedicated to compassionate, innovative, and excellent patient care.
            </p>
          </div>

          {/* Content left, Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 mb-6">
                  To deliver world-class orthopedic and trauma care that restores function, 
                  relieves pain, and improves quality of life for our patients.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be a leading orthopedic and trauma care center in Ethiopia and East Africa, 
                  known for excellence in patient care, education, and research.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Compassion</h4>
                    <p className="text-gray-600">Treating every patient with empathy and understanding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Excellence</h4>
                    <p className="text-gray-600">Maintaining the highest standards of medical care</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Innovation</h4>
                    <p className="text-gray-600">Embracing cutting-edge techniques and technology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Integrity</h4>
                    <p className="text-gray-600">Maintaining ethical standards in all our practices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/src/img/doctor/dr_best.jpg"
                  alt="Dr. Habtamu Tamrat Derilo"
                  className="w-80 h-96 md:w-96 md:h-[28rem] rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive orthopedic and trauma care services tailored to meet your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-200 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/* Our Physicians Section */}
       <section className="py-16 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10">Our Physicians</h2>

          <div className="relative">
            {/* Left Chevron */}
            <button
              onClick={() => scrollPhysicians('left')}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

             {/* Carousel */}
             <div
               ref={physiciansRef}
               className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2"
               style={{ scrollbarWidth: 'none' } as React.CSSProperties}
             >
               {physicians.map((doc) => (
                 <div key={doc.id} className="snap-start flex-shrink-0 w-[380px]">
                   <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-[480px] flex flex-col">
                     {/* Image section - 60% of card height */}
                     <div className="h-[288px] relative overflow-hidden rounded-t-2xl">
                       {doc.avatar ? (
                         <img 
                           src={doc.avatar} 
                           alt={doc.name} 
                           className="w-full h-full object-cover rounded-t-2xl" 
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-t-2xl">
                           No Photo
                         </div>
                       )}
                     </div>
                     
                     {/* Content section - 40% of card height */}
                     <div className="flex-1 px-6 pt-6 pb-6 text-center flex flex-col justify-between">
                       <div>
                         <h3 className="text-xl font-semibold text-gray-900 mb-3">{doc.name}</h3>
                         <div className="text-sm space-y-2">
                           <div>
                             <span className="font-semibold text-gray-700">Speciality : </span>
                             <span className="text-gray-600">{doc.specialty}</span>
                           </div>
                           <div>
                             <span className="font-semibold text-gray-700">Department : </span>
                             <span className="text-gray-600">{doc.department}</span>
                           </div>
                         </div>
                       </div>
                       <Link
                         to={`/physician/${doc.id}`}
                         className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                       >
                         View More
                       </Link>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

            {/* Right Chevron */}
            <button
              onClick={() => scrollPhysicians('right')}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
         </div>
       </section>

       {/* News Section */}
       <section className="py-16 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10">DAMC News</h2>

           <div className="relative">
             {/* Left Chevron */}
             <button
               onClick={() => scrollNews('left')}
               className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
               aria-label="Previous News"
             >
               <ChevronLeft className="h-5 w-5" />
             </button>

             {/* News Carousel */}
             <div
               ref={newsRef}
               className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2"
               style={{ scrollbarWidth: 'none' } as React.CSSProperties}
             >
               {newsItems.map((news) => (
                 <div key={news.id} className="snap-start flex-shrink-0 w-[320px]">
                   <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-[420px] flex flex-col border border-gray-100">
                     {/* Image section */}
                     <div className="h-[200px] relative overflow-hidden rounded-t-2xl">
                       <img 
                         src={news.image} 
                         alt={news.title} 
                         className="w-full h-full object-cover rounded-t-2xl" 
                       />
                     </div>
                     
                     {/* Content section */}
                     <div className="flex-1 px-6 pt-4 pb-6 flex flex-col justify-between">
                       <div>
                         <div className="text-xs text-blue-600 font-medium mb-2">{news.date}</div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{news.title}</h3>
                         <p className="text-sm text-gray-600 line-clamp-3">{news.description}</p>
                       </div>
                       <Link
                         to={`/news/${news.id}`}
                         className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                       >
                         View More
                       </Link>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             {/* Right Chevron */}
             <button
               onClick={() => scrollNews('right')}
               className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
               aria-label="Next News"
             >
               <ChevronRight className="h-5 w-5" />
             </button>
           </div>
         </div>
       </section>

       {/* Gallery Section */}
       <section className="py-16 bg-gray-50 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10">DAMC Gallery</h2>

           <div className="relative">
             {/* Left Chevron */}
             <button
               onClick={() => scrollGallery('left')}
               className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
               aria-label="Previous Gallery"
             >
               <ChevronLeft className="h-5 w-5" />
             </button>

             {/* Gallery Carousel */}
             <div
               ref={galleryRef}
               className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2"
               style={{ scrollbarWidth: 'none' } as React.CSSProperties}
             >
               {galleryImages.map((image) => (
                 <div key={image.id} className="snap-start flex-shrink-0">
                   <div className="w-[320px] h-[240px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                     <img 
                       src={image.src} 
                       alt={image.alt} 
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                     />
                   </div>
                 </div>
               ))}
             </div>

             {/* Right Chevron */}
             <button
               onClick={() => scrollGallery('right')}
               className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
               aria-label="Next Gallery"
             >
               <ChevronRight className="h-5 w-5" />
             </button>
           </div>
         </div>
       </section>

       {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our patients about their experience at Dr. Habtamu Medium Clinic
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Read More Testimonials
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Restore Your Movement?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Contact Dr. Habtamu Medium Clinic today to schedule your consultation and take the first step toward better health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Clock className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
