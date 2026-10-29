import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings, cancelBooking } from '../store/slices/bookingSlice';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaQrcode,
  FaCrown,
  FaReceipt,
  FaKey,
} from 'react-icons/fa';

const sampleBookingsFallback = [
  {
    _id: 'bk-1001',
    bookingNumber: 'HP-82910',
    hotel: { name: 'The Grand Heritage Palace' },
    room: { name: 'Presidential Royal Suite', roomNumber: 'PH-01', pricePerNight: 580 },
    checkInDate: '2026-11-05',
    checkOutDate: '2026-11-08',
    guests: { adults: 2, children: 0 },
    totalAmount: 1980,
    status: 'confirmed',
    paymentStatus: 'paid',
  },
  {
    _id: 'bk-1002',
    bookingNumber: 'HP-47120',
    hotel: { name: 'Azure Coastline Sanctuary' },
    room: { name: 'Executive Oceanfront Villa', roomNumber: 'V-12', pricePerNight: 390 },
    checkInDate: '2026-10-12',
    checkOutDate: '2026-10-15',
    guests: { adults: 2, children: 0 },
    totalAmount: 1350,
    status: 'completed',
    paymentStatus: 'paid',
  },
];

const GuestDashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.bookings);

  const [activeTab, setActiveTab] = useState('upcoming');
  const [digitalKeyModal, setDigitalKeyModal] = useState(null);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const activeBookings = bookings && bookings.length > 0 ? bookings : sampleBookingsFallback;

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you wish to cancel this reservation? Free cancellation applies.')) {
      dispatch(cancelBooking({ id: bookingId, reason: 'Guest cancelled from dashboard' }));
    }
  };

  return (
    <div className="guest-dashboard py-5" style={{ background: '#fdfbf7', minHeight: '88vh' }}>
      <div className="container">
        {/* Welcome Banner */}
        <div
          className="luxury-card p-4 p-md-5 mb-5 text-white position-relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge badge-gold d-inline-flex align-items-center gap-1">
                  <FaCrown size={12} /> Elite Diamond Tier
                </span>
                <span className="text-muted small">&bull; 4,850 Hospitality Reward Points</span>
              </div>
              <h1 className="luxury-heading text-white mb-2" style={{ fontSize: '2.2rem' }}>
                Welcome, {user?.firstName || 'Distinguished Guest'}
              </h1>
              <p className="text-light mb-0 small" style={{ maxWidth: '600px', lineHeight: 1.6 }}>
                Manage your active itineraries, access mobile contactless room keys, and view historical billing invoices anytime.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <a href="/rooms" className="btn-gold">
                + Book Another Suite
              </a>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="luxury-heading mb-0" style={{ fontSize: '1.6rem' }}>
            My Reservations & Stays
          </h2>
          <div className="btn-group">
            <button
              className={`btn btn-sm ${activeTab === 'upcoming' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Active & Upcoming
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'all' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setActiveTab('all')}
            >
              All History
            </button>
          </div>
        </div>

        {activeBookings.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {activeBookings.map((b) => {
              const isPast = b.status === 'completed' || b.status === 'cancelled';
              if (activeTab === 'upcoming' && isPast) return null;

              return (
                <div key={b._id} className="luxury-card p-4">
                  <div className="row align-items-center g-3">
                    <div className="col-lg-4">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-bold" style={{ fontSize: '0.85rem', color: '#c9933e' }}>
                          #{b.bookingNumber || b._id.substring(0, 8).toUpperCase()}
                        </span>
                        <span
                          className={`badge ${
                            b.status === 'confirmed'
                              ? 'badge-available'
                              : b.status === 'completed'
                              ? 'bg-secondary'
                              : 'badge-occupied'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <h4 className="luxury-heading mb-1" style={{ fontSize: '1.15rem' }}>
                        {b.room?.name || 'Luxury Suite'}
                      </h4>
                      <span className="text-muted small">
                        {b.hotel?.name || 'The Grand Heritage Palace'} &bull; Room {b.room?.roomNumber || 'PH-01'}
                      </span>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="d-flex flex-column gap-1">
                        <span className="text-muted small d-flex align-items-center gap-1">
                          <FaCalendarAlt color="#c9933e" /> Itinerary
                        </span>
                        <span className="small fw-bold text-dark">
                          {b.checkInDate ? new Date(b.checkInDate).toLocaleDateString() : 'Nov 5, 2026'} &rarr;{' '}
                          {b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString() : 'Nov 8, 2026'}
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-2 col-6">
                      <div className="d-flex flex-column gap-1">
                        <span className="text-muted small">Total Paid</span>
                        <span className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                          ${b.totalAmount || 1980}
                        </span>
                        <span className="badge bg-success-subtle text-success small">Verified Paid</span>
                      </div>
                    </div>

                    <div className="col-lg-3 text-lg-end d-flex flex-wrap gap-2 justify-content-lg-end">
                      {b.status === 'confirmed' && (
                        <>
                          <button
                            className="btn btn-sm btn-dark d-flex align-items-center gap-1"
                            onClick={() => setDigitalKeyModal(b)}
                          >
                            <FaKey color="#d4a04e" /> Mobile Key
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancel(b._id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                        onClick={() => alert(`Receipt for #${b.bookingNumber || b._id} generated.`)}
                      >
                        <FaReceipt /> Receipt
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="luxury-card p-5 text-center">
            <h4 className="luxury-heading mb-2">No Active Reservations</h4>
            <p className="text-muted">You do not have any pending hotel reservations right now.</p>
            <a href="/rooms" className="btn-gold">
              Explore Available Rooms
            </a>
          </div>
        )}

        {/* Digital Key / QR Check-in Modal */}
        {digitalKeyModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.7)', zIndex: 2000 }}
          >
            <div className="glass-panel p-4 rounded-4 shadow-xl text-center" style={{ maxWidth: '380px' }}>
              <div className="mb-3">
                <FaKey size={32} color="#c9933e" />
                <h4 className="luxury-heading mt-2 mb-1">Express Mobile Key</h4>
                <p className="text-muted small">
                  Hold your device near the smart door lock for Room{' '}
                  <strong>{digitalKeyModal.room?.roomNumber || 'PH-01'}</strong>.
                </p>
              </div>

              {/* QR Code Mock */}
              <div
                className="p-3 bg-white rounded-3 border mx-auto mb-3 d-flex flex-column align-items-center justify-content-center"
                style={{ width: '180px', height: '180px' }}
              >
                <FaQrcode size={120} color="#0f172a" />
                <span className="small text-muted mt-1 fw-bold">#{digitalKeyModal.bookingNumber}</span>
              </div>

              <div className="alert alert-success py-2 small mb-3">
                <FaCheckCircle className="me-1" /> Bluetooth NFC Lock Active
              </div>

              <button className="btn btn-dark w-100" onClick={() => setDigitalKeyModal(null)}>
                Close Key
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestDashboardPage;
