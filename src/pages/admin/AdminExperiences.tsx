import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { experiencesAPI } from '../../services/api';

const AdminExperiences = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<{
    id: string;
    institution: string;
    role: string;
    period: string;
    physician_id: string | null;
    sort_order: number;
    metrics: {
      successfulSurgeries: string;
      years: string;
      patients: string;
      successRate: string;
    };
    created_at: string;
    updated_at: string;
  } | null>(null);
  const [experiences, setExperiences] = useState<Array<{
    id: string;
    institution: string;
    role: string;
    period: string;
    physician_id: string | null;
    sort_order: number;
    metrics: {
      successfulSurgeries: string;
      years: string;
      patients: string;
      successRate: string;
    };
    created_at: string;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institution: '',
    role: '',
    period: '',
    physician_id: '',
    sort_order: 0,
    metrics: {
      successfulSurgeries: '',
      years: '',
      patients: '',
      successRate: ''
    }
  });

  // Load experiences on component mount
  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experiencesAPI.getAll();
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError('Failed to load experiences');
      console.error('Error loading experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExperience) {
        // Update existing experience
        const updatedExperience = await experiencesAPI.update(editingExperience.id, formData);
        setExperiences(experiences.map(experience => 
          experience.id === editingExperience.id ? updatedExperience : experience
        ));
        setEditingExperience(null);
      } else {
        // Create new experience
        const newExperience = await experiencesAPI.create(formData);
        setExperiences([...experiences, newExperience]);
      }
      setIsModalOpen(false);
      setFormData({
        institution: '',
        role: '',
        period: '',
        physician_id: '',
        sort_order: 0,
        metrics: { successfulSurgeries: '', years: '', patients: '', successRate: '' }
      });
      setError(null);
    } catch (err) {
      setError(editingExperience ? 'Failed to update experience' : 'Failed to create experience');
      console.error('Error saving experience:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experiencesAPI.delete(id);
        setExperiences(experiences.filter(exp => exp.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete experience');
        console.error('Error deleting experience:', err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (experience: any) => {
    setEditingExperience(experience);
    setFormData({
      institution: experience.institution,
      role: experience.role,
      period: experience.period,
      physician_id: experience.physician_id || '',
      sort_order: experience.sort_order,
      metrics: experience.metrics
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExperience(null);
    setFormData({
      institution: '',
      role: '',
      period: '',
      physician_id: '',
      sort_order: 0,
      metrics: { successfulSurgeries: '', years: '', patients: '', successRate: '' }
    });
  };

  const handleMetricsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      metrics: { ...formData.metrics, [name]: value }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Experiences</h1>
        <button 
          onClick={() => {
            setEditingExperience(null);
            setFormData({
              institution: '',
              role: '',
              period: '',
              physician_id: '',
              sort_order: 0,
              metrics: { successfulSurgeries: '', years: '', patients: '', successRate: '' }
            });
            setIsModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          + Add Experience
        </button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input className="border rounded-md px-3 py-2 w-full max-w-md" placeholder="Search experiences..." />
        <select className="border rounded-md px-3 py-2"><option>All Physicians</option></select>
        <select className="border rounded-md px-3 py-2"><option>All Roles</option></select>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <div className="bg-white border rounded-lg">
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-600 border-b">
          <div className="col-span-4">Institution</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Period</div>
          <div className="col-span-2">Physician</div>
          <div className="col-span-1">Sort</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        {loading ? (
          <div className="px-4 py-4 text-sm text-gray-600">Loading...</div>
        ) : experiences.length === 0 ? (
          <div className="px-4 py-4 text-sm text-gray-600">No experiences found</div>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="grid grid-cols-12 px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50">
              <div className="col-span-4 font-medium text-gray-900">{exp.institution}</div>
              <div className="col-span-2 text-gray-600">{exp.role}</div>
              <div className="col-span-2 text-gray-600">{exp.period}</div>
              <div className="col-span-2 text-gray-600">Dr. Habtamu</div>
              <div className="col-span-1 text-gray-600">{exp.sort_order}</div>
              <div className="col-span-1 text-right">
                <button 
                  onClick={() => handleEdit(exp)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={editingExperience ? "Edit Experience" : "Add New Experience"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Hossana General Hospital"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Orthopedic Surgeon"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="2014 – 2018"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Physician</label>
            <select
              name="physician_id"
              value={formData.physician_id}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Physician</option>
              <option value="1">Dr. Habtamu Tamrat</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input
              type="number"
              name="sort_order"
              value={formData.sort_order}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="0"
            />
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Successful Surgeries</label>
                <input
                  type="text"
                  name="successfulSurgeries"
                  value={formData.metrics.successfulSurgeries}
                  onChange={handleMetricsChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="500+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
                <input
                  type="text"
                  name="years"
                  value={formData.metrics.years}
                  onChange={handleMetricsChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="5+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patients Treated</label>
                <input
                  type="text"
                  name="patients"
                  value={formData.metrics.patients}
                  onChange={handleMetricsChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="1000+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Success Rate</label>
                <input
                  type="text"
                  name="successRate"
                  value={formData.metrics.successRate}
                  onChange={handleMetricsChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="98%"
                />
              </div>
            </div>
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
              Save Experience
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminExperiences;


