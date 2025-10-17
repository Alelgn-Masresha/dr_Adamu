import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Mock news data - in real app, this would come from API
  const currentNews = {
    id: 1,
    title: 'Congratulations! Dr. Jikssa became the president of the Ethiopian Gastroenterology Association (EGA)! This is the first time from a private institution.',
    description: 'Congratulations! Dr. Jikssa became the president of the Ethiopian Gastroenterology Association (EGA)! This is the first time from a private institution.',
    image: '/src/img/news/5884433855463668554.jpg',
    postedDate: '2025-08-18 06:35:49',
    postedBy: 'Admin',
    content: `We are thrilled to announce that Dr. Jikssa has been elected as the President of the Ethiopian Gastroenterology Association (EGA). This historic achievement marks the first time a physician from a private institution has been selected for this prestigious position.

Dr. Jikssa's election reflects his outstanding contributions to the field of gastroenterology and his commitment to advancing medical care in Ethiopia. His leadership will help strengthen collaboration between public and private healthcare institutions.

This milestone represents a significant step forward in recognizing the valuable contributions of private healthcare providers to the Ethiopian medical community. We congratulate Dr. Jikssa on this well-deserved honor and look forward to his continued leadership in advancing gastroenterology care across the country.`
  };

  // Other news data for sidebar
  const otherNews = [
    {
      id: 1,
      title: 'MCM Minimally Invasive Surgery Unit Launch',
      description: 'One of the Pioneers in Minimally Invasive Surgery',
      image: '/src/img/news/6012332002944077703.jpg',
      date: 'March 8, 2024'
    },
    {
      id: 2,
      title: 'ANAPHYLAXIS Training Program',
      description: 'Comprehensive training on emergency allergic reactions',
      image: '/src/img/news/6012332002944077716.jpg',
      date: 'March 5, 2024'
    },
    {
      id: 3,
      title: 'Medical Innovation Update',
      description: 'Introduction of new medical equipment and procedures',
      image: '/src/img/news/6015007097554586216.jpg',
      date: 'March 2, 2024'
    },
    {
      id: 4,
      title: 'Community Health Program',
      description: 'Launching new community health initiatives',
      image: '/src/img/news/6015007097554586226.jpg',
      date: 'February 28, 2024'
    },
    {
      id: 5,
      title: 'Research Collaboration',
      description: 'Partnering with international medical institutions',
      image: '/src/img/news/6015007097554586227.jpg',
      date: 'February 25, 2024'
    },
    {
      id: 6,
      title: 'Patient Success Stories',
      description: 'Celebrating successful recovery stories',
      image: '/src/img/news/6015007097554586231.jpg',
      date: 'February 22, 2024'
    }
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="mb-6">
              <img
                src={currentNews.image}
                alt={currentNews.title}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Metadata */}
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted Date: {currentNews.postedDate}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Posted By: {currentNews.postedBy}</span>
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Title: {currentNews.title}
            </h1>

            {/* Article Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Description:</h2>
              <p className="text-gray-700 leading-relaxed">{currentNews.description}</p>
            </div>

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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Other DAMC News</h2>
              
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
      </div>
    </div>
  );
};

export default NewsDetail;
