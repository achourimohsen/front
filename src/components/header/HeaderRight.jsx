import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react'; // Added useEffect and useRef
import { logoutUser } from '../../redux/apiCalls/authApiCall';

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null); // Ref to detect clicks outside dropdown

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Logout handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown(prev => !prev)}
              className="header-right-username">
              {user.username}
            </span>
            <img
              src={user.profilePhoto.url}
              alt="user photo"
              className='header-right-user-photo'
            />

            {dropdown && (
              <div ref={dropdownRef} className="header-right-dropdown">
                <Link
                  onClick={() => setDropdown(false)}
                  to={`/profile/${user._id}`}
                  className='header-dropdown-item'
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>

                <div
                  onClick={logoutHandler}
                  className="header-dropdown-item"
                >
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>LogOut</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to='/login' className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to='/register' className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
}

export default HeaderRight;
