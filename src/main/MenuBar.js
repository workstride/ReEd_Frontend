import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function MenuBar(props) {
  return (
    <div className="menuBar" draggable="false">
      <div className="logo">
        <img src="image/logo.png" alt="logo" draggable="false" />
      </div>
      <ul>
        <li>
          <Link to="/main" style={{ color: "white" }}>
            홈
          </Link>
        </li>
        <li>
          <Link to="/announcement" style={{ color: "white" }}>
            공지사항
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuBar;
