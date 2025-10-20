const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// File upload function
const uploadFile = async (endpoint: string, formData: FormData, method: string = 'POST') => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: method,
      body: formData,
    });
    
    if (!response.ok) {
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

