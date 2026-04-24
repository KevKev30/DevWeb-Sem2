import { NavLink } from "react-router-dom";
import { FaHome, FaDoorOpen, FaCalendar, FaBell, FaDesktop } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <h2 className="logo">🏫 Université</h2>

      <NavLink to="/accueilPrive" className="link">
        <FaHome /> <span>Dashboard</span>
      </NavLink>

      <NavLink to="/salles" className="link">
        <FaDoorOpen /> <span>Salles</span>
      </NavLink>

      <NavLink to="/reservations" className="link">
        <FaCalendar /> <span>Réservations</span>
      </NavLink>

      <NavLink to="/notifications" className="link">
        <FaBell /> <span>Notifications</span>
      </NavLink>

      <NavLink to="/ordinateurs" className="link">
        <FaDesktop /> <span>Ordinateurs</span>
      </NavLink>

    </div>
  );
};

export default Sidebar;