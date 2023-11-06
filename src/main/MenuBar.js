import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function MenuBar(props) {
  return (
    <div className="menuBar" draggable="false">
      <div className="logo2">
        <img src="image/R&E.svg" alt="logo" draggable="false" />
      </div>
      <ul>
        <Link to="/main" style={{ color: "white" }}>
          <li><img src="image/home.svg" alt="notification" draggable="false" className="icon" />홈</li>
        </Link>
        <Link to="/announcement" style={{ color: "white" }}>
          <li><img src="image/notification.svg" alt="notification" draggable="false" className="icon" />공지사항</li>
        </Link>
        <Link to="/qr" style={{ color: "white" }}>
          <li><img src="image/attendance.svg" alt="notification" draggable="false" className="icon" />출석</li>
        </Link>
        <Link to="/signin" style={{ color: "white" }}>
          <li><img src="image/log-out.svg" alt="notification" draggable="false" className="icon" />로그아웃</li>
        </Link>
      </ul>
    </div>
  );
}

export default MenuBar;
