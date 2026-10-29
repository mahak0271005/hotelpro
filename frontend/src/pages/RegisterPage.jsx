import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { FaHotel, FaUser, FaEnvelope, FaLock, FaPhone, FaShieldAlt } from 'react-icons/fa';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    const result = await dispatch(registerUser(dataToSend));
    if (registerUser.fulfilled.match(result)) {
      navigate('/guest/dashboard');
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
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="glass-panel p-4 p-md-5 rounded-4 shadow-xl text-dark">
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
              Join HotelPro Luxury Club
            </h2>
            <p className="text-muted small mb-0">Create an account for personalized hospitality privileges</p>
          </div>

          {errorMsg && <div className="alert alert-danger py-2 small">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small fw-bold text-uppercase text-muted">First Name</label>
                <div className="position-relative">
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="luxury-input ps-5"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <FaUser className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={13} />
                </div>
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="luxury-input"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={13} />
              </div>
            </div>

            <div>
              <label className="form-label small fw-bold text-uppercase text-muted">Phone Number</label>
              <div className="position-relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  className="luxury-input ps-5"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <FaPhone className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={13} />
              </div>
            </div>

            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Password</label>
                <div className="position-relative">
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    className="luxury-input ps-5"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={13} />
                </div>
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  className="luxury-input"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mt-1 text-muted small">
              <FaShieldAlt color="#10b981" />
              <span>We never share your private personal data.</span>
            </div>

            <button type="submit" disabled={loading} className="btn-gold py-2 mt-2 w-100 justify-content-center">
              {loading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status" />
              ) : (
                'Create Luxury Membership'
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted small">Already a member? </span>
            <Link to="/login" className="fw-bold" style={{ color: '#c9933e', fontSize: '0.88rem' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
