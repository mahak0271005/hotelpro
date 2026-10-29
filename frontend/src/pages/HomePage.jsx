import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from '../store/slices/hotelSlice';
import { fetchRooms } from '../store/slices/roomSlice';
import HotelCard from '../components/hotels/HotelCard';
import RoomCard from '../components/rooms/RoomCard';
import {
  FaSearch,
  FaCalendarAlt,
  FaUserFriends,
  FaShieldAlt,
  FaConciergeBell,
  FaCreditCard,
  FaAward,
  FaStar,
} from 'react-icons/fa';

const sampleHotelsFallback = [
  {
    _id: 'sample-hotel-1',
    name: 'The Grand Heritage Palace',
    description: 'An architectural icon nestled on the waterfront offering five-star dining, bespoke butler service, and sprawling gardens.',
    starRating: 5,
    ratingsAverage: 4.9,
    ratingsQuantity: 320,
    address: { city: 'Manhattan, New York', country: 'USA' },
    startingPrice: 380,
    amenities: ['Private Butler', 'Michelin Star Dining', 'Infinity Spa', 'Valet Parking'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'sample-hotel-2',
    name: 'Azure Coastline Sanctuary',
    description: 'Unwind at this seaside retreat featuring panoramic ocean suites, private beachfront cabanas, and world-class wellness therapy.',
    starRating: 5,
    ratingsAverage: 4.8,
    ratingsQuantity: 215,
    address: { city: 'Miami Beach, Florida', country: 'USA' },
    startingPrice: 295,
    amenities: ['Oceanfront Pool', 'Yacht Charter', 'Private Beach', 'Cocktail Lounge'],
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'sample-hotel-3',
    name: 'Aspen Alpine Chalet & Resort',
    description: 'A cozy yet luxurious mountain sanctuary offering ski-in/ski-out privileges, stone fireplaces, and heated outdoor mineral pools.',
    starRating: 5,
    ratingsAverage: 4.9,
    ratingsQuantity: 188,
    address: { city: 'Aspen, Colorado', country: 'USA' },
    startingPrice: 420,
    amenities: ['Ski Valet', 'Heated Mineral Pool', 'Fireplace Suites', 'Fine Dining'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'],
  },
];

const sampleRoomsFallback = [
  {
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
    description: 'Opulent penthouse suite with sweeping 360-degree skyline views, marble jacuzzi bath, and private lounge.',
    amenities: ['Panoramic View', 'Jacuzzi', 'Espresso Bar', 'Soundproofed'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'sample-room-2',
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
    amenities: ['Ocean View', 'Work Station', 'Rain Shower', 'High-Speed Wi-Fi'],
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'sample-room-3',
    name: 'Garden Terrace Deluxe Room',
    roomNumber: '402',
    type: 'Deluxe Room',
    floor: 4,
    capacity: 2,
    bedType: '1 Queen Bed',
    size: 520,
    pricePerNight: 210,
    status: 'available',
    description: 'Charming modern room overlooking lush botanical courtyards with a private furnished sun terrace.',
    amenities: ['Private Terrace', 'Smart TV', 'Mini Bar', 'Plush Robes'],
    images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'],
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels } = useSelector((state) => state.hotels);
  const { rooms } = useSelector((state) => state.rooms);

  const [searchLocation, setSearchLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');

  useEffect(() => {
    dispatch(fetchHotels({ limit: 3 }));
    dispatch(fetchRooms({ limit: 3 }));
  }, [dispatch]);

  const displayedHotels = hotels && hotels.length > 0 ? hotels.slice(0, 3) : sampleHotelsFallback;
  const displayedRooms = rooms && rooms.length > 0 ? rooms.slice(0, 3) : sampleRoomsFallback;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/rooms?city=${encodeURIComponent(searchLocation)}&guests=${guests}`);
  };

  return (
    <div className="home-page">
      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section
        className="position-relative d-flex align-items-center text-white"
        style={{
          minHeight: '88vh',
          background: `linear-gradient(180deg, rgba(15, 23, 42, 0.72) 0%, rgba(15, 23, 42, 0.92) 100%), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85') center/cover no-repeat`,
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <span
                className="badge badge-gold px-3 py-2 mb-3 text-uppercase"
                style={{ letterSpacing: '0.15em', fontSize: '0.8rem' }}
              >
                World-Class Hospitality Management
              </span>

              <h1
                className="display-3 fw-bold mb-3 text-white luxury-heading"
                style={{ letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                Experience Modern Luxury <br />
                <span style={{ color: '#d4a04e' }}>Crafted for Perfection</span>
              </h1>

              <p
                className="lead mx-auto mb-5 text-light"
                style={{ maxWidth: '720px', fontSize: '1.2rem', lineHeight: 1.7 }}
              >
                Streamlining high-end hospitality with real-time room availability, contactless express check-in,
                and frictionless enterprise-grade reservations.
              </p>

              {/* Booking & Search Bar */}
              <div
                className="glass-panel p-3 p-md-4 rounded-4 shadow-xl text-start"
                style={{ maxWidth: '1000px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.95)' }}
              >
                <form onSubmit={handleSearch} className="row g-3 align-items-end">
                  {/* Destination */}
                  <div className="col-md-3">
                    <label className="form-label text-muted small fw-bold text-uppercase d-flex align-items-center gap-1 mb-1">
                      <FaSearch color="#c9933e" /> Destination / Hotel
                    </label>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g. New York, Miami, Aspen"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>

                  {/* Check-in */}
                  <div className="col-md-3 col-6">
                    <label className="form-label text-muted small fw-bold text-uppercase d-flex align-items-center gap-1 mb-1">
                      <FaCalendarAlt color="#c9933e" /> Check-in
                    </label>
                    <input
                      type="date"
                      className="luxury-input"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>

                  {/* Check-out */}
                  <div className="col-md-3 col-6">
                    <label className="form-label text-muted small fw-bold text-uppercase d-flex align-items-center gap-1 mb-1">
                      <FaCalendarAlt color="#c9933e" /> Check-out
                    </label>
                    <input
                      type="date"
                      className="luxury-input"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>

                  {/* Guests & Submit */}
                  <div className="col-md-3 d-flex gap-2">
                    <div style={{ flex: '1' }}>
                      <label className="form-label text-muted small fw-bold text-uppercase d-flex align-items-center gap-1 mb-1">
                        <FaUserFriends color="#c9933e" /> Guests
                      </label>
                      <select
                        className="luxury-input"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4+ Guests</option>
                      </select>
                    </div>

                    <div style={{ alignSelf: 'flex-end' }}>
                      <button type="submit" className="btn-gold py-2 px-3 h-100" style={{ height: '45px' }}>
                        <FaSearch /> Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Highlights / Value Proposition ────────────────────────────────────── */}
      <section className="py-5" style={{ background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="p-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 60, height: 60, background: 'rgba(201, 147, 62, 0.12)' }}
                >
                  <FaShieldAlt size={26} color="#c9933e" />
                </div>
                <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>
                  256-Bit Protection
                </h5>
                <p className="text-muted small mb-0">Bank-level encryption protecting guest data & payments.</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="p-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 60, height: 60, background: 'rgba(201, 147, 62, 0.12)' }}
                >
                  <FaConciergeBell size={26} color="#c9933e" />
                </div>
                <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>
                  24/7 Digital Concierge
                </h5>
                <p className="text-muted small mb-0">Instant room service requests & responsive housekeeping.</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="p-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 60, height: 60, background: 'rgba(201, 147, 62, 0.12)' }}
                >
                  <FaCreditCard size={26} color="#c9933e" />
                </div>
                <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>
                  Frictionless Checkout
                </h5>
                <p className="text-muted small mb-0">Secure multiple-gateway transactions with instant invoices.</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="p-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 60, height: 60, background: 'rgba(201, 147, 62, 0.12)' }}
                >
                  <FaAward size={26} color="#c9933e" />
                </div>
                <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>
                  Guaranteed Luxury
                </h5>
                <p className="text-muted small mb-0">Hand-curated five-star suites matching the highest hospitality standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Hotels Section ─────────────────────────────────────────── */}
      <section className="py-5">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="badge-gold">Iconic Destinations</span>
              <h2 className="luxury-heading mt-2 mb-1" style={{ fontSize: '2.2rem' }}>
                Featured Signature Hotels
              </h2>
              <p className="text-muted mb-0">Discover exceptional stays curated for unparalleled sophistication.</p>
            </div>
            <Link to="/hotels" className="btn-luxury-outline mt-3 mt-md-0">
              View All Hotels &rarr;
            </Link>
          </div>

          <div className="row g-4">
            {displayedHotels.map((hotel) => (
              <div key={hotel._id} className="col-lg-4 col-md-6">
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Suites Section ─────────────────────────────────────────── */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="badge-gold">Handcrafted Comfort</span>
              <h2 className="luxury-heading mt-2 mb-1" style={{ fontSize: '2.2rem' }}>
                Signature Suites & Penthouses
              </h2>
              <p className="text-muted mb-0">Every room is designed with exquisite finishes, king beds, and serene vistas.</p>
            </div>
            <Link to="/rooms" className="btn-luxury-outline mt-3 mt-md-0">
              Browse All Suites &rarr;
            </Link>
          </div>

          <div className="row g-4">
            {displayedRooms.map((room) => (
              <div key={room._id} className="col-lg-4 col-md-6">
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Guest Testimonials ──────────────────────────────────────────────── */}
      <section className="py-5" style={{ background: '#ffffff' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge-gold">Verified Experiences</span>
            <h2 className="luxury-heading mt-2" style={{ fontSize: '2.2rem' }}>
              What Our Distinguished Guests Say
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 h-100 rounded-4 border bg-light d-flex flex-column justify-content-between shadow-sm">
                <div>
                  <div className="d-flex text-warning mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-secondary fst-italic" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    "HotelPro completely transformed how we book our retreats. From the effortless express check-in to
                    the pristine presidential suite, the experience was genuinely world-class."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 mt-3 pt-3 border-top">
                  <div
                    className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 44, height: 44 }}
                  >
                    EM
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Eleanor Montgomery</h6>
                    <small className="text-muted">Executive Traveler, London</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 h-100 rounded-4 border bg-light d-flex flex-column justify-content-between shadow-sm">
                <div>
                  <div className="d-flex text-warning mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-secondary fst-italic" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    "The operational efficiency is astounding. As a hotel owner myself, seeing this level of seamless
                    real-time availability and encrypted payment security gives complete peace of mind."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 mt-3 pt-3 border-top">
                  <div
                    className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 44, height: 44 }}
                  >
                    DK
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">David Kensington</h6>
                    <small className="text-muted">Hospitality Consultant, Zurich</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 h-100 rounded-4 border bg-light d-flex flex-column justify-content-between shadow-sm">
                <div>
                  <div className="d-flex text-warning mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-secondary fst-italic" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    "The contactless QR check-in feature allowed us to settle into our ocean view suite within minutes
                    of landing in Miami. Truly flawless hospitality."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 mt-3 pt-3 border-top">
                  <div
                    className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 44, height: 44 }}
                  >
                    SL
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Sophia Laurent</h6>
                    <small className="text-muted">Leisure Guest, Paris</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section
        className="py-5 text-white text-center position-relative"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="container py-4">
          <h2 className="luxury-heading text-white mb-3" style={{ fontSize: '2.4rem' }}>
            Ready for an Unforgettable Stay?
          </h2>
          <p className="lead mx-auto mb-4 text-light" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
            Book direct for guaranteed best rates, complimentary room upgrades when available, and personalized butler services.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/rooms" className="btn-gold px-4 py-3" style={{ fontSize: '0.95rem' }}>
              Explore Available Suites
            </Link>
            <Link to="/hotels" className="btn-luxury-outline px-4 py-3" style={{ fontSize: '0.95rem' }}>
              View Our Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
