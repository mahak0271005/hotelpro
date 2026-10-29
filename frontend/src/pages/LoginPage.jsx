import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { FaHotel, FaEnvelope, FaLock, FaSignInAlt, FaUserTie, FaConciergeBell, FaUser } from 'react-icons/fa';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      const user = result.payload.user;
      if (from && from !== '/') {
        navigate(from);
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'staff' || user.role === 'receptionist') {
        navigate('/staff');
      } else {
        navigate('/guest/dashboard');
      }
    }
  };

  // Demo accounts helper for effortless local testing
  const handleQuickFill = (role) => {
    if (role === 'admin') {
      setFormData({ email: 'admin@hotelpro.com', password: 'Password123!' });
    } else if (role === 'staff') {
      setFormData({ email: 'staff@hotelpro.com', password: 'Password123!' });
    } else {
      setFormData({ email: 'guest@hotelpro.com', password: 'Password123!' });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: '88vh',
        background: `radial-gradient(circle at 50% 30%, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80') center/cover`,
      }}
    >
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="glass-panel p-4 p-md-5 rounded-4 shadow-xl text-dark">
          {/* Brand header */}
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #d4a04e 0%, #b8822e 100%)',
                boxShadow: '0 4px 12px rgba(212, 160, 78, 0.35)',
              }}
            >
              <FaHotel size={24} color="#ffffff" />
            </div>
            <h2 className="luxury-heading mb-1" style={{ fontSize: '1.8rem' }}>
              Welcome to HotelPro
            </h2>
            <p className="text-muted small mb-0">Sign in to manage your bookings and hospitality suite</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
              <div className="position-relative">
                <input
                  type="email"
                  name="email"
                  required
                  className="luxury-input ps-5"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={14} />
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label small fw-bold text-uppercase text-muted">Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.78rem', color: '#c9933e' }}>
                  Forgot password?
                </Link>
              </div>
              <div className="position-relative">
                <input
                  type="password"
                  name="password"
                  required
                  className="luxury-input ps-5"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={14} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold py-2 mt-2 w-100 justify-content-center">
              {loading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status" />
              ) : (
                <>
                  <FaSignInAlt /> Sign In
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-4 pt-3 border-top text-center">
            <span className="text-muted small d-block mb-2 fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>
              Quick Demo Fill (Instant Testing)
            </span>
            <div className="d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem' }}
                onClick={() => handleQuickFill('admin')}
              >
                <FaUserTie color="#c9933e" /> Admin
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem' }}
                onClick={() => handleQuickFill('staff')}
              >
                <FaConciergeBell color="#38bdf8" /> Staff
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem' }}
                onClick={() => handleQuickFill('guest')}
              >
                <FaUser color="#10b981" /> Guest
              </button>
            </div>
          </div>

          <div className="text-center mt-4">
            <span className="text-muted small">Don't have an account? </span>
            <Link to="/register" className="fw-bold" style={{ color: '#c9933e', fontSize: '0.88rem' }}>
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
