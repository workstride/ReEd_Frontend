import React, { useEffect } from "react";
import "./Main.css";
import MenuBar from "./MenuBar";
import { useNavigate } from "react-router";

function Main() {
  const navigate = useNavigate();

  const isValidToken = () => {
    return true;
  };

  useEffect(() => {
    if (isValidToken()) {
      navigate("/main");
    }
  }, []);

  return (
    <div className="main">
      <MenuBar />
      <button className="addSchoolButton">등록</button>
    </div>
  );
}

export default Main;
