import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import MenuBar from "../main/MenuBar";
import axios from "axios";
import "./Qr.css";

function Qr() {
  const [accessToken, setAccessToken] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("Access-Token");
    setAccessToken(storedAccessToken);
  }, []);

  useEffect(() => {
    if (accessToken) {
      const data = {
        courseId: 5,
        academyId: 3,
        memberId: 7,
      };

      axios
        .post("/api/attendance/generate/qrcode", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const { date } = response.data;
          console.log(date);
          setQRCodeValue(date);
        })
        .catch((error) => {
          console.error("Error generating QR code:", error);
        });
    }
  }, [accessToken]);
  const [timer, setTimer] = useState(60); // 60초로 타이머를 설정합니다.

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeout); // 컴포넌트가 unmount될 때 타이머를 정리합니다.
    }
  }, [timer]);

  return (
    <div className="check">
      <MenuBar />
      <div className="QrContainer">
        <div className="QrWrapper">
          <QRCode size={200} value={qrCodeValue} />
        </div>

        <p>{timer}초 남음</p>
      </div>
    </div>
  );
}

export default Qr;
