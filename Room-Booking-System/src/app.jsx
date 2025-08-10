import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import SlotCalendar from './pages/SlotCalendar';
import RoomDashboard from './pages/RoomDashboard';
import SignInPage from './pages/SignInPage';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/calendar" element={<SlotCalendar />} />
            <Route path="/rooms" element={<RoomDashboard />} />
            <Route path="/login" element={<SignInPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
