import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Rooms (covers feed both the cards and the hero slideshow)
  const rooms = [
    {
      key: 'meeting',
      name: 'Meeting Room',
      blurb: 'Great for group meetups and informal discussions.',
      capacity: 12,
      equipment: ['Whiteboard', 'TV Display', 'HDMI'],
      cover: '/RB_25Apr/MeetingRoomCover.png',
      gallery: ['/RB_25Apr/Common1.png', '/RB_25Apr/Common2.png'],
    },
    {
      key: 'study',
      name: 'Study Room',
      blurb: 'Quiet space ideal for focused work and small teams.',
      capacity: 6,
      equipment: ['Power outlets', 'AC', 'Sound dampening'],
      cover: '/RB_25Apr/StudyRoomCover.png',
      gallery: ['/RB_25Apr/Study1.png', '/RB_25Apr/Study2.png'],
    },
    {
      key: 'privacy',
      name: 'Privacy Pod',
      blurb: 'Quiet space ideal for individuals who need peace during study.',
      capacity: '1–2',
      equipment: ['Sofa', 'Table', 'Sound‑proof'],
      cover: '/RB_25Apr/PrivacyPodCover.png',
      gallery: ['/RB_25Apr/Privacy1.png', '/RB_25Apr/Privacy2.png'],
    },
    {
      key: 'conference',
      name: 'Conference Room',
      blurb: 'Formal setting for presentations and client meetings.',
      capacity: 20,
      equipment: ['Projector', 'Conference speaker', 'Zoom‑ready'],
      cover: '/RB_25Apr/ConferenceCover.png',
      gallery: ['/RB_25Apr/Conference1.png', '/RB_25Apr/Conference2.png'],
    },
  ];

  // Slideshow sources (from room covers)
  const covers = rooms.map(r => r.cover);

  // Auto-play slideshow (+ pause on hover)
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!covers.length || paused) return;
    const id = setInterval(() => setSlide(s => (s + 1) % covers.length), 3500);
    return () => clearInterval(id);
  }, [covers.length, paused]);

  const next = () => setSlide(s => (s + 1) % covers.length);
  const prev = () => setSlide(s => (s - 1 + covers.length) % covers.length);

  return (
    <>
      <div className="page-inner">
        <div className="container mt-5">
          <p className="intro-line">
            Find spaces for quiet and collaborative learning in our campus.
          </p>

          {/* ---------- HERO: text + slideshow inside ONE grey rectangle ---------- */}
          <div className="container mt-5">
            <div
              className="hero-box"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Text layer */}
              <div className="hero-left">
                <p className="heading">Book a room</p>
                <p className="text">4 types of room are available to book online.</p>
                <p className="text mb-xxl">Secure your slot before its fully booked!.</p>

                <div className="hero-actions">
                  <Link
                    to="/calendar"
                    className="btn btn-primary btn-sm rounded-0"
                    style={{ backgroundColor: '#0038F5', borderColor: '#0038F5', width: '25%' }}
                  >
                    Book Now
                  </Link>
                  <Link
                    to="/rooms"
                    className="btn btn-primary btn-sm rounded-0"
                    style={{ backgroundColor: '#0038F5', borderColor: '#0038F5', width: '25%' }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Slideshow (full background layer) */}
              <div className="hero-right">
                {covers.map((src, i) => (
                  <div
                    key={i}
                    className={`hero-slide ${i === slide ? 'is-active' : ''}`}
                    style={{ backgroundImage: `url('${src}')` }}
                    aria-hidden={i !== slide}
                  />
                ))}
                <div className="hero-scrim" />
              </div>

              {/* Arrows are SIBLINGS of .hero-left/.hero-right so they sit ABOVE everything */}
              <button className="hero-arrow hero-arrow--left" aria-label="Previous slide" onClick={prev}>
                ‹
              </button>
              <button className="hero-arrow hero-arrow--right" aria-label="Next slide" onClick={next}>
                ›
              </button>

              {/* Dots */}
              <div className="hero-dots" role="tablist" aria-label="Slideshow dots">
                {covers.map((_, i) => (
                  <button
                    key={i}
                    className={`hero-dot ${i === slide ? 'is-active' : ''}`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={i === slide}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Image cards (2×2) ---------- */}
          <section className="rooms-grid">
            {rooms.map(room => (
              <article
                key={room.key}
                className="room-card"
                style={{ backgroundImage: `url('${room.cover}')` }}
              >
                <div className="room-overlay">
                  <div className="room-info">
                    <h3 className="room-title">{room.name}</h3>
                    <p className="room-blurb">{room.blurb}</p>
                    <div className="room-actions">
                      <Link to="/calendar" className="btn btn-primary btn-sm rounded-0 btn-book">
                        Book Now
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-light btn-sm rounded-0 btn-details"
                        onClick={() => setSelectedRoom(room)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>

      {/* ---------- Modal ---------- */}
      {selectedRoom && (
        <div className="rb-modal-backdrop" onClick={() => setSelectedRoom(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="m-0">{selectedRoom.name}</h4>
            </div>

            <div className="modal-gallery">
              {(selectedRoom.gallery || []).slice(0, 2).map((src, i) => (
                <div key={i} className="gallery-img" style={{ backgroundImage: `url('${src}')` }} />
              ))}
            </div>

            <div className="modal-content">
              <p className="mb-2">{selectedRoom.blurb}</p>
              <p className="mb-1">
                <strong>Capacity:</strong> {selectedRoom.capacity}
              </p>
              <p className="mb-0">
                <strong>Equipment:</strong> {selectedRoom.equipment.join(', ')}
              </p>
            </div>

            <div className="modal-actions">
              <Link to="/calendar" className="btn btn-primary btn-sm rounded-0">
                Book Now
              </Link>
              <button className="btn btn-secondary btn-sm rounded-0" onClick={() => setSelectedRoom(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
