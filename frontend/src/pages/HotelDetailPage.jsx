import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotelById } from '../store/slices/hotelSlice';
import { fetchRooms } from '../store/slices/roomSlice';
import RoomCard from '../components/rooms/RoomCard';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaStar,
  FaCheckCircle,
} from 'react-icons/fa';

const sampleHotel = {
  _id: 'sample-hotel-1',
  name: 'The Grand Heritage Palace',
  description:
    'Standing as a timeless monument of classical grandeur, The Grand Heritage Palace offers an escape into regal luxury. Experience bespoke 24-hour butler services, private waterfront views, a heated indoor Roman bath, and Michelin-starred dining overseen by renowned master chefs.',
  starRating: 5,
  ratingsAverage: 4.9,
  ratingsQuantity: 320,
  address: {
    street: '740 Park Avenue',
    city: 'Manhattan, New York',
    state: 'NY',
    zipCode: '10021',
    country: 'United States',
  },
  contact: {
    phone: '+1 (212) 555-0199',
    email: 'reservations@grandheritagepalace.com',
  },
  amenities: [
    '24/7 Private Butler',
    'Michelin-Star Fine Dining',
    'Heated Roman Bath & Spa',
    'Valet & Chauffeur Services',
    'High-Speed Wi-Fi 6',
    'Rooftop Helipad & Lounge',
    'Private Wine Cellar Tasting',
    'State-of-the-art Fitness Studio',
  ],
  images: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  ],
};

const sampleRooms = [
  {
    _id: 'room-1',
    name: 'Presidential Royal Suite',
    roomNumber: 'PH-01',
    type: 'Presidential Suite',
    floor: 28,
    capacity: 4,
    bedType: '2 California King Beds',
    size: 1450,
    pricePerNight: 580,
    status: 'available',
    description: 'Opulent penthouse suite with sweeping 360-degree skyline views, marble jacuzzi bath, and private lounge.',
    amenities: ['Panoramic View', 'Jacuzzi', 'Espresso Bar', 'Soundproofed'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'room-2',
    name: 'Executive Horizon Suite',
    roomNumber: '2104',
    type: 'Executive Suite',
    floor: 21,
    capacity: 2,
    bedType: '1 King Bed',
    size: 780,
    pricePerNight: 320,
    status: 'available',
    description: 'Designed for discerning travelers featuring ergonomic workspace, Italian leather furnishings, and rainforest shower.',
    amenities: ['City View', 'Work Station', 'Rain Shower', 'High-Speed Wi-Fi'],
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'],
  },
];

const HotelDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentHotel } = useSelector((state) => state.hotels);
  const { rooms } = useSelector((state) => state.rooms);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchHotelById(id));
      dispatch(fetchRooms({ hotel: id }));
    }
  }, [dispatch, id]);

  const hotel = currentHotel || sampleHotel;
  const hotelRooms = rooms && rooms.length > 0 ? rooms : sampleRooms;

  const images = hotel.images && hotel.images.length > 0
    ? hotel.images.map((img) => (typeof img === 'string' ? img : img.url))
    : sampleHotel.images;

  return (
    <div className="hotel-detail-page py-5" style={{ background: '#fdfbf7', minHeight: '90vh' }}>
      <div className="container">
        {/* Title & Location Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge-gold">{hotel.starRating || 5} Star Luxury</span>
              <div className="d-flex align-items-center gap-1 text-warning" style={{ fontSize: '0.9rem' }}>
                <FaStar />
                <span className="fw-bold text-dark">{hotel.ratingsAverage || 4.9}</span>
                <span className="text-muted small">({hotel.ratingsQuantity || 320} reviews)</span>
              </div>
            </div>

            <h1 className="luxury-heading mb-2" style={{ fontSize: '2.4rem' }}>
              {hotel.name}
            </h1>

            <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.95rem' }}>
              <FaMapMarkerAlt color="#c9933e" />
              <span>
                {hotel.address?.street ? `${hotel.address.street}, ` : ''}
                {hotel.address?.city || 'New York'}, {hotel.address?.country || 'USA'}
              </span>
            </div>
          </div>

          <div className="mt-3 mt-md-0 d-flex flex-column align-items-md-end gap-2">
            <a href="#available-rooms" className="btn-gold px-4 py-2">
              View Available Suites
            </a>
            <div className="text-muted small d-flex gap-3">
              <span>
                <FaPhoneAlt color="#c9933e" className="me-1" />
                {hotel.contact?.phone || '+1 (212) 555-0199'}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="row g-3 mb-5">
          <div className="col-lg-8">
            <div
              className="rounded-4 overflow-hidden shadow-md position-relative"
              style={{ height: '460px', background: '#000' }}
            >
              <img
                src={images[activeImageIndex]}
                alt={hotel.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="col-lg-4 d-flex flex-column gap-3">
            {images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                className="rounded-3 overflow-hidden shadow-sm position-relative cursor-pointer"
                style={{
                  height: '140px',
                  border: activeImageIndex === idx + 1 ? '3px solid #c9933e' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveImageIndex(idx + 1)}
              >
                <img src={img} alt="Hotel preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Details & Amenities Grid */}
        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <div className="luxury-card p-4 mb-4">
              <h3 className="luxury-heading mb-3" style={{ fontSize: '1.4rem' }}>
                About the Hotel
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.98rem' }}>{hotel.description}</p>
            </div>

            <div className="luxury-card p-4">
              <h3 className="luxury-heading mb-3" style={{ fontSize: '1.4rem' }}>
                Featured Property Amenities
              </h3>
              <div className="row g-3">
                {hotel.amenities?.map((amenity, idx) => (
                  <div key={idx} className="col-md-6 d-flex align-items-center gap-2">
                    <FaCheckCircle color="#10b981" />
                    <span style={{ fontSize: '0.92rem', color: '#1e293b', fontWeight: 500 }}>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Policy Sidebar */}
          <div className="col-lg-4">
            <div className="luxury-card p-4">
              <h4 className="luxury-heading mb-3" style={{ fontSize: '1.2rem' }}>
                Reservation Policies
              </h4>
              <ul className="list-unstyled d-flex flex-column gap-3 text-secondary small">
                <li className="d-flex justify-content-between border-bottom pb-2">
                  <span className="fw-bold text-dark">Check-in:</span>
                  <span>From 3:00 PM</span>
                </li>
                <li className="d-flex justify-content-between border-bottom pb-2">
                  <span className="fw-bold text-dark">Check-out:</span>
                  <span>Until 12:00 PM (Noon)</span>
                </li>
                <li className="d-flex justify-content-between border-bottom pb-2">
                  <span className="fw-bold text-dark">Cancellation:</span>
                  <span>Free up to 48 hrs before</span>
                </li>
                <li className="d-flex justify-content-between border-bottom pb-2">
                  <span className="fw-bold text-dark">Pet Policy:</span>
                  <span>Luxury pet suite on request</span>
                </li>
              </ul>

              <div className="p-3 rounded mt-4" style={{ background: '#f1f5f9' }}>
                <h6 className="fw-bold mb-1" style={{ fontSize: '0.88rem' }}>
                  Need Personal Concierge Assistance?
                </h6>
                <p className="text-muted small mb-2">Our concierge desk is ready 24/7 for custom requests.</p>
                <a
                  href={`mailto:${hotel.contact?.email || 'concierge@hotelpro.com'}`}
                  className="btn-luxury-outline w-100 justify-content-center py-2"
                  style={{ fontSize: '0.82rem' }}
                >
                  <FaEnvelope className="me-1" /> Contact Concierge
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Available Rooms Section */}
        <div id="available-rooms" className="pt-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge-gold">Rooms & Suites</span>
              <h2 className="luxury-heading mt-2" style={{ fontSize: '2rem' }}>
                Available Accommodations
              </h2>
            </div>
          </div>

          <div className="row g-4">
            {hotelRooms.map((room) => (
              <div key={room._id} className="col-lg-4 col-md-6">
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
