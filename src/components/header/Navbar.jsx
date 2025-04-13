import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotificationsDropdown from "../../components/navbar/NotificationsDropdown";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">

        {/* إشعارات - تظهر فقط عند تسجيل الدخول */}
        {user && (
          <li className="nav-link notification-link">
            <NotificationsDropdown />
          </li>
        )}

        <Link to="/" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-house"></i> Home
        </Link>

        <Link to="/helps" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-question-diamond"></i> Helps
        </Link>

        {user && (
          <Link to='/reports' onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-stickies"></i> Reports
          </Link>
        )}

        {user && (
          <Link to='/reports/create-report' onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-journal-plus"></i> Create
          </Link>
        )}

        {user?.isAdmin && (
          <Link to='/admin-dashboard' onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-person-check"></i> Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
