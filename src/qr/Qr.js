import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import MenuBar from "../main/MenuBar";
import axios from "axios";
import "./Qr.css";
import { useHistory } from "react-router-dom";

function Qr() {
  const [accessToken, setAccessToken] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [timer, setTimer] = useState(60); // 60초로 타이머를 설정합니다.

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("Access-Token");
    setAccessToken(storedAccessToken);
  }, []);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("Access-Token");
    if (!token) {
      history.push("/signin");
    }
  }, []);

  const generateQrCode = () => {
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
  };

  useEffect(generateQrCode, [accessToken]);

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeout);
    } else {
      generateQrCode();
      setTimer(60);
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
