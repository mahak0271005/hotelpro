import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from '../store/slices/hotelSlice';
import HotelCard from '../components/hotels/HotelCard';
import { FaSearch, FaTimes } from 'react-icons/fa';

const sampleHotelsFallback = [
  {
    _id: 'sample-hotel-1',
    name: 'The Grand Heritage Palace',
    description: 'An architectural icon nestled on the waterfront offering five-star dining, bespoke butler service, and sprawling gardens.',
    starRating: 5,
    ratingsAverage: 4.9,
    ratingsQuantity: 320,
    address: { city: 'New York', country: 'USA' },
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
    address: { city: 'Miami', country: 'USA' },
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
    address: { city: 'Aspen', country: 'USA' },
    startingPrice: 420,
    amenities: ['Ski Valet', 'Heated Mineral Pool', 'Fireplace Suites', 'Fine Dining'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'sample-hotel-4',
    name: 'Metropolitan Sky Tower',
    description: 'Sky-high glass luxury in the financial epicenter, with panoramic rooftop helipad, infinity pools, and penthouse lounge.',
    starRating: 4,
    ratingsAverage: 4.7,
    ratingsQuantity: 154,
    address: { city: 'Chicago', country: 'USA' },
    startingPrice: 260,
    amenities: ['Rooftop Pool', 'Sky Bar', 'Fitness Center', 'Conference Hub'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
  },
];

const HotelListPage = () => {
  const dispatch = useDispatch();
  const { hotels, loading } = useSelector((state) => state.hotels);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [minRating, setMinRating] = useState('0');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const activeHotels = hotels && hotels.length > 0 ? hotels : sampleHotelsFallback;

  // Filter & sort logic
  const filteredHotels = activeHotels
    .filter((hotel) => {
      const matchSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.address?.city?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCity =
        selectedCity === 'all' ||
        hotel.address?.city?.toLowerCase() === selectedCity.toLowerCase();

      const rating = hotel.ratingsAverage || hotel.starRating || 5;
      const matchRating = rating >= parseFloat(minRating);

      return matchSearch && matchCity && matchRating;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return (a.startingPrice || a.basePrice || 0) - (b.startingPrice || b.basePrice || 0);
      }
      if (sortBy === 'price-high') {
        return (b.startingPrice || b.basePrice || 0) - (a.startingPrice || a.basePrice || 0);
      }
      if (sortBy === 'rating') {
        return (b.ratingsAverage || 0) - (a.ratingsAverage || 0);
      }
      return 0;
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setMinRating('0');
    setSortBy('featured');
  };

  return (
    <div className="hotel-list-page py-5" style={{ minHeight: '85vh', background: '#fdfbf7' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <span className="badge-gold">Premier Destinations</span>
          <h1 className="luxury-heading mt-2" style={{ fontSize: '2.5rem' }}>
            Our Curated Hotel Collection
          </h1>
          <p className="text-muted">
            Explore world-renowned hotels and boutique resorts distinguished by peerless hospitality and architecture.
          </p>
        </div>

        {/* Filter bar */}
        <div className="luxury-card p-4 mb-4">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-lg-4 col-md-6">
              <div className="position-relative">
                <input
                  type="text"
                  className="luxury-input ps-5"
                  placeholder="Search hotel name, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  size={15}
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

            {/* City dropdown */}
            <div className="col-lg-3 col-md-6">
              <select
                className="luxury-input"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">All Cities & Regions</option>
                <option value="New York">New York</option>
                <option value="Miami">Miami</option>
                <option value="Aspen">Aspen</option>
                <option value="Chicago">Chicago</option>
              </select>
            </div>

            {/* Minimum Star Rating */}
            <div className="col-lg-2 col-md-6">
              <select
                className="luxury-input"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value="0">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="col-lg-2 col-md-6">
              <select
                className="luxury-input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
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
            Showing <strong>{filteredHotels.length}</strong> properties
          </span>
        </div>

        {/* Hotel Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading hotels...</span>
            </div>
          </div>
        ) : filteredHotels.length > 0 ? (
          <div className="row g-4">
            {filteredHotels.map((hotel) => (
              <div key={hotel._id} className="col-lg-4 col-md-6">
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        ) : (
          <div className="luxury-card p-5 text-center">
            <h4 className="luxury-heading mb-2">No Hotels Found</h4>
            <p className="text-muted">No hotel properties matched your current filter criteria.</p>
            <button className="btn-luxury-outline" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelListPage;
