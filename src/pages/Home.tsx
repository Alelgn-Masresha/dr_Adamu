import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Heart, Stethoscope, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

interface TestimonialItem {
  id: string;
  author_name: string;
  author_title?: string;
  rating: number;
  content: string;
  video_link?: string;
  is_approved: boolean;
  created_at: string;
}

interface PhysicianItem {
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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [physicians, setPhysicians] = useState<PhysicianItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  const [physiciansLoading, setPhysiciansLoading] = useState(true);
  
  const heroSlides = [
    {
      id: 1,
      image: '/src/img/hero/6015007097554586193.jpg',
      title: 'We Care About Your Health',
      subtitle: 'Excellence',
      description: 'Our hospital is an international facility with a variety of specialists. We provide high-quality healthcare tailored to meet the unique needs of our patients.'
    },
    {
      id: 2,
      image: '/src/img/hero/6015007097554586191.jpg',
      title: 'We Care About Your Health',
      subtitle: 'Expertise',
      description: 'Our hospital is an international facility with a variety of specialists. We provide high-quality healthcare tailored to meet the unique needs of our patients.'
    },
    {
      id: 3,
      image: '/src/img/hero/6015007097554586187.jpg',
      title: 'We Care About Your Health',
      subtitle: 'Innovation',
      description: 'Our hospital is an international facility with a variety of specialists. We provide high-quality healthcare tailored to meet the unique needs of our patients.'
    },
    {
      id: 4,
      image: '/src/img/hero/6014611982038191001.jpg',
      title: 'We Care About Your Health',
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

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news/published');
        if (response.ok) {
          const data = await response.json();
          // Transform the data to match the expected format
          const transformedNews = data.map((news: any) => ({
            id: news.id,
            title: news.title,
            description: news.excerpt || news.content?.substring(0, 150) + '...' || 'No description available',
            image: news.cover_image_file ? `http://localhost:5000/uploads/${news.cover_image_file}` : '/src/img/news/default.jpg',
            date: news.created_at ? new Date(news.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'No date'
          }));
          setNewsItems(transformedNews);
        } else {
          console.error('Failed to fetch news');
          // Fallback to empty array or default news
          setNewsItems([]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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

  // Calculate statistics from experiences data
  const calculateStats = () => {
    if (experiences.length === 0) {
      return [
        { number: '0', label: 'Successful Surgeries' },
        { number: '0', label: 'Years Experience' },
        { number: '0', label: 'Patients Treated' },
        { number: '0%', label: 'Success Rate' }
      ];
    }

    let totalSurgeries = 0;
    let totalYears = 0;
    let totalPatients = 0;
    let totalSuccessRate = 0;
    let validExperiences = 0;

    experiences.forEach(experience => {
      const metrics = experience.metrics;
      
      // Extract numbers from strings (remove +, %, etc.)
      const surgeries = parseInt(metrics.successfulSurgeries?.replace(/[^\d]/g, '') || '0');
      const years = parseInt(metrics.years?.replace(/[^\d]/g, '') || '0');
      const patients = parseInt(metrics.patients?.replace(/[^\d]/g, '') || '0');
      const successRate = parseInt(metrics.successRate?.replace(/[^\d]/g, '') || '0');

      totalSurgeries += surgeries;
      totalYears += years;
      totalPatients += patients;
      totalSuccessRate += successRate;
      validExperiences++;
    });

    const avgSuccessRate = validExperiences > 0 ? Math.round(totalSuccessRate / validExperiences) : 0;

    return [
      { number: `${totalSurgeries}+`, label: 'Successful Surgeries' },
      { number: `${totalYears}+`, label: 'Years Experience' },
      { number: `${totalPatients}+`, label: 'Patients Treated' },
      { number: `${avgSuccessRate}%`, label: 'Success Rate' }
    ];
  };

  const stats = calculateStats();

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setExperiencesLoading(true);
        const response = await fetch('http://localhost:5000/api/experiences');
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        } else {
          console.error('Failed to fetch experiences');
          setExperiences([]);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setExperiences([]);
      } finally {
        setExperiencesLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialsLoading(true);
        const response = await fetch('http://localhost:5000/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          // Filter only approved testimonials and limit to 3 for home page
          const approvedTestimonials = data
            .filter((testimonial: any) => testimonial.is_approved)
            .slice(0, 3);
          setTestimonials(approvedTestimonials);
        } else {
          console.error('Failed to fetch testimonials');
          setTestimonials([]);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Function to convert YouTube URLs to embed URLs
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const cardIndex = currentSlide % heroCards.length;


  // Fetch physicians from API
  useEffect(() => {
    const fetchPhysicians = async () => {
      try {
        setPhysiciansLoading(true);
        const response = await fetch('http://localhost:5000/api/physicians');
        if (response.ok) {
          const data = await response.json();
          // Filter only active physicians
          const activePhysicians = data.filter((physician: PhysicianItem) => physician.is_active);
          setPhysicians(activePhysicians);
        } else {
          console.error('Failed to fetch physicians');
          setPhysicians([]);
        }
      } catch (error) {
        console.error('Error fetching physicians:', error);
        setPhysicians([]);
      } finally {
        setPhysiciansLoading(false);
      }
    };
    fetchPhysicians();
  }, []);


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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
                  {heroSlides[currentSlide].title}
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-blue-200 mb-4 sm:mb-6 px-2">
                  {heroSlides[currentSlide].subtitle}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-blue-100 px-4">
                  {heroSlides[currentSlide].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link
                    to="/contact"
                    className="bg-white text-blue-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors text-sm sm:text-base"
                  >
                    Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Cards Section */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8">
            <div className="relative flex justify-center sm:justify-end">
              {/* Compact single-card carousel - centered on mobile, right-aligned on larger screens */}
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${cardIndex * 100}%)` }}
                >
                  {heroCards.map((card) => (
                    <div key={card.id} className="w-full flex-shrink-0">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div
                          className="h-24 sm:h-28 md:h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url(${card.image})` }}
                        />
                        <div className="p-2 sm:p-3">
                          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">{card.title}</h3>
                          <p className="text-xs text-gray-600 leading-tight">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Navigation - Hidden on mobile, visible on larger screens */}
                <button
                  onClick={prevSlide}
                  className="hidden sm:flex absolute -left-8 lg:-left-10 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="hidden sm:flex absolute -right-8 lg:-right-10 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered header on top */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 px-2">
              About Dr. Habtamu Tamrat Derilo
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Orthopedic Surgeon and Assistant Professor dedicated to compassionate, innovative, and excellent patient care.
            </p>
          </div>

          {/* Content left, Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left content */}
            <div className="order-2 lg:order-1">
              <div className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                  To deliver world-class orthopedic and trauma care that restores function, 
                  relieves pain, and improves quality of life for our patients.
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  To be a leading orthopedic and trauma care center in Ethiopia and East Africa, 
                  known for excellence in patient care, education, and research.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Compassion</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Treating every patient with empathy and understanding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Excellence</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Maintaining the highest standards of medical care</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Innovation</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Embracing cutting-edge techniques and technology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Integrity</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Maintaining ethical standards in all our practices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                <img
                  src="/src/img/doctor/dr_best.jpg"
                  alt="Dr. Habtamu Tamrat Derilo"
                  className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Our Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive orthopedic and trauma care services tailored to meet your needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-3 sm:mb-4">
                  <div className="h-6 w-6 sm:h-8 sm:w-8">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/services"
              className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center text-sm sm:text-base"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {experiencesLoading ? (
              // Show loading state
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-200 mb-1 sm:mb-2">
                    ...
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-blue-100">
                    Loading...
                  </div>
                </div>
              ))
            ) : (
              // Show calculated stats
              stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-200 mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-blue-100">
                    {stat.label}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/experience"
              className="inline-block bg-white text-blue-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Details
            </Link>
          </div>
        </div>
      </section>
       {/* Our Physicians Section */}
       <section className="py-12 sm:py-16 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-10 px-2">Our Physicians</h2>

          <div className="relative">
            {/* Left Chevron - Hidden on mobile */}
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
               className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2"
               style={{ scrollbarWidth: 'none' } as React.CSSProperties}
             >
               {physiciansLoading ? (
                 // Show loading state
                 Array.from({ length: 3 }).map((_, index) => (
                   <div key={index} className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]">
                     <div className="bg-white rounded-2xl shadow-md h-[420px] sm:h-[450px] md:h-[480px] flex flex-col">
                       <div className="h-[252px] sm:h-[270px] md:h-[288px] bg-gray-200 rounded-t-2xl flex items-center justify-center">
                         <div className="text-gray-400">Loading...</div>
                       </div>
                       <div className="flex-1 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 text-center flex flex-col justify-between">
                         <div>
                           <div className="h-6 bg-gray-200 rounded mb-2"></div>
                           <div className="h-4 bg-gray-200 rounded mb-1"></div>
                           <div className="h-4 bg-gray-200 rounded"></div>
                         </div>
                         <div className="h-10 bg-gray-200 rounded"></div>
                       </div>
                     </div>
                   </div>
                 ))
               ) : physicians.length === 0 ? (
                 // Show empty state
                 <div className="snap-start flex-shrink-0 w-full text-center py-12">
                   <div className="text-gray-500">No physicians available at the moment.</div>
                 </div>
               ) : (
                 // Show physicians
                 physicians.map((doc) => (
                   <div key={doc.id} className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]">
                     <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-[420px] sm:h-[450px] md:h-[480px] flex flex-col">
                       {/* Image section - 60% of card height */}
                       <div className="h-[252px] sm:h-[270px] md:h-[288px] relative overflow-hidden rounded-t-2xl">
                         {doc.avatar_file ? (
                           <img 
                             src={`http://localhost:5000/uploads/${doc.avatar_file}`} 
                             alt={doc.full_name} 
                             className="w-full h-full object-cover rounded-t-2xl" 
                           />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm sm:text-base lg:text-lg bg-gray-100 rounded-t-2xl">
                             No Photo
                           </div>
                         )}
                       </div>
                       
                       {/* Content section - 40% of card height */}
                       <div className="flex-1 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 text-center flex flex-col justify-between">
                         <div>
                           <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{doc.full_name}</h3>
                           <div className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                             <div>
                               <span className="font-semibold text-gray-700">Speciality : </span>
                               <span className="text-gray-600">{doc.title || 'Not specified'}</span>
                             </div>
                             <div>
                               <span className="font-semibold text-gray-700">Location : </span>
                               <span className="text-gray-600">{doc.location || 'Not specified'}</span>
                             </div>
                           </div>
                         </div>
                         <Link
                           to={`/physician/${doc.id}`}
                           className="mt-3 sm:mt-4 inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
                         >
                           View More
                         </Link>
                       </div>
                     </div>
                   </div>
                 ))
               )}
             </div>

            {/* Right Chevron - Hidden on mobile */}
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
       <section className="py-12 sm:py-16 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-10 px-2">DAMC News</h2>

           <div className="relative">
             {/* Left Chevron - Hidden on mobile */}
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
               className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2"
               style={{ scrollbarWidth: 'none' } as React.CSSProperties}
             >
               {loading ? (
                 <div className="flex justify-center items-center w-full h-[400px]">
                   <div className="text-gray-500">Loading news...</div>
                 </div>
               ) : newsItems.length === 0 ? (
                 <div className="flex justify-center items-center w-full h-[400px]">
                   <div className="text-gray-500">No news articles available at the moment.</div>
                 </div>
               ) : (
                 newsItems.map((news) => (
                   <div key={news.id} className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]">
                     <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-[380px] sm:h-[400px] md:h-[420px] flex flex-col border border-gray-100">
                       {/* Image section */}
                       <div className="h-[180px] sm:h-[190px] md:h-[200px] relative overflow-hidden rounded-t-2xl">
                         <img 
                           src={news.image} 
                           alt={news.title} 
                           className="w-full h-full object-cover rounded-t-2xl" 
                         />
                       </div>
                       
                       {/* Content section */}
                       <div className="flex-1 px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6 flex flex-col justify-between">
                         <div>
                           <div className="text-xs text-blue-600 font-medium mb-1 sm:mb-2">{news.date}</div>
                           <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{news.title}</h3>
                           <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{news.description}</p>
                         </div>
                         <Link
                           to={`/news/${news.id}`}
                           className="mt-3 sm:mt-4 inline-block bg-blue-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
                         >
                           View More
                         </Link>
                       </div>
                     </div>
                   </div>
                 ))
               )}
             </div>

             {/* Right Chevron - Hidden on mobile */}
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
       <section className="py-12 sm:py-16 bg-gray-50 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-10 px-2">DAMC Gallery</h2>

           <div className="relative">
             {/* Left Chevron - Hidden on mobile */}
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
               className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2"
               style={{ scrollbarWidth: 'none' } as React.CSSProperties}
             >
               {galleryImages.map((image) => (
                 <div key={image.id} className="snap-start flex-shrink-0">
                   <div className="w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                     <img 
                       src={image.src} 
                       alt={image.alt} 
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                     />
                   </div>
                 </div>
               ))}
             </div>

             {/* Right Chevron - Hidden on mobile */}
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
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              What Our Patients Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Hear from our patients about their experience at Dr. Habtamu Medium Clinic
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonialsLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="text-gray-600">Loading testimonials...</div>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <div className="text-gray-600">No testimonials available at the moment.</div>
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  {/* Video Window */}
                  {testimonial.video_link && (
                    <div className="mb-4">
                      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        {testimonial.video_link.includes('youtube.com') || testimonial.video_link.includes('youtu.be') ? (
                          <iframe
                            src={getYouTubeEmbedUrl(testimonial.video_link)}
                            title="Video testimonial"
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video
                            src={testimonial.video_link}
                            controls
                            className="w-full h-full object-cover"
                            preload="metadata"
                            onError={(e) => {
                              console.error('Video failed to load:', testimonial.video_link);
                              e.currentTarget.style.display = 'none';
                            }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Testimonial Content */}
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-semibold mr-2 sm:mr-3 text-sm sm:text-base">
                      {testimonial.author_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.author_name}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{testimonial.author_title || 'Patient'}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/testimonials"
              className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center text-sm sm:text-base"
            >
              Read More Testimonials
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Ready to Restore Your Movement?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto px-4">
            Contact Dr. Habtamu Medium Clinic today to schedule your consultation and take the first step toward better health.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-sm sm:text-base"
            >
              <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base"
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
