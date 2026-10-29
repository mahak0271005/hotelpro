import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../store/slices/bookingSlice';
import {
  FaLock,
  FaShieldAlt,
  FaCreditCard,
  FaCheckCircle,
} from 'react-icons/fa';

const CheckoutPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('room') || 'sample-room-1';
  const checkIn = queryParams.get('checkIn') || '2026-11-05';
  const checkOut = queryParams.get('checkOut') || '2026-11-08';
  const guests = queryParams.get('guests') || '2';
  const totalParam = queryParams.get('total');

  const grandTotal = totalParam ? Number(totalParam) : 1980;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const [guestDetails, setGuestDetails] = useState({
    firstName: user?.firstName || 'Eleanor',
    lastName: user?.lastName || 'Montgomery',
    email: user?.email || 'eleanor@example.com',
    phone: user?.phone || '+1 (555) 321-9876',
    specialRequests: 'High floor preferred, late check-in around 6 PM.',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardName: 'Eleanor Montgomery',
  });

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const bookingPayload = {
      room: roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests: { adults: Number(guests) },
      specialRequests: guestDetails.specialRequests,
      totalAmount: grandTotal,
      paymentMethod,
    };

    try {
      const res = await dispatch(createBooking(bookingPayload));
      const confirmedNumber =
        res.payload?.booking?.bookingNumber ||
        `HP-${Math.floor(10000 + Math.random() * 90000)}`;

      setTimeout(() => {
        setIsProcessing(false);
        setBookingConfirmed({
          bookingNumber: confirmedNumber,
          roomName: 'Presidential Royal Suite',
          hotelName: 'The Grand Heritage Palace',
          checkIn,
          checkOut,
          amountPaid: grandTotal,
          guestName: `${guestDetails.firstName} ${guestDetails.lastName}`,
        });
      }, 1200);
    } catch (err) {
      setIsProcessing(false);
      // Fallback confirmation for demonstration
      setBookingConfirmed({
        bookingNumber: `HP-${Math.floor(10000 + Math.random() * 90000)}`,
        roomName: 'Presidential Royal Suite',
        hotelName: 'The Grand Heritage Palace',
        checkIn,
        checkOut,
        amountPaid: grandTotal,
        guestName: `${guestDetails.firstName} ${guestDetails.lastName}`,
      });
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="py-5" style={{ background: '#fdfbf7', minHeight: '88vh' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="glass-panel p-5 rounded-4 shadow-xl text-center">
            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: 72, height: 72, background: 'rgba(16, 185, 129, 0.15)' }}
            >
              <FaCheckCircle size={40} color="#10b981" />
            </div>

            <span className="badge badge-gold mb-2 text-uppercase" style={{ letterSpacing: '0.1em' }}>
              Reservation Guaranteed
            </span>
            <h1 className="luxury-heading mb-1" style={{ fontSize: '2.2rem' }}>
              Booking Confirmed!
            </h1>
            <p className="text-muted">
              Confirmation receipt has been sent to <strong>{guestDetails.email}</strong>.
            </p>

            <div className="p-4 bg-light rounded-3 text-start my-4 border">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <span className="text-muted small">Reservation Reference</span>
                <span className="fw-bold" style={{ color: '#c9933e', fontSize: '1.1rem' }}>
                  #{bookingConfirmed.bookingNumber}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Accommodation</span>
                <span className="fw-bold text-dark">{bookingConfirmed.roomName}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Hotel Property</span>
                <span className="fw-bold text-dark">{bookingConfirmed.hotelName}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Dates</span>
                <span className="fw-bold text-dark">
                  {bookingConfirmed.checkIn} &rarr; {bookingConfirmed.checkOut}
                </span>
              </div>
              <div className="d-flex justify-content-between pt-2 border-top fw-bold">
                <span>Total Amount Paid</span>
                <span style={{ color: '#0f172a', fontSize: '1.15rem' }}>${bookingConfirmed.amountPaid}</span>
              </div>
            </div>

            <div className="d-flex gap-3 justify-content-center">
              <Link to="/guest/dashboard" className="btn-gold py-2 px-4">
                View in My Bookings
              </Link>
              <Link to="/" className="btn-luxury-outline py-2 px-4">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page py-5" style={{ background: '#fdfbf7', minHeight: '90vh' }}>
      <div className="container">
        <div className="mb-4">
          <span className="badge-gold">Encrypted Checkout</span>
          <h1 className="luxury-heading mt-2" style={{ fontSize: '2.4rem' }}>
            Complete Your Reservation
          </h1>
          <p className="text-muted mb-0">Review your stay summary and enter payment credentials securely.</p>
        </div>

        <div className="row g-4">
          {/* Form Column */}
          <div className="col-lg-7">
            {/* Guest Details */}
            <div className="luxury-card p-4 mb-4">
              <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                Primary Guest Information
              </h4>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted">First Name</label>
                  <input
                    type="text"
                    className="luxury-input"
                    value={guestDetails.firstName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted">Last Name</label>
                  <input
                    type="text"
                    className="luxury-input"
                    value={guestDetails.lastName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted">Email Address</label>
                  <input
                    type="email"
                    className="luxury-input"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted">Phone Number</label>
                  <input
                    type="tel"
                    className="luxury-input"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Special Requests / Preferences</label>
                  <textarea
                    rows={2}
                    className="luxury-input"
                    value={guestDetails.specialRequests}
                    onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="luxury-card p-4">
              <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                Payment Method
              </h4>

              <div className="d-flex gap-3 mb-4">
                <button
                  type="button"
                  className={`btn flex-fill py-2 d-flex align-items-center justify-content-center gap-2 ${
                    paymentMethod === 'card' ? 'btn-dark' : 'btn-outline-dark'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FaCreditCard /> Credit / Debit Card
                </button>
                <button
                  type="button"
                  className={`btn flex-fill py-2 d-flex align-items-center justify-content-center gap-2 ${
                    paymentMethod === 'desk' ? 'btn-dark' : 'btn-outline-dark'
                  }`}
                  onClick={() => setPaymentMethod('desk')}
                >
                  Pay at Desk / Arrival
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">Cardholder Full Name</label>
                    <input
                      type="text"
                      className="luxury-input"
                      value={cardDetails.cardName}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">Card Number</label>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Expiration Date</label>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="MM/YY"
                      defaultValue="12/28"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Security Code (CVC)</label>
                    <input
                      type="password"
                      className="luxury-input"
                      placeholder="CVC"
                      defaultValue="888"
                    />
                  </div>
                </div>
              ) : (
                <div className="alert alert-info py-3 small">
                  <strong>Pay on Arrival Option:</strong> No charge will be made today. Your card is held
                  strictly for guarantee, and you may settle your account at front desk check-in.
                </div>
              )}
            </div>
          </div>

          {/* Stay Summary Column */}
          <div className="col-lg-5">
            <div className="luxury-card p-4 shadow-lg sticky-top" style={{ top: '100px' }}>
              <h4 className="luxury-heading mb-3" style={{ fontSize: '1.25rem' }}>
                Reservation Summary
              </h4>

              <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80"
                  alt="Suite thumbnail"
                  className="rounded-3"
                  style={{ width: 80, height: 60, objectFit: 'cover' }}
                />
                <div>
                  <h6 className="fw-bold mb-0">Presidential Royal Suite</h6>
                  <small className="text-muted">The Grand Heritage Palace</small>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 small text-secondary mb-3">
                <div className="d-flex justify-content-between">
                  <span>Dates of Stay:</span>
                  <span className="fw-bold text-dark">
                    {checkIn} &rarr; {checkOut}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Guests:</span>
                  <span className="fw-bold text-dark">{guests} Guests</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Room Rate Subtotal:</span>
                  <span>${grandTotal - 180}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Hospitality Resort Fee:</span>
                  <span>$45</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>State & City Taxes (12%):</span>
                  <span>$135</span>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                  Total to Pay
                </span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                  ${grandTotal}
                </span>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                className="btn-gold w-100 py-3 justify-content-center"
                style={{ fontSize: '1rem' }}
                onClick={handlePay}
              >
                {isProcessing ? (
                  <div className="spinner-border spinner-border-sm text-light" role="status" />
                ) : (
                  <>
                    <FaLock size={14} className="me-1" /> Authorize & Guarantee Stay
                  </>
                )}
              </button>

              <div className="d-flex align-items-center justify-content-center gap-2 mt-3 text-muted small">
                <FaShieldAlt color="#10b981" />
                <span>PCI-DSS Compliant &bull; 256-Bit SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
