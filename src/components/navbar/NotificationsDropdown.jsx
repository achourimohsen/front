import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotifications,
  markAllAsRead,
} from "../../redux/apiCalls/notificationApiCall";
import { notificationActions } from "../../redux/slices/notificationSlice";

import { Link } from "react-router-dom";
import { BellIcon, CheckCircleIcon } from "lucide-react";
import socket from "../../socket"; // ✅ Socket.io
import "./notificationsDropdown.css";

const NotificationsDropdown = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.auth); // ✅ نجيبو اليوزر المسجل
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ نربط المستخدم بالسيرفر ونستقبل الإشعارات الحينية
  useEffect(() => {
    if (!user) return;

    socket.emit("addUser", user._id);

    socket.on("getNotification", (notif) => {
      dispatch(notificationActions.addNotification({
        ...notif,
        read: false,
        _id: Date.now().toString(), // id مؤقت
        text:
          notif.type === "comment"
            ? `قام ${notif.sender.name} بالتعليق على بلاغك`
            : `قام ${notif.sender.name} بالإعجاب ببلاغك`,
      }));
      
    });

    return () => {
      socket.off("getNotification");
    };
  }, [dispatch, user]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <div className="icon-wrapper" onClick={() => setOpen(!open)}>
        <BellIcon className="icon" />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>

      {open && (
        <div className="dropdown-menu">
          <div className="header">
            <span>الإشعارات</span>
            <button onClick={handleMarkAllAsRead}>
              <CheckCircleIcon size={16} />
              الكل مقروء
            </button>
          </div>
          <div className="items">
            {notifications.length === 0 ? (
              <p className="empty">لا توجد إشعارات</p>
            ) : (
              notifications.map((notif) => (
                <Link
                  key={notif._id}
                  to={`/report/${notif.reportId}`}
                  className={`notif-item ${notif.read ? "" : "unread"}`}
                  onClick={() => setOpen(false)}
                >
                  {notif.text}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
