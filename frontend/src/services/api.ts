import axios from 'axios';

// API Base URL - uses env variable or falls back to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : '/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor: attach auth token ──────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Get A Dream Home_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: auto-logout on 401 ────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('Get A Dream Home_token');
      // Optionally redirect to login
      // window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// ═══════════════════════════════════════════════════════════
// API Endpoints — aligned with backend routes
// ═══════════════════════════════════════════════════════════

// Properties (CRUD — admin-managed listings)
export const propertiesAPI = {
  getAll: (params?: any, config?: { signal?: AbortSignal }) =>
    apiClient.get('/products/list', { params, ...config }),

  getById: (id: string) =>
    apiClient.get(`/products/single/${id}`),
};

// Appointments (supports guest + auth bookings)
export const appointmentsAPI = {
  schedule: (data: {
    propertyId: string;
    date?: string;
    time?: string;
    name: string;
    email: string;
    phone: string;
    message?: string;
  }) =>
    apiClient.post('/appointments/schedule', data),

  cancel: (id: string, reason?: string) =>
    apiClient.put(`/appointments/cancel/${id}`, { cancelReason: reason }),
};

// AI-Powered Property Search
// Backend transforms the request via middleware at POST /api/ai/search
export const aiAPI = {
  search: (data: {
    city?: string;
    locality?: string;
    bhk?: string;
    possession?: string;
    includeNoBroker?: boolean;
    price?: { min: number; max: number };
    type?: string;
    category?: string;
  }) => {
    const githubKey = localStorage.getItem('Get A Dream Home_github_key');
    const firecrawlKey = localStorage.getItem('Get A Dream Home_firecrawl_key');
    return apiClient.post('/ai/search', data, {
      headers: {
        ...(githubKey && { 'X-Github-Key': githubKey }),
        ...(firecrawlKey && { 'X-Firecrawl-Key': firecrawlKey }),
      },
    });
  },

  locationTrends: (city: string) => {
    const githubKey = localStorage.getItem('Get A Dream Home_github_key');
    const firecrawlKey = localStorage.getItem('Get A Dream Home_firecrawl_key');
    return apiClient.get(`/locations/${encodeURIComponent(city)}/trends`, {
      headers: {
        ...(githubKey && { 'X-Github-Key': githubKey }),
        ...(firecrawlKey && { 'X-Firecrawl-Key': firecrawlKey }),
      },
    });
  },

  validateKeys: (keys?: { githubKey?: string; firecrawlKey?: string }) => {
    const githubKey = (keys?.githubKey ?? localStorage.getItem('Get A Dream Home_github_key') ?? '').trim();
    const firecrawlKey = (keys?.firecrawlKey ?? localStorage.getItem('Get A Dream Home_firecrawl_key') ?? '').trim();

    return apiClient.post('/ai/validate-keys', {}, {
      headers: {
        ...(githubKey && { 'X-Github-Key': githubKey }),
        ...(firecrawlKey && { 'X-Firecrawl-Key': firecrawlKey }),
      },
    });
  },
};

// Helpers to read/write user API keys in localStorage
export const apiKeyStorage = {
  getGithubKey: () => localStorage.getItem('Get A Dream Home_github_key') || '',
  getFirecrawlKey: () => localStorage.getItem('Get A Dream Home_firecrawl_key') || '',
  setGithubKey: (key: string) => localStorage.setItem('Get A Dream Home_github_key', key),
  setFirecrawlKey: (key: string) => localStorage.setItem('Get A Dream Home_firecrawl_key', key),
  hasKeys: () => !!(localStorage.getItem('Get A Dream Home_github_key') && localStorage.getItem('Get A Dream Home_firecrawl_key')),
  clear: () => {
    localStorage.removeItem('Get A Dream Home_github_key');
    localStorage.removeItem('Get A Dream Home_firecrawl_key');
  },
};

// YouTube Latest Videos
export const youtubeAPI = {
  getLatestVideos: () => apiClient.get('/youtube/latest'),
};

export default apiClient;

