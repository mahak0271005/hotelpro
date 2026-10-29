import React from 'react';
import { Link } from 'react-router-dom';
import { FaHotel, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaAward, FaHeadset } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#0a0f1d',
        color: '#94a3b8',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '60px',
        paddingBottom: '30px',
      }}
    >
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand & mission */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3 text-white">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #d4a04e 0%, #b8822e 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FaHotel size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                HOTEL<span style={{ color: '#d4a04e' }}>PRO</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#94a3b8' }}>
              Your ultimate hospitality management solution. Streamlining operations with enterprise-grade security,
              instant reservations, guest management, and frictionless payment processing worldwide.
            </p>
            <div className="d-flex align-items-center gap-3 mt-3 text-white">
              <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
                <FaShieldAlt color="#d4a04e" /> 256-Bit SSL Secured
              </div>
              <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
                <FaAward color="#d4a04e" /> ISO Certified
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3" style={{ fontSize: '1rem', fontWeight: 700 }}>
              Navigation
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
              <li>
                <Link to="/hotels" className="text-secondary hover-gold">
                  Explore Hotels
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-secondary hover-gold">
                  Suites & Rooms
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-secondary hover-gold">
                  Concierge Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary hover-gold">
                  About HotelPro
                </Link>
              </li>
            </ul>
          </div>

          {/* Hospitality Management */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3" style={{ fontSize: '1rem', fontWeight: 700 }}>
              Hospitality Portal
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
              <li>
                <Link to="/login" className="text-secondary hover-gold">
                  Staff & Admin Sign In
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-secondary hover-gold">
                  Manage Reservations
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-secondary hover-gold">
                  Guest Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary hover-gold">
                  Terms of Hospitality
                </Link>
              </li>
            </ul>
          </div>

          {/* 24/7 Concierge Support */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3" style={{ fontSize: '1rem', fontWeight: 700 }}>
              24/7 Concierge Desk
            </h5>
            <div className="d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
              <div className="d-flex align-items-center gap-2">
                <FaPhoneAlt color="#d4a04e" />
                <span>+1 (800) 468-3577</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope color="#d4a04e" />
                <span>concierge@hotelpro.com</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt color="#d4a04e" />
                <span>One Grand Plaza, Suites 100-108, NY</span>
              </div>
              <div className="mt-2 p-2 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-white fw-bold d-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
                  <FaHeadset color="#10b981" /> Live Support Always Active
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 pt-2">
          <small style={{ color: '#64748b' }}>
            &copy; {new Date().getFullYear()} HotelPro Hospitality Management System. All rights reserved.
          </small>
          <div className="d-flex gap-3" style={{ fontSize: '0.8rem' }}>
            <span className="text-muted">High Security Encrypted</span>
            <span className="text-muted">&bull;</span>
            <span className="text-muted">Instant Booking Confirmation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
