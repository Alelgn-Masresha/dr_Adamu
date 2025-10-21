import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { newsAPI, getUploadsUrl } from '../../services/adminApi';

const AdminNews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image_file: string | null;
    author_physician_id: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
  } | null>(null);
  const [newsItems, setNewsItems] = useState<Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image_file: string;
    author_physician_id: string;
    is_published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_file: null as File | null,
    author_physician_id: '',
    is_published: false,
    published_at: ''
  });

  // Load news on component mount
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsAPI.getAll();
      setNewsItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to load news');
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNews) {
        // Update existing news item
        const updatedNews = await newsAPI.update(editingNews.id, formData, formData.cover_image_file || undefined);
        setNewsItems(newsItems.map(news => 
          news.id === editingNews.id ? updatedNews : news
        ));
        setEditingNews(null);
      } else {
        // Create new news item
        const newNews = await newsAPI.create(formData, formData.cover_image_file || undefined);
        setNewsItems([...newsItems, newNews]);
      }
      handleCloseModal();
      setError(null);
    } catch (err) {
      setError(editingNews ? 'Failed to update news item' : 'Failed to create news item');
      console.error('Error saving news item:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await newsAPI.delete(id);
        setNewsItems(newsItems.filter(item => item.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete news item');
        console.error('Error deleting news item:', err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, cover_image_file: file });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ 
      ...formData, 
      title,
      slug: generateSlug(title)
    });
  };

  const handleEdit = (news: any) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt || '',
      content: news.content || '',
      cover_image_file: null,
      author_physician_id: news.author_physician_id || '',
      is_published: news.is_published,
      published_at: news.published_at || ''
    });
    setIsModalOpen(true);
  };

  const handleNewArticle = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_file: null,
      author_physician_id: '',
      is_published: false,
      published_at: ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_file: null,
      author_physician_id: '',
      is_published: false,
      published_at: ''
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleNewArticle}
            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
          >
            + New Article
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input className="border rounded-md px-3 py-2 w-full max-w-md" placeholder="Search news..." />
        <select className="border rounded-md px-3 py-2"><option>Published</option><option>Unpublished</option><option>All</option></select>
        <select className="border rounded-md px-3 py-2"><option>All Authors</option></select>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <div className="bg-white border rounded-lg">
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-600 border-b">
          <div className="col-span-1">Cover</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-2">Slug</div>
          <div className="col-span-2">Published At</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {loading ? (
          <div className="px-4 py-4 text-sm text-gray-600">Loading...</div>
        ) : newsItems.length === 0 ? (
          <div className="px-4 py-4 text-sm text-gray-600">No news items found</div>
        ) : (
          newsItems.map((news) => (
            <div key={news.id} className="grid grid-cols-12 px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50 items-center">
              <div className="col-span-1">
                {news.cover_image_file ? (
                  <img
                    src={getUploadsUrl(news.cover_image_file)}
                    alt={news.title}
                    className="w-12 h-8 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">📰</div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">📰</div>
                )}
              </div>
              <div className="col-span-3 font-medium text-gray-900">{news.title}</div>
              <div className="col-span-2 text-gray-600">{news.slug}</div>
              <div className="col-span-2 text-gray-600">{news.published_at || 'Draft'}</div>
              <div className="col-span-2 text-gray-600">Dr. Habtamu</div>
              <div className="col-span-2 text-right">
                <button 
                  onClick={() => handleEdit(news)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(news.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingNews ? "Edit Article" : "Add New Article"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Article title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="article-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Short description for cards..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Article content..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <input
              type="file"
              name="cover_image_file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border rounded-md px-3 py-2"
            />
            {formData.cover_image_file && (
              <p className="text-sm text-gray-600 mt-1">Selected: {formData.cover_image_file.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <select
              name="author_physician_id"
              value={formData.author_physician_id}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Author</option>
              <option value="1">Dr. Habtamu Tamrat</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Published</label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingNews ? 'Update Article' : 'Save Article'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminNews;


