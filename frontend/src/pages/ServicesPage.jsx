import React from 'react';
import {
  FaConciergeBell,
  FaSpa,
  FaUtensils,
  FaCar,
  FaPlaneArrival,
  FaGlassCheers,
  FaCheck,
} from 'react-icons/fa';

const servicesList = [
  {
    icon: <FaConciergeBell size={28} color="#c9933e" />,
    title: '24/7 Private Butler & Concierge',
    desc: 'Dedicated round-the-clock attendants to orchestrate private excursions, wardrobe pressing, and bespoke room dining.',
    perk: 'Complimentary for Presidential & Penthouse suites',
  },
  {
    icon: <FaSpa size={28} color="#c9933e" />,
    title: 'Imperial Wellness & Roman Hydro-Spa',
    desc: 'Revitalize with heated basalt stone therapy, sensory showers, mineral plunge baths, and organic botanicals.',
    perk: 'Advance reservation recommended',
  },
  {
    icon: <FaUtensils size={28} color="#c9933e" />,
    title: 'Michelin-Starred Dining in-Suite',
    desc: 'Epicurean journeys prepared by master chefs and sommelier pairings delivered directly to your dining terrace.',
    perk: 'Custom dietary consultation included',
  },
  {
    icon: <FaCar size={28} color="#c9933e" />,
    title: 'Private Chauffeur & Luxury Fleet',
    desc: 'Airport transit and city exploration via our chauffeured fleet of Rolls-Royce Phantoms and Mercedes-Maybachs.',
    perk: 'Airport transfer complimentary on 4+ nights',
  },
  {
    icon: <FaPlaneArrival size={28} color="#c9933e" />,
    title: 'Rooftop Helipad & Sky Lounge',
    desc: 'Direct aerial arrivals straight to the penthouse observatory with seamless fast-track baggage handling.',
    perk: 'Available at select metropolitan locations',
  },
  {
    icon: <FaGlassCheers size={28} color="#c9933e" />,
    title: 'Private Wine Cellar & Rare Spirits Tasting',
    desc: 'Curated tastings with head sommeliers exploring grand vintage reserves and rare small-batch cognacs.',
    perk: 'Private tasting rooms for up to 10 guests',
  },
];

const ServicesPage = () => {
  return (
    <div className="services-page py-5" style={{ background: '#fdfbf7', minHeight: '88vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge-gold">Bespoke Hospitality</span>
          <h1 className="luxury-heading mt-2 mb-3" style={{ fontSize: '2.5rem' }}>
            Exclusive Concierge & Guest Services
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '640px', fontSize: '1.05rem' }}>
            Every HotelPro property offers an extraordinary array of tailored services crafted to elevate every moment of your stay.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4 mb-5">
          {servicesList.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center rounded-3"
                    style={{ width: 56, height: 56, background: 'rgba(201, 147, 62, 0.12)' }}
                  >
                    {service.icon}
                  </div>
                  <h4 className="luxury-heading mb-2" style={{ fontSize: '1.2rem' }}>
                    {service.title}
                  </h4>
                  <p className="text-muted small mb-3" style={{ lineHeight: 1.6 }}>
                    {service.desc}
                  </p>
                </div>
                <div className="pt-3 border-top mt-2">
                  <span className="badge bg-light text-dark border small d-flex align-items-center gap-1">
                    <FaCheck color="#10b981" /> {service.perk}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div
          className="luxury-card p-4 p-md-5 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
        >
          <h3 className="luxury-heading text-white mb-2" style={{ fontSize: '1.8rem' }}>
            Have a Bespoke Request?
          </h3>
          <p className="text-light small mx-auto mb-4" style={{ maxWidth: '550px' }}>
            Whether arranging a private yacht charter, orchestrating an intimate celebration, or reserving rare opera seats,
            our chief concierge team is at your command.
          </p>
          <a href="mailto:concierge@hotelpro.com" className="btn-gold py-2 px-4">
            Connect with Chief Concierge
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
