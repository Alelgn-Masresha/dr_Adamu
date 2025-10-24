import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { physiciansAPI, getUploadsUrl } from '../../services/api';

const AdminPhysicians = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhysician, setEditingPhysician] = useState<{
    id: string;
    full_name: string;
    title: string;
    bio: string;
    avatar_file: string | null;
    qualifications: string[];
    affiliations: string[];
    email: string;
    phone: string;
    location: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  } | null>(null);
  const [physicians, setPhysicians] = useState<Array<{
    id: string;
    full_name: string;
    title: string;
    bio: string;
    avatar_file: string;
    qualifications: string;
    affiliations: string;
    email: string;
    phone: string;
    location: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    title: '',
    bio: '',
    avatar_file: null as File | null,
    qualifications: '',
    affiliations: '',
    email: '',
    phone: '',
    location: '',
    is_active: true
  });

  // Load physicians on component mount
  useEffect(() => {
    loadPhysicians();
  }, []);

  const loadPhysicians = async () => {
    try {
      setLoading(true);
      const data = await physiciansAPI.getAll();
      setPhysicians(data);
      setError(null);
    } catch (err) {
      setError('Failed to load physicians');
      console.error('Error loading physicians:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPhysician) {
        // Update existing physician
        const updatedPhysician = await physiciansAPI.update(editingPhysician.id, formData, formData.avatar_file || undefined);
        setPhysicians(physicians.map(physician => 
          physician.id === editingPhysician.id ? updatedPhysician : physician
        ));
        setEditingPhysician(null);
      } else {
        // Create new physician
        const newPhysician = await physiciansAPI.create(formData, formData.avatar_file || undefined);
        setPhysicians([...physicians, newPhysician]);
      }
      setIsModalOpen(false);
      setFormData({
        full_name: '',
        title: '',
        bio: '',
        avatar_file: null,
        qualifications: '',
        affiliations: '',
        email: '',
        phone: '',
        location: '',
        is_active: true
      });
      setError(null);
    } catch (err) {
      setError(editingPhysician ? 'Failed to update physician' : 'Failed to create physician');
      console.error('Error saving physician:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this physician?')) {
      try {
        await physiciansAPI.delete(id);
        setPhysicians(physicians.filter(physician => physician.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete physician');
        console.error('Error deleting physician:', err);
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
    setFormData({ ...formData, avatar_file: file });
  };

  const handleEdit = (physician: any) => {
    setEditingPhysician(physician);
    setFormData({
      full_name: physician.full_name,
      title: physician.title,
      bio: physician.bio,
      avatar_file: null, // Don't pre-fill file input
      qualifications: physician.qualifications ? physician.qualifications.join(', ') : '',
      affiliations: physician.affiliations ? physician.affiliations.join(', ') : '',
      email: physician.email,
      phone: physician.phone,
      location: physician.location,
      is_active: physician.is_active
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPhysician(null);
    setFormData({
      full_name: '',
      title: '',
      bio: '',
      avatar_file: null,
      qualifications: '',
      affiliations: '',
      email: '',
      phone: '',
      location: '',
      is_active: true
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Physicians Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          + Add Physician
        </button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input className="border rounded-md px-3 py-2 w-full max-w-md" placeholder="Search physicians..." />
        <select className="border rounded-md px-3 py-2"><option>All Status</option></select>
        <select className="border rounded-md px-3 py-2"><option>All Locations</option></select>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <div className="bg-white border rounded-lg">
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-600 border-b">
          <div className="col-span-1">Avatar</div>
          <div className="col-span-3">Physician</div>
          <div className="col-span-2">Title</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {loading ? (
          <div className="px-4 py-4 text-sm text-gray-600">Loading...</div>
        ) : physicians.length === 0 ? (
          <div className="px-4 py-4 text-sm text-gray-600">No physicians found</div>
        ) : (
          physicians.map((physician) => (
            <div key={physician.id} className="grid grid-cols-12 px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50 items-center">
              <div className="col-span-1">
                {physician.avatar_file ? (
                  <img
                    src={getUploadsUrl(physician.avatar_file)}
                    alt={physician.full_name}
                    className="w-10 h-10 object-cover rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">👤</div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">👤</div>
                )}
              </div>
              <div className="col-span-3 font-medium text-gray-900">{physician.full_name}</div>
              <div className="col-span-2 text-gray-600">{physician.title}</div>
              <div className="col-span-3 text-gray-600">{physician.email}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded-full text-xs ${physician.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {physician.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <button 
                  onClick={() => handleEdit(physician)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(physician.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Physician">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Dr. Habtamu Tamrat Derilo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Orthopedic Surgeon"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Physician biography..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
            <input
              type="file"
              name="avatar_file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border rounded-md px-3 py-2"
            />
            {formData.avatar_file && (
              <p className="text-sm text-gray-600 mt-1">Selected: {formData.avatar_file.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="MD, FCS-ECSA (comma separated)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Affiliations</label>
            <input
              type="text"
              name="affiliations"
              value={formData.affiliations}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="COSECSA, AHA (comma separated)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="habtamu@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="+251 912 243 888"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Hossana, Ethiopia"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Active</label>
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
              Save Physician
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPhysicians;


