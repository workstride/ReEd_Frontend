import React, { useState, useEffect } from "react";
import "./Main.css";
import MenuBar from "./MenuBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Main() {
  const [schoolList, setSchoolList] = useState([]);
  const accessToken = localStorage.getItem("Access-Token");
  const params = {
    page: 1,
    size: 1,
    type: "string",
    keyword: "string",
  };

  useEffect(() => {
    const fetchSchoolList = async () => {
      try {
        const response = await axios.get("/api/academy", {
          params: params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        if (Array.isArray(data)) {
          setSchoolList(data);
          console.log(schoolList);
        } else {
          setSchoolList([]);
          console.log(schoolList);
        }
      } catch (error) {
        console.error("Error fetching school list:", error);
      }
    };

    fetchSchoolList();
  }, [accessToken]);

  const history = useHistory();

  return (
    <div className="mainContainer" style={{ color: "white" }}>
      <MenuBar />
      <div className="schoolListContainer">
        {Array.isArray(schoolList) && schoolList.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "30px", marginTop: "5%" }}>
            등록된 학원이 없습니다.
          </p>
        ) : (
          <div className="schoolBoxContainer">
            {schoolList.map((school) => (
              <div key={school.id} className="schoolBox">
                <h3>{school.acName}</h3>
                <p>학원 전화번호: {school.acTel}</p>
                <p>주소: {school.address}</p>
                <p>우편번호: {school.zipcode}</p>
                <p>위도: {school.lat}</p>
                <p>경도: {school.lng}</p>
                <p>원장 성명: {school.headTeacherName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
