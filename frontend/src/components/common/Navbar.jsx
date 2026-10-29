import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import {
  FaHotel,
  FaUserCircle,
  FaCalendarAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { label: 'Hotels', path: '/hotels' },
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'staff' || user.role === 'receptionist') return '/staff';
    return '/guest/dashboard';
  };

  return (
    <header className="sticky-top" style={{ zIndex: 1020 }}>
      <nav
        className="navbar navbar-expand-lg py-3"
        style={{
          background: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0 text-white">
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #d4a04e 0%, #b8822e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(212, 160, 78, 0.35)',
              }}
            >
              <FaHotel size={20} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                HOTEL<span style={{ color: '#d4a04e' }}>PRO</span>
              </span>
              <span
                className="d-none d-sm-block text-uppercase"
                style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#94a3b8' }}
              >
                Luxury Hospitality Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: active ? '#d4a04e' : '#e2e8f0',
                    fontWeight: active ? 600 : 500,
                    fontSize: '0.92rem',
                    letterSpacing: '0.02em',
                    borderBottom: active ? '2px solid #d4a04e' : '2px solid transparent',
                    paddingBottom: '4px',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* User / Auth Controls */}
          <div className="d-flex align-items-center gap-3">
            {isAuthenticated && user ? (
              <div className="position-relative">
                <button
                  className="btn btn-dark d-flex align-items-center gap-2 px-3 py-2"
                  style={{
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                  }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <FaUserCircle size={18} color="#d4a04e" />
                  <span className="d-none d-md-inline" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    {user.firstName || user.name || 'Account'}
                  </span>
                  <span
                    className="badge rounded-pill text-uppercase d-none d-sm-inline"
                    style={{
                      background: 'rgba(212, 160, 78, 0.2)',
                      color: '#d4a04e',
                      fontSize: '0.65rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {user.role}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="position-absolute end-0 mt-2 p-2 shadow-lg rounded"
                    style={{
                      minWidth: '220px',
                      background: '#1e293b',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      zIndex: 1050,
                    }}
                  >
                    <div className="px-3 py-2 border-bottom border-secondary mb-1">
                      <div className="text-white fw-bold" style={{ fontSize: '0.9rem' }}>
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
                        {user.email}
                      </div>
                    </div>

                    <Link
                      to={getDashboardPath()}
                      className="d-flex align-items-center gap-2 px-3 py-2 text-white rounded text-decoration-none dropdown-item-hover"
                      style={{ fontSize: '0.88rem' }}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <FaTachometerAlt size={14} color="#d4a04e" />
                      Dashboard
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="d-flex align-items-center gap-2 px-3 py-2 text-white rounded text-decoration-none dropdown-item-hover"
                      style={{ fontSize: '0.88rem' }}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <FaCalendarAlt size={14} color="#38bdf8" />
                      My Bookings
                    </Link>

                    <Link
                      to="/profile"
                      className="d-flex align-items-center gap-2 px-3 py-2 text-white rounded text-decoration-none dropdown-item-hover"
                      style={{ fontSize: '0.88rem' }}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <FaUserCircle size={14} color="#a78bfa" />
                      Profile Settings
                    </Link>

                    <hr className="my-1 border-secondary" />

                    <button
                      className="btn w-100 text-start d-flex align-items-center gap-2 px-3 py-2 text-danger rounded"
                      style={{ fontSize: '0.88rem', background: 'transparent' }}
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link
                  to="/login"
                  className="btn px-3 py-2"
                  style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  Log In
                </Link>
                <Link to="/register" className="btn-gold" style={{ fontSize: '0.85rem' }}>
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="btn btn-dark d-lg-none p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'transparent', border: 'none', color: '#fff' }}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="d-lg-none w-100 px-4 py-3 mt-2"
            style={{
              background: '#0f172a',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="d-flex flex-column gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ color: '#f8fafc', fontWeight: 500, fontSize: '1rem' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
