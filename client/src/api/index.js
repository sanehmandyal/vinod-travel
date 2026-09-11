import axiosClient from './axiosClient';

export const authApi = {
  login: (credentials) => axiosClient.post('/auth/login', credentials).then((r) => r.data),
  me: () => axiosClient.get('/auth/me').then((r) => r.data),
};

export const bookingApi = {
  create: (data) => axiosClient.post('/bookings', data).then((r) => r.data),
  list: (params) => axiosClient.get('/bookings', { params }).then((r) => r.data),
  stats: () => axiosClient.get('/bookings/stats/summary').then((r) => r.data),
  update: (id, data) => axiosClient.put(`/bookings/${id}`, data).then((r) => r.data),
  remove: (id) => axiosClient.delete(`/bookings/${id}`).then((r) => r.data),
};

const makeContentApi = (resource) => ({
  list: () => axiosClient.get(`/${resource}`).then((r) => r.data),
  listAdmin: () => axiosClient.get(`/${resource}/admin`).then((r) => r.data),
  get: (id) => axiosClient.get(`/${resource}/${id}`).then((r) => r.data),
  create: (data) => axiosClient.post(`/${resource}`, data).then((r) => r.data),
  update: (id, data) => axiosClient.put(`/${resource}/${id}`, data).then((r) => r.data),
  remove: (id) => axiosClient.delete(`/${resource}/${id}`).then((r) => r.data),
});

export const vehicleApi = makeContentApi('vehicles');
export const destinationApi = makeContentApi('destinations');
export const tourPackageApi = makeContentApi('tour-packages');
export const galleryApi = makeContentApi('gallery');

export const reviewApi = {
  list: () => axiosClient.get('/reviews').then((r) => r.data),
  listAdmin: () => axiosClient.get('/reviews/admin').then((r) => r.data),
  submit: (data) => axiosClient.post('/reviews', data).then((r) => r.data),
  update: (id, data) => axiosClient.put(`/reviews/${id}`, data).then((r) => r.data),
  remove: (id) => axiosClient.delete(`/reviews/${id}`).then((r) => r.data),
};

export const settingsApi = {
  get: () => axiosClient.get('/settings').then((r) => r.data),
  update: (data) => axiosClient.put('/settings', data).then((r) => r.data),
};

export const uploadApi = {
  // file: a browser File object from an <input type="file">
  image: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axiosClient
      .post('/uploads', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data);
  },
};

export const contactApi = {
  submit: (data) => axiosClient.post('/contact', data).then((r) => r.data),
  list: () => axiosClient.get('/contact').then((r) => r.data),
  update: (id, data) => axiosClient.put(`/contact/${id}`, data).then((r) => r.data),
  remove: (id) => axiosClient.delete(`/contact/${id}`).then((r) => r.data),
};
