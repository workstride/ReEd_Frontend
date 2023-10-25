import React, { useState } from "react";
import MenuBar from "../main/MenuBar";
import axios from "axios";
import "./Announcement.css";

function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const announcement = { title, description, date };
    axios
      .post("/api/announcements", announcement)
      .then((response) => {
        if (response.status === 200) {
          alert("Announcement submitted successfully!");
        } else {
          alert("Failed to submit announcement.");
        }
      })
      .catch((error) => {
        console.error("Error submitting announcement:", error);
        alert("Failed to submit announcement.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MenuBar />
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AnnouncementForm;
