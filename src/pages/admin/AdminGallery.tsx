import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { galleryAPI, getUploadsUrl } from '../../services/adminApi';

const AdminGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<Array<{
    id: string;
    title: string;
    file_path: string;
    content_type: string;
    created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    file_path: null as File | null,
    content_type: ''
  });

  // Load gallery items on component mount
  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      const data = await galleryAPI.getAll();
      setGalleryItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to load gallery items');
      console.error('Error loading gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem = await galleryAPI.create(formData, formData.file_path || undefined);
      setGalleryItems([...galleryItems, newItem]);
      setIsModalOpen(false);
      setFormData({
        title: '',
        file_path: null,
        content_type: ''
      });
      setError(null);
    } catch (err) {
      setError('Failed to create gallery item');
      console.error('Error creating gallery item:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await galleryAPI.delete(id);
        setGalleryItems(galleryItems.filter(item => item.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete gallery item');
        console.error('Error deleting gallery item:', err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file_path: file });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">DAMC Gallery</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Upload Media
        </button>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <select className="border rounded-md px-3 py-2"><option>Grid View</option></select>
        <select className="border rounded-md px-3 py-2"><option>All Types</option></select>
        <input className="border rounded-md px-3 py-2 w-full max-w-xs" placeholder="Search media..." />
      </div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">Loading...</div>
        ) : galleryItems.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No media uploaded yet</div>
        ) : (
          galleryItems.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-square relative">
                {item.content_type?.startsWith('image/') ? (
                  <img
                    src={getUploadsUrl(item.file_path)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                            <div class="text-center">
                              <div class="text-2xl mb-2">📁</div>
                              <div>Image not found</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : item.content_type?.startsWith('video/') ? (
                  <video
                    src={getUploadsUrl(item.file_path)}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📄</div>
                      <div className="text-sm">{item.content_type || 'File'}</div>
                    </div>
                  </div>
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              {/* File info */}
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900 truncate" title={item.title}>
                  {item.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.content_type} • {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Media">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Gallery item title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Media File *</label>
            <input
              type="file"
              name="file_path"
              onChange={handleFileChange}
              required
              accept="image/*,video/*,application/pdf"
              className="w-full border rounded-md px-3 py-2"
            />
            {formData.file_path && (
              <p className="text-sm text-gray-600 mt-1">Selected: {formData.file_path.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
            <select
              name="content_type"
              value={formData.content_type}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Auto-detect</option>
              <option value="image/jpeg">JPEG Image</option>
              <option value="image/png">PNG Image</option>
              <option value="image/gif">GIF Image</option>
              <option value="video/mp4">MP4 Video</option>
              <option value="application/pdf">PDF Document</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Media
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminGallery;


