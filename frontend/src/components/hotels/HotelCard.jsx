import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const HotelCard = ({ hotel }) => {
  if (!hotel) return null;

  const defaultImage =
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
  const displayImage =
    hotel.images && hotel.images.length > 0
      ? typeof hotel.images[0] === 'string'
        ? hotel.images[0]
        : hotel.images[0].url
      : defaultImage;

  const rating = hotel.ratingsAverage || hotel.starRating || 4.8;
  const reviewCount = hotel.ratingsQuantity || 124;

  return (
    <div className="luxury-card h-100 d-flex flex-column">
      <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
        <img
          src={displayImage}
          alt={hotel.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        />
        <div
          className="position-absolute top-0 end-0 m-3 d-flex align-items-center gap-1 px-2 py-1 rounded"
          style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#fbbf24' }}
        >
          <FaStar size={13} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{rating.toFixed(1)}</span>
          <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>({reviewCount})</span>
        </div>

        {hotel.starRating && (
          <div
            className="position-absolute bottom-0 start-0 m-3 px-2 py-1 rounded badge-gold"
            style={{ fontSize: '0.75rem', fontWeight: 700 }}
          >
            {hotel.starRating} Star Luxury
          </div>
        )}
      </div>

      <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between">
        <div>
          <div className="d-flex align-items-center gap-1 text-muted mb-1" style={{ fontSize: '0.85rem' }}>
            <FaMapMarkerAlt color="#c9933e" />
            <span>
              {hotel.address?.city || 'Downtown'}, {hotel.address?.country || 'USA'}
            </span>
          </div>

          <h4 className="luxury-heading mb-2" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {hotel.name}
          </h4>

          <p
            className="text-muted"
            style={{
              fontSize: '0.88rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {hotel.description ||
              'Experience sophisticated hospitality, world-class amenities, and exquisite comfort in the heart of the city.'}
          </p>

          {/* Quick amenities preview */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {hotel.amenities.slice(0, 3).map((item, idx) => (
                <span
                  key={idx}
                  className="badge"
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    padding: '5px 9px',
                  }}
                >
                  {item}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="text-muted" style={{ fontSize: '0.75rem', alignSelf: 'center' }}>
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        <div className="pt-3 border-top d-flex align-items-center justify-content-between mt-2">
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>From</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              ${hotel.basePrice || hotel.startingPrice || 189}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}> / night</span>
          </div>

          <Link to={`/hotels/${hotel._id}`} className="btn-luxury-outline" style={{ fontSize: '0.85rem' }}>
            View Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
