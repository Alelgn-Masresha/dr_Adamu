import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { testimonialsAPI } from '../../services/api';

const AdminTestimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Array<{
    id: string;
    author_name: string;
    author_title: string;
    rating: number;
    content: string;
    video_link?: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    author_name: '',
    author_title: '',
    rating: 5,
    content: '',
    video_link: '',
    is_approved: false
  });
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  // Load testimonials on component mount
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsAPI.getAll();
      setTestimonials(data);
      setError(null);
    } catch (err) {
      setError('Failed to load testimonials');
      console.error('Error loading testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        // Update existing testimonial
        const updatedTestimonial = await testimonialsAPI.update(editingTestimonial.id, formData);
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? updatedTestimonial : t));
        setEditingTestimonial(null);
      } else {
        // Create new testimonial
        const newTestimonial = await testimonialsAPI.create(formData);
        setTestimonials([...testimonials, newTestimonial]);
      }
      setIsModalOpen(false);
      setFormData({
        author_name: '',
        author_title: '',
        rating: 5,
        content: '',
        video_link: '',
        is_approved: false
      });
      setError(null);
    } catch (err) {
      setError(editingTestimonial ? 'Failed to update testimonial' : 'Failed to create testimonial');
      console.error('Error saving testimonial:', err);
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setFormData({
      author_name: testimonial.author_name,
      author_title: testimonial.author_title || '',
      rating: testimonial.rating,
      content: testimonial.content,
      video_link: testimonial.video_link || '',
      is_approved: testimonial.is_approved
    });
    setIsModalOpen(true);
  };

  const handleNewTestimonial = () => {
    setEditingTestimonial(null);
    setFormData({
      author_name: '',
      author_title: '',
      rating: 5,
      content: '',
      video_link: '',
      is_approved: false
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({
      author_name: '',
      author_title: '',
      rating: 5,
      content: '',
      video_link: '',
      is_approved: false
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await testimonialsAPI.delete(id);
        setTestimonials(testimonials.filter(item => item.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete testimonial');
        console.error('Error deleting testimonial:', err);
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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <button 
          onClick={handleNewTestimonial}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          + New Testimonial
        </button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input className="border rounded-md px-3 py-2 w-full max-w-md" placeholder="Search testimonials..." />
        <select className="border rounded-md px-3 py-2"><option>All</option><option>Approved</option><option>Pending</option></select>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <div className="bg-white border rounded-lg">
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-600 border-b">
          <div className="col-span-2">Author</div>
          <div className="col-span-1">Rating</div>
          <div className="col-span-1">Approved</div>
          <div className="col-span-2">Content</div>
          <div className="col-span-2">Video</div>
          <div className="col-span-4 text-right">Actions</div>
        </div>
        {loading ? (
          <div className="px-4 py-4 text-sm text-gray-600">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="px-4 py-4 text-sm text-gray-600">No testimonials found</div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="grid grid-cols-12 px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50">
              <div className="col-span-2 font-medium text-gray-900">{testimonial.author_name}</div>
              <div className="col-span-1 text-gray-600">{testimonial.rating}★</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded-full text-xs ${testimonial.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {testimonial.is_approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <div className="col-span-2 text-gray-600 truncate">{testimonial.content}</div>
              <div className="col-span-2 text-gray-600">
                {testimonial.video_link ? (
                  <a href={testimonial.video_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">
                    📹 Video
                  </a>
                ) : (
                  <span className="text-gray-400 text-xs">No video</span>
                )}
              </div>
              <div className="col-span-4 text-right">
                <button 
                  onClick={() => handleEdit(testimonial)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
            <input
              type="text"
              name="author_name"
              value={formData.author_name}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Alemayehu T."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Title</label>
            <input
              type="text"
              name="author_title"
              value={formData.author_title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Patient"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Testimonial content..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Link</label>
            <input
              type="url"
              name="video_link"
              value={formData.video_link}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
            />
            <p className="text-xs text-gray-500 mt-1">Optional: Add a video link for this testimonial</p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_approved"
              checked={formData.is_approved}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Approved</label>
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
              {editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTestimonials;


