import React, { useState, useEffect } from "react";
import MenuBar from "../main/MenuBar";
import axios from "axios";
import "./Announcement.css";
import { useHistory } from "react-router-dom";

function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const academyId = 3;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return; // 이미 작성 중이면 더 이상 진행하지 않습니다.
    }
    setIsSubmitting(true); // 작성 중 상태로 설정합니다.
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
        let countdown = 10;
        const intervalId = setInterval(() => {
          countdown -= 1;
          if (countdown > 0) {
            alert(`다시 작성할 수 있을 때까지 ${countdown}초 남았습니다.`);
          } else {
            clearInterval(intervalId);
            setIsSubmitting(false); // 5초 후에 작성 중 상태를 해제합니다.
          }
        }, 1000);
      })
      .catch((error) => {
        console.error("Error submitting announcement:", error);
        alert("작성 실패");
        setTimeout(() => setIsSubmitting(false), 5000); // 5초 후에 작성 중 상태를 해제합니다.
      });
  };
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("Access-Token");
    if (!token) {
      history.push("/signin"); // 로그인 페이지로 이동
    }
  }, []);

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
