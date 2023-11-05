import React, { useState } from "react";
import MenuBar from "../main/MenuBar";
import axios from "axios";
import "./Announcement.css";

function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const academyId = 3;

  const handleSubmit = (event) => {
    console.log(title);
    console.log(description);
    event.preventDefault();
    const announcement = {
      academyId: academyId,
      annTitle: title,
      annContent: description,
    };
    const accessToken = localStorage.getItem("Access-Token");
    axios
      .post("/api/ann/upload", announcement, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          alert("작성 완료");
        } else {
          alert("작성 실패");
        }
      })
      .catch((error) => {
        console.error("Error submitting announcement:", error);
        alert("작성 실패");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MenuBar />
      <div className="Announcement">
        <label>
          <input
            type="text"
            value={title}
            placeholder="제목"
            className="title large"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          <textarea
            rows="8"
            cols="45"
            style={{ resize: "none" }}
            value={description}
            placeholder="내용"
            className="descriptionsquare"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button type="submit" className="upload">
          등록
        </button>
      </div>
    </form>
  );
}

export default AnnouncementForm;
