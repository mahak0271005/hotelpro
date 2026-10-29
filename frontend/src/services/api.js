import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor – attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('hotelpro_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, Promise.reject);

// Response interceptor – handle 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('hotelpro_token');
      localStorage.removeItem('hotelpro_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authAPI = {
  register:       (data) => API.post('/auth/register', data),
  login:          (data) => API.post('/auth/login', data),
  logout:         ()     => API.post('/auth/logout'),
  getMe:          ()     => API.get('/auth/me'),
  forgotPassword: (data) => API.post('/auth/forgot-password', data),
  resetPassword:  (token, data) => API.put(`/auth/reset-password/${token}`, data),
  updatePassword: (data) => API.put('/auth/update-password', data),
  verifyEmail:    (token) => API.get(`/auth/verify-email/${token}`),
};

// ─── Hotels ──────────────────────────────────────────────────────────────────
export const hotelsAPI = {
  getAll:     (params) => API.get('/hotels', { params }),
  getOne:     (id)     => API.get(`/hotels/${id}`),
  create:     (data)   => API.post('/hotels', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:     (id, data) => API.put(`/hotels/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete:     (id)     => API.delete(`/hotels/${id}`),
  getReviews: (id, params) => API.get(`/hotels/${id}/reviews`, { params }),
};

// ─── Rooms ───────────────────────────────────────────────────────────────────
export const roomsAPI = {
  getAll:       (params) => API.get('/rooms', { params }),
  getOne:       (id)     => API.get(`/rooms/${id}`),
  create:       (data)   => API.post('/rooms', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:       (id, data) => API.put(`/rooms/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete:       (id)     => API.delete(`/rooms/${id}`),
  updateStatus: (id, status) => API.patch(`/rooms/${id}/status`, { status }),
  getStats:     (hotelId)    => API.get(`/rooms/hotel/${hotelId}/stats`),
};

// ─── Bookings ────────────────────────────────────────────────────────────────
export const bookingsAPI = {
  create:          (data) => API.post('/bookings', data),
  getAll:          (params) => API.get('/bookings', { params }),
  getOne:          (id)     => API.get(`/bookings/${id}`),
  update:          (id, data) => API.put(`/bookings/${id}`, data),
  cancel:          (id, data) => API.put(`/bookings/${id}/cancel`, data),
  checkAvailability:(roomId, params) => API.get(`/bookings/availability/${roomId}`, { params }),
  getUpcoming:     () => API.get('/bookings/upcoming'),
};

// ─── Payments ────────────────────────────────────────────────────────────────
export const paymentsAPI = {
  createOrder:  (data) => API.post('/payments/create-order', data),
  verifyPayment:(data) => API.post('/payments/verify', data),
  getAll:       (params) => API.get('/payments', { params }),
  getOne:       (id)     => API.get(`/payments/${id}`),
  processRefund:(id, data) => API.post(`/payments/${id}/refund`, data),
};

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviewsAPI = {
  create:      (data) => API.post('/reviews', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll:      (params) => API.get('/reviews', { params }),
  addResponse: (id, data) => API.put(`/reviews/${id}/response`, data),
};

// ─── Check-In/Out ────────────────────────────────────────────────────────────
export const checkInAPI = {
  checkIn:  (data) => API.post('/checkin', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  checkOut: (data) => API.post('/checkin/checkout', data),
  getToday: ()     => API.get('/checkin/today'),
  getAll:   (params) => API.get('/checkin', { params }),
};

// ─── Notifications ───────────────────────────────────────────────────────────
export const notificationsAPI = {
  getAll:    (params) => API.get('/notifications', { params }),
  markRead:  (id)     => API.put(`/notifications/${id}/read`),
  markAllRead: ()     => API.put('/notifications/mark-all'),
  delete:    (id)     => API.delete(`/notifications/${id}`),
};

// ─── Reports ─────────────────────────────────────────────────────────────────
export const reportsAPI = {
  getDashboard: () => API.get('/reports/dashboard'),
  getRevenue:   (params) => API.get('/reports/revenue', { params }),
  getOccupancy: () => API.get('/reports/occupancy'),
  getBookings:  (params) => API.get('/reports/bookings', { params }),
};

// ─── Admin ───────────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats:      () => API.get('/admin/stats'),
  getUsers:      (params) => API.get('/admin/users', { params }),
  updateUser:    (id, data) => API.put(`/admin/users/${id}`, data),
  toggleUser:    (id)      => API.patch(`/admin/users/${id}/toggle`),
  createStaff:   (data)    => API.post('/admin/staff', data),
};

// ─── Services ────────────────────────────────────────────────────────────────
export const servicesAPI = {
  create: (data) => API.post('/services', data),
  getAll: (params) => API.get('/services', { params }),
  update: (id, data) => API.put(`/services/${id}`, data),
};

// ─── Staff ───────────────────────────────────────────────────────────────────
export const staffAPI = {
  getDashboard: () => API.get('/staff/dashboard'),
  getList:      () => API.get('/staff/list'),
  assignService:(data) => API.post('/staff/assign', data),
};

// ─── User ────────────────────────────────────────────────────────────────────
export const userAPI = {
  getProfile:    () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default API;
