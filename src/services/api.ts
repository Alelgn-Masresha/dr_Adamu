const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://drhabtamuorthopedics.com/api';
const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || 'https://drhabtamuorthopedics.com/uploads';

// Token management
const getToken = (): string | null => localStorage.getItem('admin_token');
const setToken = (token: string): void => localStorage.setItem('admin_token', token);
const removeToken = (): void => localStorage.removeItem('admin_token');

// Generic API request function with optional authentication
const apiRequest = async (endpoint: string, options: RequestInit = {}, requireAuth: boolean = false) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(requireAuth && token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401 && requireAuth) {
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

// File upload function with optional authentication
const uploadFile = async (endpoint: string, formData: FormData, method: string = 'POST', requireAuth: boolean = false) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        ...(requireAuth && token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      if (response.status === 401 && requireAuth) {
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
      await apiRequest('/auth/logout', { method: 'POST' }, true);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
    }
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me', {}, true);
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }, true);
  },

  updateProfile: async (fullName: string, email: string) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ fullName, email }),
    }, true);
  },

  isAuthenticated: () => !!getToken(),
};

// Publications API
export const publicationsAPI = {
  // Public access
  getAll: () => apiRequest('/publications'),
  getById: (id: string) => apiRequest(`/publications/${id}`),
  
  // Admin access (requires authentication)
  create: (data: any) => apiRequest('/publications', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true),
  update: (id: string, data: any) => apiRequest(`/publications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true),
  delete: (id: string) => apiRequest(`/publications/${id}`, {
    method: 'DELETE',
  }, true),
};

// Services API
export const servicesAPI = {
  // Public access
  getAll: () => apiRequest('/services'),
  getById: (id: string) => apiRequest(`/services/${id}`),
  
  // Admin access (requires authentication)
  create: (data: any) => {
    return apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
  },
  update: (id: string, data: any) => {
    return apiRequest(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true);
  },
  delete: (id: string) => apiRequest(`/services/${id}`, {
    method: 'DELETE',
  }, true),
};

// Experiences API
export const experiencesAPI = {
  // Public access
  getAll: () => apiRequest('/experiences'),
  getById: (id: string) => apiRequest(`/experiences/${id}`),
  
  // Admin access (requires authentication)
  create: (data: any) => apiRequest('/experiences', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true),
  update: (id: string, data: any) => apiRequest(`/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true),
  delete: (id: string) => apiRequest(`/experiences/${id}`, {
    method: 'DELETE',
  }, true),
};

// Physicians API
export const physiciansAPI = {
  // Public access
  getAll: () => apiRequest('/physicians'),
  getById: (id: string) => apiRequest(`/physicians/${id}`),
  
  // Admin access (requires authentication)
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
      return uploadFile('/physicians', formData, 'POST', true);
    }
    return apiRequest('/physicians', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
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
      return uploadFile(`/physicians/${id}`, formData, 'PUT', true);
    }
    return apiRequest(`/physicians/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true);
  },
  delete: (id: string) => apiRequest(`/physicians/${id}`, {
    method: 'DELETE',
  }, true),
};

// News API
export const newsAPI = {
  // Public access
  getAll: () => apiRequest('/news'),
  getById: (id: string) => apiRequest(`/news/${id}`),
  
  // Admin access (requires authentication)
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
      return uploadFile('/news', formData, 'POST', true);
    }
    return apiRequest('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
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
      return uploadFile(`/news/${id}`, formData, 'PUT', true);
    }
    return apiRequest(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true);
  },
  delete: (id: string) => apiRequest(`/news/${id}`, {
    method: 'DELETE',
  }, true),
};

// Gallery API
export const galleryAPI = {
  // Public access
  getAll: () => apiRequest('/gallery'),
  getById: (id: string) => apiRequest(`/gallery/${id}`),
  
  // Admin access (requires authentication)
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
      return uploadFile('/gallery', formData, 'POST', true);
    }
    return apiRequest('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
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
      return uploadFile(`/gallery/${id}`, formData, 'PUT', true);
    }
    return apiRequest(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true);
  },
  delete: (id: string) => apiRequest(`/gallery/${id}`, {
    method: 'DELETE',
  }, true),
};

// Testimonials API
export const testimonialsAPI = {
  // Public access
  getAll: () => apiRequest('/testimonials'),
  getById: (id: string) => apiRequest(`/testimonials/${id}`),
  
  // Admin access (requires authentication)
  create: (data: any) => apiRequest('/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true),
  update: (id: string, data: any) => apiRequest(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true),
  delete: (id: string) => apiRequest(`/testimonials/${id}`, {
    method: 'DELETE',
  }, true),
};

// Health check
export const healthAPI = {
  check: () => apiRequest('/health'),
};

// Helper function to get uploads URL
export const getUploadsUrl = (filename: string) => {
  return `${UPLOADS_BASE_URL}/${filename}`;
};

