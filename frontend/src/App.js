import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './store/slices/authSlice';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import HomePage from './pages/HomePage';
import HotelListPage from './pages/HotelListPage';
import HotelDetailPage from './pages/HotelDetailPage';
import RoomListPage from './pages/RoomListPage';
import RoomDetailPage from './pages/RoomDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import GuestDashboardPage from './pages/GuestDashboardPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // If a token is stored, attempt to sync current user profile
    if (localStorage.getItem('hotelpro_token')) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Exploration Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<HotelListPage />} />
            <Route path="/hotels/:id" element={<HotelDetailPage />} />
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Guest Portals */}
            <Route
              path="/guest/dashboard"
              element={
                <ProtectedRoute>
                  <GuestDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <GuestDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <GuestDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Staff & Concierge Dashboard */}
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={['staff', 'receptionist', 'admin']}>
                  <StaffDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Executive Admin Management */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
