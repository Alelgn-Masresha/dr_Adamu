const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Token management
const getToken = (): string | null => localStorage.getItem('admin_token');
const setToken = (token: string): void => localStorage.setItem('admin_token', token);
const removeToken = (): void => localStorage.removeItem('admin_token');

// Generic API request function with authentication
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, remove it
        removeToken();
        window.location.href = '/admin/login';
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    setToken(data.token);
    return data;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
    }
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  updateProfile: async (fullName: string, email: string) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ fullName, email }),
    });
  },

  isAuthenticated: () => !!getToken(),
};

// File upload function with authentication
export const uploadFile = async (endpoint: string, formData: FormData, method: string = 'POST') => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/admin/login';
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`File upload failed for ${endpoint}:`, error);
    throw error;
  }
};

// Publications API
export const publicationsAPI = {
  getAll: () => apiRequest('/publications'),
  getById: (id: string) => apiRequest(`/publications/${id}`),
  create: (data: any) => apiRequest('/publications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/publications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/publications/${id}`, {
    method: 'DELETE',
  }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiRequest('/services'),
  getById: (id: string) => apiRequest(`/services/${id}`),
  create: (data: any) => {
    return apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: (id: string, data: any) => {
    return apiRequest(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: (id: string) => apiRequest(`/services/${id}`, {
    method: 'DELETE',
  }),
};

// Experiences API
export const experiencesAPI = {
  getAll: () => apiRequest('/experiences'),
  getById: (id: string) => apiRequest(`/experiences/${id}`),
  create: (data: any) => apiRequest('/experiences', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/experiences/${id}`, {
    method: 'DELETE',
  }),
};

// Physicians API
export const physiciansAPI = {
  getAll: () => apiRequest('/physicians'),
  getById: (id: string) => apiRequest(`/physicians/${id}`),
  create: (data: any, file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar_file', file);
      // Only append non-file fields
      Object.keys(data).forEach(key => {
        if (key !== 'avatar_file' && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return uploadFile('/physicians', formData);
    }
    return apiRequest('/physicians', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: (id: string, data: any, file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar_file', file);
      // Only append non-file fields
      Object.keys(data).forEach(key => {
        if (key !== 'avatar_file' && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return uploadFile(`/physicians/${id}`, formData, 'PUT');
    }
    return apiRequest(`/physicians/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: (id: string) => apiRequest(`/physicians/${id}`, {
    method: 'DELETE',
  }),
};

// News API
export const newsAPI = {
  getAll: () => apiRequest('/news'),
  getById: (id: string) => apiRequest(`/news/${id}`),
  create: (data: any, file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('cover_image_file', file);
      // Only append non-file fields
      Object.keys(data).forEach(key => {
        if (key !== 'cover_image_file' && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return uploadFile('/news', formData);
    }
    return apiRequest('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: (id: string, data: any, file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('cover_image_file', file);
      // Only append non-file fields
      Object.keys(data).forEach(key => {
        if (key !== 'cover_image_file' && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return uploadFile(`/news/${id}`, formData, 'PUT');
    }
    return apiRequest(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: (id: string) => apiRequest(`/news/${id}`, {
    method: 'DELETE',
  }),
};

// Gallery API
export const galleryAPI = {
  getAll: () => apiRequest('/gallery'),
  getById: (id: string) => apiRequest(`/gallery/${id}`),
  create: (data: any, file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('file_path', file);
      // Only append non-file fields
      Object.keys(data).forEach(key => {
        if (key !== 'file_path' && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return uploadFile('/gallery', formData);
    }
    return apiRequest('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: (id: string, data: any, file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('file_path', file);
      // Only append non-file fields
      Object.keys(data).forEach(key => {
        if (key !== 'file_path' && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return uploadFile(`/gallery/${id}`, formData, 'PUT');
    }
    return apiRequest(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: (id: string) => apiRequest(`/gallery/${id}`, {
    method: 'DELETE',
  }),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiRequest('/testimonials'),
  getById: (id: string) => apiRequest(`/testimonials/${id}`),
  create: (data: any) => apiRequest('/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/testimonials/${id}`, {
    method: 'DELETE',
  }),
};

// Health check
export const healthAPI = {
  check: () => apiRequest('/health'),
};

// Helper function to get uploads URL
export const getUploadsUrl = (filename: string) => {
  const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5000/uploads';
  return `${UPLOADS_BASE_URL}/${filename}`;
};
