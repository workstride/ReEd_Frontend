import React from "react";
import QRCode from "qrcode.react";

function Qr() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const dateData = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };

  const dateJson = JSON.stringify(dateData);

  return (
    <div
      className="QrCode"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <QRCode value={dateJson} size={200} />
    </div>
  );
}

export default Qr;
