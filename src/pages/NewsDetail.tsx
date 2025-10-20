import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  cover_image_file?: string;
  created_at: string;
  author_name?: string;
}

interface OtherNewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

const NewsDetail = () => {
  const { id } = useParams();
  const [currentNews, setCurrentNews] = useState<NewsArticle | null>(null);
  const [otherNews, setOtherNews] = useState<OtherNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Fetch news data from API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        
        // Fetch current news article
        if (id) {
          const currentResponse = await fetch(`http://localhost:5000/api/news/${id}`);
          if (currentResponse.ok) {
            const currentData = await currentResponse.json();
            setCurrentNews(currentData);
          } else {
            setError('News article not found');
            return;
          }
        }
        
        // Fetch other news for sidebar
        const otherResponse = await fetch('http://localhost:5000/api/news/published');
        if (otherResponse.ok) {
          const otherData = await otherResponse.json();
          // Filter out current news and transform data
          const filteredOtherNews = otherData
            .filter((news: any) => news.id !== id)
            .slice(0, 4) // Limit to 4 items
            .map((news: any) => ({
              id: news.id,
              title: news.title,
              description: news.excerpt || news.content?.substring(0, 100) + '...' || 'No description',
              image: news.cover_image_file ? `http://localhost:5000/uploads/${news.cover_image_file}` : '/src/img/news/default.jpg',
              date: news.created_at ? new Date(news.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'No date'
            }));
          setOtherNews(filteredOtherNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news data');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [id]);

  // Auto-scroll functionality for news carousel
  useEffect(() => {
    if (!isAutoScrolling || otherNews.length <= 1) return;

    const interval = setInterval(() => {
      const container = document.getElementById('news-carousel');
      if (!container) return;

      const cardWidth = 280; // approximate card width including gap
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      if (container.scrollLeft >= maxScrollLeft - 10) {
        // If at the end, scroll back to beginning
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Otherwise, scroll to next card
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, otherNews.length]);

  const scrollNews = (direction: 'left' | 'right') => {
    const container = document.getElementById('news-carousel');
    if (!container) return;
    const cardWidth = 280; // approximate card width
    const amount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
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
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading news article...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        ) : currentNews ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="mb-6">
              <img
                src={currentNews.cover_image_file ? `http://localhost:5000/uploads/${currentNews.cover_image_file}` : '/src/img/news/default.jpg'}
                alt={currentNews.title}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Metadata */}
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted Date: {currentNews.created_at ? new Date(currentNews.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'No date'}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Posted By: {currentNews.author_name || 'Admin'}</span>
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {currentNews.title}
            </h1>

            {/* Article Excerpt */}
            {currentNews.excerpt && (
            <div className="mb-6">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">{currentNews.excerpt}</p>
            </div>
            )}

            {/* Article Content */}
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentNews.content}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Other DAMC News</h2>
                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title={isAutoScrolling ? "Pause auto-scroll" : "Resume auto-scroll"}
                >
                  {isAutoScrolling ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="relative">
                {/* Left Chevron */}
                <button
                  onClick={() => scrollNews('left')}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
                  aria-label="Previous News"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* News Carousel */}
                <div
                  id="news-carousel"
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2"
                  style={{ scrollbarWidth: 'none' } as React.CSSProperties}
                  onMouseEnter={() => setIsAutoScrolling(false)}
                  onMouseLeave={() => setIsAutoScrolling(true)}
                >
                  {otherNews.map((news) => (
                    <Link
                      key={news.id}
                      to={`/news/${news.id}`}
                      className="snap-start flex-shrink-0 w-[260px] hover:bg-gray-50 rounded-lg p-2 transition-colors"
                    >
                      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {/* Image */}
                        <div className="h-40 relative overflow-hidden rounded-t-lg">
                          <img 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <div className="text-xs text-blue-600 font-medium mb-2">{news.date}</div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                          <p className="text-xs text-gray-600 line-clamp-2">{news.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right Chevron */}
                <button
                  onClick={() => scrollNews('right')}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-700 p-2 rounded-full"
                  aria-label="Next News"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* View All News Button */}
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View All News
                </Link>
              </div>
            </div>
          </div>
        </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewsDetail;
