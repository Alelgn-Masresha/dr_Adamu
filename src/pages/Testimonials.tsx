import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { testimonialsAPI } from '../services/api';

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

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialsAPI.getAll();
        // Filter only approved testimonials
        const approvedTestimonials = data.filter((testimonial: any) => testimonial.is_approved);
        setTestimonials(approvedTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
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

  const stats = [
    { number: '99%', label: 'Patient Satisfaction Rate' },
    { number: '30000+', label: 'Successful Surgeries' },
    { number: '32000+', label: 'Patients Treated' },
    { number: '15+', label: 'Years of Experience' }
  ];

  return (
    <div className="min-h-screen">

      

      {/* Testimonials Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Patients Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real patients who have experienced our care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-600">Loading testimonials...</div>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-600">No testimonials available at the moment.</div>
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
                  
                  {/* Rating and Quote */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <p className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-semibold mr-3 sm:mr-4 text-sm sm:text-base">
                        {testimonial.author_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.author_name}</div>
                        <div className="text-xs sm:text-sm text-gray-600">{testimonial.author_title || 'Patient'}</div>
                        <div className="text-xs text-gray-500">
                          {testimonial.created_at ? new Date(testimonial.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          }) : 'Recent'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Patients Choose Us */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Patients Choose DHMC
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              The qualities that make our patients recommend us to their family and friends
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Expert Care</h3>
              <p className="text-sm sm:text-base text-gray-700">
                Board-certified orthopedic surgeon with 15+ years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Compassionate Treatment</h3>
              <p className="text-sm sm:text-base text-gray-700">
                Personalized care that treats each patient with dignity and respect
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Modern Facilities</h3>
              <p className="text-sm sm:text-base text-gray-700">
                State-of-the-art equipment and modern surgical techniques
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Comprehensive Follow-up</h3>
              <p className="text-sm sm:text-base text-gray-700">
                Complete rehabilitation and ongoing support throughout recovery
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Testimonials;
