import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../store/slices/roomSlice';
import {
  FaUserFriends,
  FaBed,
  FaRulerCombined,
  FaCheck,
  FaCalendarAlt,
  FaShieldAlt,
  FaLock,
} from 'react-icons/fa';

const sampleRoom = {
  _id: 'sample-room-1',
  name: 'Presidential Royal Suite',
  roomNumber: 'PH-01',
  type: 'Presidential Suite',
  floor: 28,
  capacity: 4,
  bedType: '2 California King Beds',
  size: 1450,
  pricePerNight: 580,
  status: 'available',
  description:
    'Experience unrivaled majesty high above the city skyline. The Presidential Royal Suite features Italian marble flooring, soundproof double-glazed floor-to-ceiling windows, an expansive entertaining salon, private butler bar, deep-soak whirlpool jacuzzi, and panoramic terrace views.',
  amenities: [
    'Private Butler Service 24/7',
    'Deep-Soak Marble Whirlpool Jacuzzi',
    'Panoramic Horizon Skyline Balcony',
    'Custom Nespresso & Artisan Tea Bar',
    'Bang & Olufsen Integrated Surround Sound',
    'Walk-in Dressing Room & In-suite Safe',
    'High-Speed Wi-Fi 6',
    'Egyptian Cotton 800-Thread Count Linens',
  ],
  images: [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  ],
};

const RoomDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRoom } = useSelector((state) => state.rooms);

  const [activeImage, setActiveImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  useEffect(() => {
    if (id) {
      dispatch(fetchRoomById(id));
    }
  }, [dispatch, id]);

  const room = currentRoom || sampleRoom;
  const images = room.images && room.images.length > 0
    ? room.images.map((img) => (typeof img === 'string' ? img : img.url))
    : sampleRoom.images;

  // Calculate nights & pricing
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const basePrice = room.pricePerNight || room.price || 580;
  const roomSubtotal = basePrice * nights;
  const resortFee = 45;
  const tax = Math.round(roomSubtotal * 0.12);
  const grandTotal = roomSubtotal + resortFee + tax;

  const handleProceedToCheckout = () => {
    navigate(
      `/checkout?room=${room._id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&total=${grandTotal}`
    );
  };

  return (
    <div className="room-detail-page py-5" style={{ background: '#fdfbf7', minHeight: '90vh' }}>
      <div className="container">
        {/* Title Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge-gold">{room.type || 'Presidential Suite'}</span>
              <span className="badge badge-available">Ready for Reservation</span>
            </div>
            <h1 className="luxury-heading mb-1" style={{ fontSize: '2.4rem' }}>
              {room.name || `Suite ${room.roomNumber}`}
            </h1>
            <p className="text-muted mb-0">Floor {room.floor || 28} &bull; Room {room.roomNumber || 'PH-01'}</p>
          </div>

          <div className="mt-3 mt-md-0 text-md-end">
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Rate starting from</span>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              ${basePrice}
            </span>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}> / night</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="row g-3 mb-5">
          <div className="col-lg-8">
            <div
              className="rounded-4 overflow-hidden shadow-md"
              style={{ height: '450px', background: '#000' }}
            >
              <img
                src={images[activeImage]}
                alt={room.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="col-lg-4 d-flex flex-column gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-3 overflow-hidden shadow-sm"
                style={{
                  height: '135px',
                  border: activeImage === idx ? '3px solid #c9933e' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt="Suite thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Suite Details & Interactive Booking Calculator */}
        <div className="row g-4">
          {/* Details Column */}
          <div className="col-lg-7">
            {/* Key Specs */}
            <div className="luxury-card p-4 mb-4">
              <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                Key Specifications
              </h4>
              <div className="row g-3 text-secondary" style={{ fontSize: '0.92rem' }}>
                <div className="col-6 col-md-3 d-flex flex-column gap-1">
                  <span className="text-muted small">Capacity</span>
                  <span className="fw-bold text-dark d-flex align-items-center gap-1">
                    <FaUserFriends color="#c9933e" /> {room.capacity || 4} Guests
                  </span>
                </div>
                <div className="col-6 col-md-4 d-flex flex-column gap-1">
                  <span className="text-muted small">Bedding</span>
                  <span className="fw-bold text-dark d-flex align-items-center gap-1">
                    <FaBed color="#c9933e" /> {room.bedType || 'King Bed'}
                  </span>
                </div>
                <div className="col-6 col-md-3 d-flex flex-column gap-1">
                  <span className="text-muted small">Dimensions</span>
                  <span className="fw-bold text-dark d-flex align-items-center gap-1">
                    <FaRulerCombined color="#c9933e" /> {room.size || 1450} sq.ft
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="luxury-card p-4 mb-4">
              <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                Suite Overview
              </h4>
              <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.98rem' }}>{room.description}</p>
            </div>

            {/* Amenities list */}
            <div className="luxury-card p-4">
              <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                Signature Suite Inclusions
              </h4>
              <div className="row g-3">
                {room.amenities?.map((amenity, idx) => (
                  <div key={idx} className="col-md-6 d-flex align-items-center gap-2">
                    <FaCheck color="#10b981" />
                    <span style={{ fontSize: '0.92rem', color: '#1e293b' }}>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking & Price Calculator Column */}
          <div className="col-lg-5">
            <div className="luxury-card p-4 shadow-lg sticky-top" style={{ top: '100px' }}>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <div>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                    ${basePrice}
                  </span>
                  <span className="text-muted small"> / night</span>
                </div>
                <span className="badge badge-gold">Guaranteed Best Rate</span>
              </div>

              {/* Date selection */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">
                    <FaCalendarAlt color="#c9933e" className="me-1" /> Check-in
                  </label>
                  <input
                    type="date"
                    className="luxury-input"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">
                    <FaCalendarAlt color="#c9933e" className="me-1" /> Check-out
                  </label>
                  <input
                    type="date"
                    className="luxury-input"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Guests</label>
                <select
                  className="luxury-input"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[...Array(room.capacity || 4)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="bg-light p-3 rounded-3 mb-4">
                <div className="d-flex justify-content-between text-secondary mb-2" style={{ fontSize: '0.9rem' }}>
                  <span>
                    ${basePrice} &times; {nights} night{nights > 1 ? 's' : ''}
                  </span>
                  <span>${roomSubtotal}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary mb-2" style={{ fontSize: '0.9rem' }}>
                  <span>Hospitality & Resort Fee</span>
                  <span>${resortFee}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary mb-2" style={{ fontSize: '0.9rem' }}>
                  <span>Taxes & Tourism Surcharges (12%)</span>
                  <span>${tax}</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                  <span>Estimated Total</span>
                  <span style={{ color: '#0f172a' }}>${grandTotal}</span>
                </div>
              </div>

              <button
                className="btn-gold w-100 py-3 justify-content-center"
                style={{ fontSize: '1rem' }}
                onClick={handleProceedToCheckout}
              >
                <FaLock size={14} className="me-1" /> Proceed to Instant Booking
              </button>

              <div className="d-flex align-items-center justify-content-center gap-2 mt-3 text-muted small">
                <FaShieldAlt color="#10b981" />
                <span>Zero charge until confirmation &bull; 256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
