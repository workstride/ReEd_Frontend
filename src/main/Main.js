import React from "react";
import "./Main.css";
import MenuBar from "./MenuBar";

function Main() {
  return (
    <div className="mainContainer">
      <MenuBar />
      <button className="addSchoolButton">등록</button>
    </div>
  );
}

export default Main;
