import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, updateRoomStatus } from '../store/slices/roomSlice';
import {
  FaConciergeBell,
  FaCalendarCheck,
  FaCalendarTimes,
  FaBed,
  FaBroom,
  FaUserCheck,
} from 'react-icons/fa';

const sampleArrivals = [
  {
    id: 'arr-1',
    guestName: 'Eleanor Montgomery',
    roomNumber: 'PH-01',
    roomType: 'Presidential Suite',
    nights: 3,
    status: 'Expected',
    bookingId: 'HP-82910',
  },
  {
    id: 'arr-2',
    guestName: 'Marcus Vance',
    roomNumber: '2104',
    roomType: 'Executive Suite',
    nights: 2,
    status: 'Checked-In',
    bookingId: 'HP-19342',
  },
  {
    id: 'arr-3',
    guestName: 'Sophia Laurent',
    roomNumber: '402',
    roomType: 'Deluxe Room',
    nights: 4,
    status: 'Expected',
    bookingId: 'HP-90145',
  },
];

const StaffDashboardPage = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);

  const [arrivals, setArrivals] = useState(sampleArrivals);
  const [filterRoomStatus, setFilterRoomStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleStatusChange = (roomId, newStatus) => {
    dispatch(updateRoomStatus({ id: roomId, status: newStatus }));
  };

  const handleCheckInGuest = (arrivalId) => {
    setArrivals((prev) =>
      prev.map((a) => (a.id === arrivalId ? { ...a, status: 'Checked-In' } : a))
    );
  };

  const handleCheckOutGuest = (arrivalId) => {
    setArrivals((prev) =>
      prev.map((a) => (a.id === arrivalId ? { ...a, status: 'Departed' } : a))
    );
  };

  return (
    <div className="staff-dashboard py-5" style={{ background: '#fdfbf7', minHeight: '88vh' }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <span className="badge-gold d-inline-flex align-items-center gap-1">
              <FaConciergeBell size={12} /> Front Desk & Concierge Operations
            </span>
            <h1 className="luxury-heading mt-2 mb-1" style={{ fontSize: '2.2rem' }}>
              Reception Management Console
            </h1>
            <p className="text-muted mb-0">Live check-in arrivals, departure tracking, and room housekeeping status.</p>
          </div>
          <div className="mt-3 mt-md-0">
            <span className="badge bg-success-subtle text-success py-2 px-3 fw-bold">
              Desk Terminal Active &bull; All Systems Synchronized
            </span>
          </div>
        </div>

        {/* Operational KPI Metric Cards */}
        <div className="row g-3 mb-5">
          <div className="col-md-3 col-6">
            <div className="luxury-card p-3 d-flex align-items-center gap-3">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48, background: 'rgba(16, 185, 129, 0.12)' }}
              >
                <FaCalendarCheck size={22} color="#10b981" />
              </div>
              <div>
                <span className="text-muted small">Today's Check-ins</span>
                <h3 className="fw-bold mb-0">14</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="luxury-card p-3 d-flex align-items-center gap-3">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48, background: 'rgba(239, 68, 68, 0.12)' }}
              >
                <FaCalendarTimes size={22} color="#ef4444" />
              </div>
              <div>
                <span className="text-muted small">Departures</span>
                <h3 className="fw-bold mb-0">9</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="luxury-card p-3 d-flex align-items-center gap-3">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48, background: 'rgba(201, 147, 62, 0.12)' }}
              >
                <FaBed size={22} color="#c9933e" />
              </div>
              <div>
                <span className="text-muted small">Total Occupied</span>
                <h3 className="fw-bold mb-0">84%</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="luxury-card p-3 d-flex align-items-center gap-3">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48, background: 'rgba(56, 189, 248, 0.12)' }}
              >
                <FaBroom size={22} color="#0284c7" />
              </div>
              <div>
                <span className="text-muted small">Cleaning In Progress</span>
                <h3 className="fw-bold mb-0">6 Rooms</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Arrivals & Express Check-In */}
        <div className="luxury-card p-4 mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="luxury-heading mb-0" style={{ fontSize: '1.3rem' }}>
              Guest Manifest & Arrivals
            </h3>
            <span className="text-muted small">3 Guests on Today's Schedule</span>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr className="small text-uppercase text-muted">
                  <th>Booking ID</th>
                  <th>Guest Name</th>
                  <th>Room Assigned</th>
                  <th>Duration</th>
                  <th>Arrival Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {arrivals.map((arr) => (
                  <tr key={arr.id}>
                    <td className="fw-bold" style={{ color: '#c9933e' }}>
                      #{arr.bookingId}
                    </td>
                    <td className="fw-bold text-dark">{arr.guestName}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        Room {arr.roomNumber} ({arr.roomType})
                      </span>
                    </td>
                    <td>{arr.nights} Nights</td>
                    <td>
                      <span
                        className={`badge ${
                          arr.status === 'Checked-In'
                            ? 'badge-available'
                            : arr.status === 'Departed'
                            ? 'bg-secondary'
                            : 'badge-gold'
                        }`}
                      >
                        {arr.status}
                      </span>
                    </td>
                    <td className="text-end">
                      {arr.status === 'Expected' && (
                        <button
                          className="btn btn-sm btn-dark d-inline-flex align-items-center gap-1"
                          onClick={() => handleCheckInGuest(arr.id)}
                        >
                          <FaUserCheck color="#10b981" /> Complete Check-In
                        </button>
                      )}
                      {arr.status === 'Checked-In' && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleCheckOutGuest(arr.id)}
                        >
                          Process Check-Out
                        </button>
                      )}
                      {arr.status === 'Departed' && (
                        <span className="text-muted small fst-italic">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Room Status Management */}
        <div className="luxury-card p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <h3 className="luxury-heading mb-1" style={{ fontSize: '1.3rem' }}>
                Room Status & Housekeeping Console
              </h3>
              <p className="text-muted small mb-0">
                Update room availability, assign cleaning teams, or flag rooms for maintenance.
              </p>
            </div>

            <div className="d-flex gap-2">
              <select
                className="luxury-input py-1 px-3 small"
                style={{ width: 'auto' }}
                value={filterRoomStatus}
                onChange={(e) => setFilterRoomStatus(e.target.value)}
              >
                <option value="all">All Room States</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            {(rooms && rooms.length > 0 ? rooms : [
              { _id: 'r1', roomNumber: '101', type: 'Deluxe Room', status: 'available', floor: 1 },
              { _id: 'r2', roomNumber: '102', type: 'Deluxe Room', status: 'occupied', floor: 1 },
              { _id: 'r3', roomNumber: '201', type: 'Executive Suite', status: 'cleaning', floor: 2 },
              { _id: 'r4', roomNumber: 'PH-01', type: 'Presidential Suite', status: 'occupied', floor: 4 },
              { _id: 'r5', roomNumber: 'PH-02', type: 'Penthouse Loft', status: 'available', floor: 4 },
              { _id: 'r6', roomNumber: '305', type: 'Deluxe Suite', status: 'maintenance', floor: 3 },
            ])
              .filter((r) => filterRoomStatus === 'all' || r.status === filterRoomStatus)
              .map((room) => (
                <div key={room._id} className="col-lg-4 col-md-6">
                  <div className="p-3 border rounded-3 bg-white h-100 d-flex flex-column justify-content-between shadow-sm">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="mb-0 fw-bold">Room {room.roomNumber}</h5>
                        <small className="text-muted">
                          {room.type} &bull; Floor {room.floor || 1}
                        </small>
                      </div>
                      <span
                        className={`badge ${
                          room.status === 'available'
                            ? 'badge-available'
                            : room.status === 'occupied'
                            ? 'badge-occupied'
                            : 'badge-gold'
                        }`}
                      >
                        {room.status || 'available'}
                      </span>
                    </div>

                    <div className="pt-2 border-top mt-2 d-flex align-items-center justify-content-between">
                      <span className="small text-muted">Update Status:</span>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-success"
                          title="Mark Available"
                          onClick={() => handleStatusChange(room._id, 'available')}
                        >
                          Avail
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          title="Mark Occupied"
                          onClick={() => handleStatusChange(room._id, 'occupied')}
                        >
                          Occ
                        </button>
                        <button
                          className="btn btn-outline-warning"
                          title="Mark Cleaning"
                          onClick={() => handleStatusChange(room._id, 'cleaning')}
                        >
                          Clean
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardPage;
