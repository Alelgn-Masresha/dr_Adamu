import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { publicationsAPI } from '../../services/api';

const AdminPublications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<{
    id: string;
    title: string;
    authors: string;
    journal: string;
    year: number;
    doi: string;
    url: string;
    abstract: string;
    created_at: string;
    updated_at: string;
  } | null>(null);
  const [publications, setPublications] = useState<Array<{
    id: string;
    title: string;
    authors: string;
    journal: string;
    year: number;
    doi: string;
    url: string;
    abstract: string;
    created_at: string;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    doi: '',
    url: '',
    abstract: '',
    topics: [] as string[]
  });

  // Load publications on component mount
  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      setLoading(true);
      const data = await publicationsAPI.getAll();
      setPublications(data);
      setError(null);
    } catch (err) {
      setError('Failed to load publications');
      console.error('Error loading publications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPublication) {
        // Update existing publication
        const updatedPublication = await publicationsAPI.update(editingPublication.id, formData);
        setPublications(publications.map(publication => 
          publication.id === editingPublication.id ? updatedPublication : publication
        ));
        setEditingPublication(null);
      } else {
        // Create new publication
        const newPublication = await publicationsAPI.create(formData);
        setPublications([...publications, newPublication]);
      }
      setIsModalOpen(false);
      setFormData({ title: '', authors: '', journal: '', year: '', doi: '', url: '', abstract: '', topics: [] });
      setError(null);
    } catch (err) {
      setError(editingPublication ? 'Failed to update publication' : 'Failed to create publication');
      console.error('Error saving publication:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await publicationsAPI.delete(id);
        setPublications(publications.filter(pub => pub.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete publication');
        console.error('Error deleting publication:', err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [newTopic, setNewTopic] = useState('');

  const addTopic = () => {
    if (newTopic.trim() && !formData.topics.includes(newTopic.trim())) {
      setFormData({ ...formData, topics: [...formData.topics, newTopic.trim()] });
      setNewTopic('');
    }
  };

  const removeTopic = (topicToRemove: string) => {
    setFormData({ ...formData, topics: formData.topics.filter(topic => topic !== topicToRemove) });
  };

  const handleTopicKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTopic();
    }
  };

  const handleEdit = (publication: any) => {
    setEditingPublication(publication);
    setFormData({
      title: publication.title,
      authors: publication.authors,
      journal: publication.journal,
      year: publication.year.toString(),
      doi: publication.doi,
      url: publication.url,
      abstract: publication.abstract,
      topics: publication.topics || []
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPublication(null);
    setFormData({ title: '', authors: '', journal: '', year: '', doi: '', url: '', abstract: '', topics: [] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Publications Management</h1>
        <button 
          onClick={() => {
            setEditingPublication(null);
            setFormData({ title: '', authors: '', journal: '', year: '', doi: '', url: '', abstract: '', topics: [] });
            setIsModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          + New Publication
        </button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input className="border rounded-md px-3 py-2 w-full max-w-md" placeholder="Search publications..." />
        <select className="border rounded-md px-3 py-2"><option>All Years</option></select>
        <select className="border rounded-md px-3 py-2"><option>All Journals</option></select>
      </div>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        
        <div className="bg-white border rounded-lg">
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-600 border-b">
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Journal</div>
            <div className="col-span-1">Year</div>
            <div className="col-span-2">DOI</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          {loading ? (
            <div className="px-4 py-4 text-sm text-gray-600">Loading...</div>
          ) : publications.length === 0 ? (
            <div className="px-4 py-4 text-sm text-gray-600">No publications found</div>
          ) : (
            publications.map((pub) => (
              <div key={pub.id} className="grid grid-cols-12 px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50">
                <div className="col-span-5 font-medium text-gray-900">{pub.title}</div>
                <div className="col-span-3 text-gray-600">{pub.journal}</div>
                <div className="col-span-1 text-gray-600">{pub.year}</div>
                <div className="col-span-2 text-gray-600">{pub.doi}</div>
                <div className="col-span-1 text-right">
                  <button 
                    onClick={() => handleEdit(pub)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(pub.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={editingPublication ? "Edit Publication" : "Add New Publication"}>
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
              placeholder="Publication title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Authors</label>
            <input
              type="text"
              name="authors"
              value={formData.authors}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Habtamu T., Johnson M., et al."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Journal</label>
            <input
              type="text"
              name="journal"
              value={formData.journal}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Nature Biotechnology"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="2024"
              required
              min="1900"
              max="2030"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
            <input
              type="text"
              name="doi"
              value={formData.doi}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="10.1038/nbt.4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Publication abstract..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyPress={handleTopicKeyPress}
                placeholder="Add a topic..."
                className="flex-1 border rounded-md px-3 py-2"
              />
              <button
                type="button"
                onClick={addTopic}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            {formData.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {topic}
                    <button
                      type="button"
                      onClick={() => removeTopic(topic)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
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
              {editingPublication ? 'Update Publication' : 'Save Publication'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPublications;


