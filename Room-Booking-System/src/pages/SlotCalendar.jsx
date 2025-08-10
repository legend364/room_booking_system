import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SlotCalendar.css';

const roomTypes = [
  'Common Room 01', 'Common Room 02', 'Common Room 03',
  'Study Room 01', 'Study Room 02', 'Study Room 03',
  'Privacy Pod 01', 'Privacy Pod 02', 'Privacy Pod 03',
  'Conference Room 01', 'Conference Room 02'
];

const timingList = ['NaN', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

export default function SlotCalendar() {
  const navigate = useNavigate();
  const today = new Date(); // takes today's date from your device accurately
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];

  const handleCellClick = (room, hourLabel) => {
    const key = `${room}-${hourLabel}`;
    if (selectedSlot === key) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(key);
    }
  };

  
  const generateSchedule = () => {
    return roomTypes.map(room => (
      <tr key={room}>
        <td>{room}</td>
        {timingList.slice(1).map((hour, i) => {
          const slotKey = `${room}-${hour}`;
          const isSelected = selectedSlot === slotKey;
          return (
            <td
              key={i}
              className={isSelected ? 'green-selected' : 'green'}
              onClick={() => handleCellClick(room, hour)}
            >
              <span title={slotKey}>{hour}.00</span>
            </td>
          );
        })}
      </tr>
    ));
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(month, year);
    const todayDate = today.toDateString();
    const selectedDateStr = selectedDate.toDateString();

    const cells = [];
    let dayCounter = 1;

    for (let row = 0; row < 6; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDay) {
          week.push(<td key={`empty-${col}`}></td>);
        } else if (dayCounter > totalDays) {
          week.push(<td key={`overflow-${col}`}></td>);
        } else {
          const cellDate = new Date(year, month, dayCounter);
          const isPast = cellDate < today.setHours(0,0,0,0);
          const isBeyondLimit = cellDate > new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
          const isSunday = cellDate.getDay() === 0; // campus closed on sunday

          let className = 'calendar-cell';
          if (cellDate.toDateString() === todayDate) className += ' today';
          if (cellDate.toDateString() === selectedDateStr) className += ' selected';
          if (isPast || isBeyondLimit || isSunday) className += ' disabled';

          week.push(
            <td
              key={`date-${dayCounter}`}
              className={className}
              onClick={() => {
                if (!isPast && !isBeyondLimit) setSelectedDate(cellDate);
              }}
            >
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }
      cells.push(<tr key={`week-${row}`}>{week}</tr>);
    }
    return cells;
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedSlot(null);
  };

  const handleNext = () => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    navigate(isLoggedIn ? '/payment' : '/login');
  };

  return (
    <div className="page-inner">
      <div className="container-fluid mt-2">
        <div className="row">
          {/* Left Panel */}
          <div className="col-md-4 col-lg-3">

            {/* the current date section */}
            <p className="current-date">
              {(() => {
                const dayNum = selectedDate.getDate();
                const suffix =
                  dayNum % 10 === 1 && dayNum !== 11 ? "st" :
                  dayNum % 10 === 2 && dayNum !== 12 ? "nd" :
                  dayNum % 10 === 3 && dayNum !== 13 ? "rd" : "th";

                const weekday = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
                const month = selectedDate.toLocaleDateString("en-US", { month: "long" });
                const year = selectedDate.getFullYear();

                return `${weekday}, ${dayNum}${suffix} ${month} ${year}`;
              })()}
            </p>
            <p style={{ color: "#37447E" }}>Go to Date:</p>

            <div className="calendar-box">
              {/* change month arrow */}
              <div className="calendar-header">
                <button className="cal-arrow" onClick={() => handleMonthChange(-1)} aria-label="Previous month">‹</button>
                <span className="cal-title">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button className="cal-arrow" onClick={() => handleMonthChange(1)} aria-label="Next month">›</button>
              </div>

              <table className="date-table" align="center">
                <thead>
                  <tr>{days.map(day => <th key={day}>{day}</th>)}</tr>
                </thead>
                <tbody>{generateCalendarCells()}</tbody>
              </table>
            </div>

            {/* legend section */}
            <div className="calendar-controls mt-3">
              <div className="legend-box mt-3">
                <p><strong>Legend:</strong></p>
                <div className="legend-item"><span className="legend-color green" /> Available</div>
                <div className="legend-item"><span className="legend-color red" /> Unavailable</div>
                <div className="legend-item"><span className="legend-color blue" /> Your Booking</div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-md-8 col-lg-9 overflow-auto">
            <p style={{ color: '#37447E' }}>Select time slot:</p>
            <div className="table-responsive">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Space</th>
                    {timingList.slice(1).map((hour, i) => (
                      <th key={i}>{`${hour}.00`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{generateSchedule()}</tbody>
              </table>
            </div>

            {/* next button near the table */}
            <div className="next-container"> 
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
