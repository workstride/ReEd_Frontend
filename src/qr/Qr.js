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

  return (
    <div className="check">
      <MenuBar />
      <div className="QrContainer">
        <div className="QrWrapper">
          <QRCode size={200} value={qrCodeValue} />
        </div>
      </div>
    </div>
  );
}

export default Qr;
