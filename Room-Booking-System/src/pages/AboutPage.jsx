import React from 'react';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <>
    {/* Hero section with background image and text overlay */}
      <div className="about-hero">
        <div className="about-hero-overlay">
          <h1 className="about-hero-title">About us</h1>
          <p className="about-hero-subtitle">
            Learn more about our mission and the people behind the platform.
          </p>
        </div>
      </div>
        <div className="about-main-content">
        {/* Left text section */}
        <div className="about-main-left">
         <h2 className="about-section-title">UNIVERSITY OF WOLLONGONG (UOW)</h2>
          <div className="about-us-text">
            <p>
              UOW is a young, dynamic, and innovative university that has grown over its 50-year history into one of Australia’s leading institutions.
            </p>
            <p>
              UOW is also a place where students can reserve and book all rooms for gathering, collaborating, innovating, and creating something creative and beneficial for them and the world.
            </p>
            <p>
              UOW is also one of the most globalised universities in the world, with campuses and joint education partnerships in the UAE, Malaysia, 
              China, Hong Kong, Saudi Arabia, and India, offering tens of thousands of students access to world-class education.
            </p>
            <p>
              UOW ranks 2nd nationally and 16th globally in the Times Higher Education (THE) Young University Rankings. 
              Our commitment to sustainability earned us equal 44th globally (9th in Australia) in the 2024 THE Impact Rankings. 
              The 2025 THE World University Rankings by Subject placed UOW in the top 200 globally for five disciplines, including law and engineering (equal 8th nationally). 
              These achievements underscore our teaching and research excellence across diverse fields.
            </p>
          </div>
        </div>

        {/* Right section with image and quote */}
        <div className="about-main-right">
          <img src="/RB_25Apr/president uow pics.jpg" alt="Vice Chancellor" className="president-image" />
          <div className="president-quote">
            “We are globally recognised for delivering impactful research that drives positive change.”
          </div>
          <div className="president-name">
            <b>Patricia M. Davidson</b><br />
            Vice Chancellor and President of UOW
          </div>
        </div>
      </div>
    </>
  );
}
