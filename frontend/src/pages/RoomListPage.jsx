import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/slices/roomSlice';
import RoomCard from '../components/rooms/RoomCard';
import { FaSearch, FaTimes } from 'react-icons/fa';

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
  {
    _id: 'sample-room-4',
    name: 'Penthouse Panorama Loft',
    roomNumber: 'PH-04',
    type: 'Penthouse Suite',
    floor: 30,
    capacity: 4,
    bedType: '2 King Beds',
    size: 1600,
    pricePerNight: 650,
    status: 'available',
    description: 'Two-story luxury loft featuring private infinity terrace jacuzzi, personal butler station, and wine cellar.',
    amenities: ['Private Terrace', 'Jacuzzi', 'Personal Butler', 'Wine Cellar'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
  },
];

const RoomListPage = () => {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.rooms);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [minCapacity, setMinCapacity] = useState('0');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const activeRooms = rooms && rooms.length > 0 ? rooms : sampleRoomsFallback;

  const filteredRooms = activeRooms
    .filter((room) => {
      const matchSearch =
        (room.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = selectedType === 'all' || (room.type || '').toLowerCase().includes(selectedType.toLowerCase());

      const matchCapacity = (room.capacity || 2) >= parseInt(minCapacity, 10);

      return matchSearch && matchType && matchCapacity;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return (a.pricePerNight || a.price || 0) - (b.pricePerNight || b.price || 0);
      }
      if (sortBy === 'price-high') {
        return (b.pricePerNight || b.price || 0) - (a.pricePerNight || a.price || 0);
      }
      return 0;
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setMinCapacity('0');
    setSortBy('recommended');
  };

  return (
    <div className="room-list-page py-5" style={{ minHeight: '85vh', background: '#fdfbf7' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <span className="badge-gold">Accommodations</span>
          <h1 className="luxury-heading mt-2" style={{ fontSize: '2.5rem' }}>
            Luxury Suites & Rooms
          </h1>
          <p className="text-muted">
            Each suite features handcrafted furnishings, high-thread Egyptian linens, and high-speed Wi-Fi.
          </p>
        </div>

        {/* Filter bar */}
        <div className="luxury-card p-4 mb-4">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-lg-4 col-md-6">
              <div className="position-relative">
                <input
                  type="text"
                  className="luxury-input ps-5"
                  placeholder="Search suite type or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  size={14}
                />
                {searchTerm && (
                  <button
                    className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 text-muted"
                    onClick={() => setSearchTerm('')}
                  >
                    <FaTimes size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Room Type */}
            <div className="col-lg-3 col-md-6">
              <select
                className="luxury-input"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Room Types</option>
                <option value="Presidential">Presidential Suites</option>
                <option value="Executive">Executive Suites</option>
                <option value="Deluxe">Deluxe Rooms</option>
                <option value="Penthouse">Penthouse Lofts</option>
              </select>
            </div>

            {/* Capacity */}
            <div className="col-lg-2 col-md-6">
              <select
                className="luxury-input"
                value={minCapacity}
                onChange={(e) => setMinCapacity(e.target.value)}
              >
                <option value="0">Any Capacity</option>
                <option value="2">2+ Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>

            {/* Sort */}
            <div className="col-lg-2 col-md-6">
              <select className="luxury-input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Reset */}
            <div className="col-lg-1 col-12 text-center text-lg-end">
              <button
                className="btn btn-link text-muted p-0 text-decoration-none small fw-bold"
                onClick={clearFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">
            Showing <strong>{filteredRooms.length}</strong> available accommodations
          </span>
        </div>

        {/* Room Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading suites...</span>
            </div>
          </div>
        ) : filteredRooms.length > 0 ? (
          <div className="row g-4">
            {filteredRooms.map((room) => (
              <div key={room._id} className="col-lg-4 col-md-6">
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        ) : (
          <div className="luxury-card p-5 text-center">
            <h4 className="luxury-heading mb-2">No Accommodations Found</h4>
            <p className="text-muted">Try adjusting your filters or clearing your search term.</p>
            <button className="btn-luxury-outline" onClick={clearFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomListPage;
