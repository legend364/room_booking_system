import React, { useState } from 'react';
import './RoomDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function StaffDashboard() {
  const roomTypes = [
    { 
      name: "Common Room", 
      price: 3, 
      capacity: "2–6",
      images: ["Common1.png", "Common2.png"], 
      description: "A standard room perfect for group studies and casual meetings." 
    },
    { 
      name: "Study Room", 
      price: 6, 
      capacity: "1–4",
      images: ["Deluxe1.png", "Deluxe2.png"], 
      description: "A premium room with comfortable seating and modern amenities." 
    },
    { 
      name: "Privacy Pod", 
      price: 1, 
      capacity: "1",
      images: ["Privacy1.png", "Privacy2.png"], 
      description: "A quiet space for individual work and calls." 
    },
    { 
      name: "Conference Room", 
      price: 12, 
      capacity: "7–14",
      images: ["Conference1.png", "Conference2.png"], 
      description: "Large conference space for meetings and events." 
    },
  ];

  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <>
      <div className="page-inner">
        <div className="container mt-5">
          <div className="row">
            <div className="col heading-div">
              <p className="heading">Room Types</p>
            </div>
          </div>

          {roomTypes.map((room, index) => (
            <div className="row room-row" key={index}>
              <div className="col room-col">
                <p className="room-name">{room.name}</p>
                <p className="room-detail">Sits {room.capacity} pax<br />Price: ${room.price}</p>
              </div>
              <div className="col room-col">
                <button
                  type="button"
                  className="btn btn-primary float-end edit-button"
                  onClick={() => setSelectedRoom(room)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedRoom && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedRoom.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedRoom(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {selectedRoom.images.map((img, i) => (
                    <div className="col-md-4 mb-3" key={i}>
                      <img src={`RB_25Apr/${img}`} alt="Room" className="modal-room-img" />
                    </div>
                  ))}
                </div>
                <p>{selectedRoom.description}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedRoom(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
