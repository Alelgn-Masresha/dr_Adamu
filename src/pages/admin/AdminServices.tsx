import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { servicesAPI } from '../../services/api';

const AdminServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<{
    id: string;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  } | null>(null);
  const [services, setServices] = useState<Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    is_active: true
  });

  // Load services on component mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await servicesAPI.getAll();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Failed to load services');
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        // Update existing service
        const updatedService = await servicesAPI.update(editingService.id, formData);
        setServices(services.map(service => 
          service.id === editingService.id ? updatedService : service
        ));
        setEditingService(null);
      } else {
        // Create new service
        const newService = await servicesAPI.create(formData);
        setServices([...services, newService]);
      }
      setIsModalOpen(false);
      setFormData({ name: '', slug: '', description: '', is_active: true });
      setError(null);
    } catch (err) {
      setError(editingService ? 'Failed to update service' : 'Failed to create service');
      console.error('Error saving service:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesAPI.delete(id);
        setServices(services.filter(service => service.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete service');
        console.error('Error deleting service:', err);
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

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({ 
      ...formData, 
      name,
      slug: generateSlug(name)
    });
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      is_active: service.is_active
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData({ name: '', slug: '', description: '', is_active: true });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <button 
          onClick={() => {
            setEditingService(null);
            setFormData({ name: '', slug: '', description: '', is_active: true });
            setIsModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          + Add Service
        </button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input className="border rounded-md px-3 py-2 w-full max-w-md" placeholder="Search services..." />
        <select className="border rounded-md px-3 py-2"><option>All Status</option></select>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <div className="bg-white border rounded-lg">
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-600 border-b">
          <div className="col-span-5">Name</div>
          <div className="col-span-4">Slug</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {loading ? (
          <div className="px-4 py-4 text-sm text-gray-600">Loading...</div>
        ) : services.length === 0 ? (
          <div className="px-4 py-4 text-sm text-gray-600">No services found</div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="grid grid-cols-12 px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50 items-center">
              <div className="col-span-5 font-medium text-gray-900">{service.name}</div>
              <div className="col-span-4 text-gray-600">{service.slug}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded-full text-xs ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {service.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <button 
                  onClick={() => handleEdit(service)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={editingService ? "Edit Service" : "Add New Service"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Orthopedic Surgery"
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
              placeholder="orthopedic-surgery"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Advanced surgical procedures for bone and joint conditions"
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
              onClick={handleModalClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingService ? 'Update Service' : 'Save Service'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminServices;


