import React from 'react';
import { FaShieldAlt, FaAward, FaCrown, FaCheckCircle } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page py-5" style={{ background: '#fdfbf7', minHeight: '88vh' }}>
      <div className="container">
        {/* Hero Banner */}
        <div className="text-center mb-5">
          <span className="badge-gold">Heritage & Innovation</span>
          <h1 className="luxury-heading mt-2 mb-3" style={{ fontSize: '2.6rem' }}>
            The Essence of HotelPro
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '680px', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Born from an obsession with effortless sophistication, HotelPro converges old-world hospitality
            with cutting-edge digital management architecture.
          </p>
        </div>

        {/* Narrative & Pillars */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden shadow-lg" style={{ height: '400px' }}>
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                alt="HotelPro Architecture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <h2 className="luxury-heading mb-3" style={{ fontSize: '2rem' }}>
              Setting the Gold Standard for Modern Hospitality
            </h2>
            <p className="text-muted" style={{ lineHeight: 1.8 }}>
              At HotelPro, we believe true luxury lies in the unseen details. In today's fast-paced world,
              handling guest check-ins, reservations, and real-time inventory must be instantaneous, private,
              and completely frictionless.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.8 }}>
              Our platform empowers hoteliers, staff, and guests alike with real-time room availability,
              encrypted payment processing, and contactless digital room key technology across properties worldwide.
            </p>

            <div className="row g-3 mt-2">
              <div className="col-6 d-flex align-items-center gap-2">
                <FaCheckCircle color="#10b981" />
                <span className="fw-bold small text-dark">ISO 27001 Security Standard</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <FaCheckCircle color="#10b981" />
                <span className="fw-bold small text-dark">Instant Mobile Digital Keys</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <FaCheckCircle color="#10b981" />
                <span className="fw-bold small text-dark">Bespoke 24/7 Concierge</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <FaCheckCircle color="#10b981" />
                <span className="fw-bold small text-dark">100% Encrypted Transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="luxury-card p-4 h-100">
              <FaShieldAlt size={32} color="#c9933e" className="mb-3" />
              <h4 className="luxury-heading mb-2">Uncompromising Privacy</h4>
              <p className="text-muted small mb-0">
                End-to-end encrypted guest data and booking telemetry ensuring complete discretion for every traveler.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="luxury-card p-4 h-100">
              <FaCrown size={32} color="#c9933e" className="mb-3" />
              <h4 className="luxury-heading mb-2">Peerless Excellence</h4>
              <p className="text-muted small mb-0">
                Every suite, butler service, and amenity is meticulously audited against international five-star hospitality standards.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="luxury-card p-4 h-100">
              <FaAward size={32} color="#c9933e" className="mb-3" />
              <h4 className="luxury-heading mb-2">Real-Time Fluidity</h4>
              <p className="text-muted small mb-0">
                Zero waiting at the front desk. Enjoy express contactless check-in directly through your smartphone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
