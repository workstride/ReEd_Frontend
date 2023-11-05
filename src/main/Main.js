import React, { useState, useEffect } from "react";
import "./Main.css";
import MenuBar from "./MenuBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Main() {
  const [schoolList, setSchoolList] = useState([]);

  const fetchSchoolList = async () => {
    try {
      const response = await axios.get("/api/academy");
      const data = response.data;
      setSchoolList(data);
    } catch (error) {
      console.error("Error fetching school list:", error);
    }
  };

  useEffect(() => {
    fetchSchoolList();
  }, []);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("Access-Token");
    if (!token) {
      history.push("/signin"); // 로그인 페이지로 이동
    }
  }, []);

  return (
    <div className="mainContainer" style={{ color: "white" }}>
      <MenuBar />
      <button className="addSchoolButton">등록</button>
      <div className="schoolListContainer">
        {schoolList.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "30px", marginTop: "5%" }}>
            등록된 학원이 없습니다.
          </p>
        ) : (
          <ul>
            {schoolList.map((school) => (
              <li key={school.id}>{school.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Main;
