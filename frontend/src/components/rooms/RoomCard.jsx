import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaBed, FaRulerCombined, FaCheck } from 'react-icons/fa';

const RoomCard = ({ room }) => {
  if (!room) return null;

  const defaultImage =
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';
  const displayImage =
    room.images && room.images.length > 0
      ? typeof room.images[0] === 'string'
        ? room.images[0]
        : room.images[0].url
      : defaultImage;

  const isAvailable = room.status === 'available' || !room.status;

  return (
    <div className="luxury-card h-100 d-flex flex-column">
      <div className="position-relative" style={{ height: '210px', overflow: 'hidden' }}>
        <img
          src={displayImage}
          alt={room.roomNumber ? `Room ${room.roomNumber}` : room.type}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        />

        <div className="position-absolute top-0 start-0 m-3">
          <span className={`badge ${isAvailable ? 'badge-available' : 'badge-occupied'}`}>
            {isAvailable ? 'Available' : room.status || 'Booked'}
          </span>
        </div>

        <div
          className="position-absolute bottom-0 end-0 m-3 px-2 py-1 rounded"
          style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#fff' }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'capitalize', fontWeight: 600 }}>
            {room.type || 'Deluxe Suite'}
          </span>
        </div>
      </div>

      <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h4 className="luxury-heading mb-0" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {room.name || `Room ${room.roomNumber || '101'}`}
            </h4>
            <span className="badge-gold">Floor {room.floor || 1}</span>
          </div>

          <p
            className="text-muted mt-2"
            style={{
              fontSize: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {room.description ||
              'A beautifully appointed luxury suite featuring high-thread linens, soundproofing, and panoramic city vistas.'}
          </p>

          {/* Features spec line */}
          <div className="d-flex align-items-center gap-3 my-3 text-secondary" style={{ fontSize: '0.82rem' }}>
            <div className="d-flex align-items-center gap-1">
              <FaUserFriends color="#c9933e" />
              <span>Up to {room.capacity || 2} guests</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <FaBed color="#c9933e" />
              <span>{room.bedType || 'King Bed'}</span>
            </div>
            {room.size && (
              <div className="d-flex align-items-center gap-1">
                <FaRulerCombined color="#c9933e" />
                <span>{room.size} sq.ft</span>
              </div>
            )}
          </div>

          {/* Amenities pill tags */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="d-flex flex-wrap gap-1 mb-3">
              {room.amenities.slice(0, 3).map((item, idx) => (
                <span
                  key={idx}
                  className="badge"
                  style={{
                    backgroundColor: '#f8fafc',
                    color: '#64748b',
                    fontSize: '0.72rem',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <FaCheck size={10} color="#10b981" className="me-1" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 border-top d-flex align-items-center justify-content-between mt-2">
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              ${room.pricePerNight || room.price || 249}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}> / night</span>
          </div>

          <div className="d-flex gap-2">
            <Link to={`/rooms/${room._id}`} className="btn-luxury-outline py-2 px-3" style={{ fontSize: '0.82rem' }}>
              Details
            </Link>
            {isAvailable && (
              <Link to={`/checkout?room=${room._id}`} className="btn-gold py-2 px-3" style={{ fontSize: '0.82rem' }}>
                Book Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
