import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHotels, createHotel } from '../store/slices/hotelSlice';
import { fetchRooms, createRoom } from '../store/slices/roomSlice';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  FaDollarSign,
  FaBook,
  FaHotel,
  FaPlus,
  FaChartLine,
  FaShieldAlt,
} from 'react-icons/fa';

const sampleRevenueData = [
  { month: 'May', revenue: 48000, bookings: 124 },
  { month: 'Jun', revenue: 62000, bookings: 168 },
  { month: 'Jul', revenue: 89000, bookings: 230 },
  { month: 'Aug', revenue: 94000, bookings: 245 },
  { month: 'Sep', revenue: 78000, bookings: 195 },
  { month: 'Oct', revenue: 105000, bookings: 280 },
];

const sampleUsers = [
  { id: 'u1', name: 'Alexander Wright', email: 'admin@hotelpro.com', role: 'admin', status: 'Active' },
  { id: 'u2', name: 'Elena Rostova', email: 'staff@hotelpro.com', role: 'staff', status: 'Active' },
  { id: 'u3', name: 'David Kensington', email: 'guest@hotelpro.com', role: 'guest', status: 'Active' },
  { id: 'u4', name: 'Sophia Laurent', email: 'sophia@example.com', role: 'guest', status: 'Active' },
];

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotels);
  const { rooms } = useSelector((state) => state.rooms);

  const [activeTab, setActiveTab] = useState('overview');
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  // New hotel form state
  const [hotelForm, setHotelForm] = useState({
    name: '',
    city: '',
    country: 'USA',
    starRating: 5,
    basePrice: 250,
    description: '',
  });

  // New room form state
  const [roomForm, setRoomForm] = useState({
    name: '',
    roomNumber: '',
    type: 'Deluxe Room',
    capacity: 2,
    pricePerNight: 280,
    bedType: 'King Bed',
    hotelId: '',
  });

  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleCreateHotel = (e) => {
    e.preventDefault();
    dispatch(
      createHotel({
        name: hotelForm.name,
        address: { city: hotelForm.city, country: hotelForm.country },
        starRating: Number(hotelForm.starRating),
        startingPrice: Number(hotelForm.basePrice),
        description: hotelForm.description,
      })
    );
    setShowAddHotelModal(false);
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    dispatch(
      createRoom({
        name: roomForm.name,
        roomNumber: roomForm.roomNumber,
        type: roomForm.type,
        capacity: Number(roomForm.capacity),
        pricePerNight: Number(roomForm.pricePerNight),
        bedType: roomForm.bedType,
        hotel: roomForm.hotelId || (hotels[0] && hotels[0]._id),
      })
    );
    setShowAddRoomModal(false);
  };

  return (
    <div className="admin-dashboard py-5" style={{ background: '#fdfbf7', minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <span className="badge-gold d-inline-flex align-items-center gap-1">
              <FaShieldAlt size={12} /> Executive Operations Suite
            </span>
            <h1 className="luxury-heading mt-2 mb-1" style={{ fontSize: '2.4rem' }}>
              Hospitality Executive Dashboard
            </h1>
            <p className="text-muted mb-0">System performance, hotel portfolio, occupancy rates, and revenue.</p>
          </div>

          <div className="mt-3 mt-md-0 d-flex gap-2">
            <button className="btn-gold" onClick={() => setShowAddHotelModal(true)}>
              <FaPlus size={12} /> Add Hotel
            </button>
            <button className="btn-luxury-outline" onClick={() => setShowAddRoomModal(true)}>
              <FaPlus size={12} /> Add Suite
            </button>
          </div>
        </div>

        {/* Top Analytics KPI Cards */}
        <div className="row g-3 mb-5">
          <div className="col-lg-3 col-6">
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-bold text-uppercase">Monthly Revenue</span>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 38, height: 38, background: 'rgba(201, 147, 62, 0.15)' }}
                >
                  <FaDollarSign color="#c9933e" />
                </div>
              </div>
              <h2 className="luxury-heading mb-1" style={{ fontSize: '1.9rem' }}>
                $105,420
              </h2>
              <span className="text-success small fw-bold">&uarr; 18.4% vs last month</span>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-bold text-uppercase">Total Bookings</span>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 38, height: 38, background: 'rgba(16, 185, 129, 0.15)' }}
                >
                  <FaBook color="#10b981" />
                </div>
              </div>
              <h2 className="luxury-heading mb-1" style={{ fontSize: '1.9rem' }}>
                1,248
              </h2>
              <span className="text-success small fw-bold">&uarr; 12.2% growth</span>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-bold text-uppercase">Occupancy Rate</span>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 38, height: 38, background: 'rgba(56, 189, 248, 0.15)' }}
                >
                  <FaChartLine color="#0284c7" />
                </div>
              </div>
              <h2 className="luxury-heading mb-1" style={{ fontSize: '1.9rem' }}>
                86.4%
              </h2>
              <span className="text-muted small">Target 80% Achieved</span>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-bold text-uppercase">Total Properties</span>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 38, height: 38, background: 'rgba(168, 85, 247, 0.15)' }}
                >
                  <FaHotel color="#9333ea" />
                </div>
              </div>
              <h2 className="luxury-heading mb-1" style={{ fontSize: '1.9rem' }}>
                {hotels?.length || 4}
              </h2>
              <span className="text-muted small">{rooms?.length || 18} Suites managed</span>
            </div>
          </div>
        </div>

        {/* Tab selection */}
        <div className="d-flex gap-2 mb-4 border-bottom pb-2">
          <button
            className={`btn ${activeTab === 'overview' ? 'btn-dark' : 'btn-light'}`}
            onClick={() => setActiveTab('overview')}
          >
            Analytics & Trends
          </button>
          <button
            className={`btn ${activeTab === 'hotels' ? 'btn-dark' : 'btn-light'}`}
            onClick={() => setActiveTab('hotels')}
          >
            Hotel Properties ({hotels?.length || 4})
          </button>
          <button
            className={`btn ${activeTab === 'users' ? 'btn-dark' : 'btn-light'}`}
            onClick={() => setActiveTab('users')}
          >
            Staff & Accounts ({sampleUsers.length})
          </button>
        </div>

        {/* Overview: Charts */}
        {activeTab === 'overview' && (
          <div className="row g-4 mb-5">
            <div className="col-lg-8">
              <div className="luxury-card p-4">
                <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                  Gross Revenue Performance (USD)
                </h4>
                <div style={{ height: '300px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sampleRevenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c9933e" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#c9933e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#c9933e"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRev)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="luxury-card p-4">
                <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                  Monthly Booking Volume
                </h4>
                <div style={{ height: '300px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sampleRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#0f172a" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotel Inventory Table */}
        {activeTab === 'hotels' && (
          <div className="luxury-card p-4 mb-4">
            <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
              Managed Hotels & Resorts
            </h4>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr className="small text-uppercase text-muted">
                    <th>Hotel Name</th>
                    <th>Destination</th>
                    <th>Stars</th>
                    <th>Starting Rate</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(hotels && hotels.length > 0 ? hotels : [
                    { _id: 'h1', name: 'The Grand Heritage Palace', address: { city: 'New York' }, starRating: 5, startingPrice: 380 },
                    { _id: 'h2', name: 'Azure Coastline Sanctuary', address: { city: 'Miami' }, starRating: 5, startingPrice: 295 },
                    { _id: 'h3', name: 'Aspen Alpine Chalet & Resort', address: { city: 'Aspen' }, starRating: 5, startingPrice: 420 },
                  ]).map((h) => (
                    <tr key={h._id}>
                      <td className="fw-bold">{h.name}</td>
                      <td>{h.address?.city || 'Downtown'}, {h.address?.country || 'USA'}</td>
                      <td>
                        <span className="badge-gold">{h.starRating || 5} Stars</span>
                      </td>
                      <td>${h.startingPrice || h.basePrice || 350} / night</td>
                      <td className="text-end">
                        <a href={`/hotels/${h._id}`} className="btn btn-sm btn-outline-dark">
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Accounts Table */}
        {activeTab === 'users' && (
          <div className="luxury-card p-4">
            <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
              Authorized User & Staff Roles
            </h4>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr className="small text-uppercase text-muted">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-end">Privileges</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleUsers.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-bold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`badge text-uppercase ${
                            u.role === 'admin'
                              ? 'badge-gold'
                              : u.role === 'staff'
                              ? 'badge-available'
                              : 'bg-light text-dark border'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success-subtle text-success">{u.status}</span>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary">Edit Role</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Hotel Modal */}
        {showAddHotelModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.6)', zIndex: 2000 }}
          >
            <div className="glass-panel p-4 rounded-4 shadow-xl" style={{ maxWidth: '520px', width: '90%' }}>
              <h4 className="luxury-heading mb-3">Add New Hotel Property</h4>
              <form onSubmit={handleCreateHotel} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label small fw-bold text-muted">Hotel Name</label>
                  <input
                    type="text"
                    required
                    className="luxury-input"
                    value={hotelForm.name}
                    onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">City</label>
                    <input
                      type="text"
                      required
                      className="luxury-input"
                      value={hotelForm.city}
                      onChange={(e) => setHotelForm({ ...hotelForm, city: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Base Price/Night ($)</label>
                    <input
                      type="number"
                      required
                      className="luxury-input"
                      value={hotelForm.basePrice}
                      onChange={(e) => setHotelForm({ ...hotelForm, basePrice: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label small fw-bold text-muted">Description</label>
                  <textarea
                    rows={3}
                    className="luxury-input"
                    value={hotelForm.description}
                    onChange={(e) => setHotelForm({ ...hotelForm, description: e.target.value })}
                  />
                </div>
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button type="button" className="btn btn-light" onClick={() => setShowAddHotelModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold">
                    Save Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Suite Modal */}
        {showAddRoomModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.6)', zIndex: 2000 }}
          >
            <div className="glass-panel p-4 rounded-4 shadow-xl" style={{ maxWidth: '520px', width: '90%' }}>
              <h4 className="luxury-heading mb-3">Add Luxury Room / Suite</h4>
              <form onSubmit={handleCreateRoom} className="d-flex flex-column gap-3">
                <div className="row g-2">
                  <div className="col-8">
                    <label className="form-label small fw-bold text-muted">Suite Name</label>
                    <input
                      type="text"
                      required
                      className="luxury-input"
                      value={roomForm.name}
                      onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label small fw-bold text-muted">Room #</label>
                    <input
                      type="text"
                      required
                      className="luxury-input"
                      value={roomForm.roomNumber}
                      onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Suite Tier</label>
                    <select
                      className="luxury-input"
                      value={roomForm.type}
                      onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}
                    >
                      <option value="Presidential Suite">Presidential Suite</option>
                      <option value="Executive Suite">Executive Suite</option>
                      <option value="Deluxe Room">Deluxe Room</option>
                      <option value="Penthouse Loft">Penthouse Loft</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Nightly Rate ($)</label>
                    <input
                      type="number"
                      required
                      className="luxury-input"
                      value={roomForm.pricePerNight}
                      onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: e.target.value })}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button type="button" className="btn btn-light" onClick={() => setShowAddRoomModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold">
                    Add Suite
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
