import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignIn(props) {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const history = useHistory();

  const activeEnter = (e) => {
    if (window.event.keyCode === 13) {
      handleSignIn();
    }
  };

  const handleSignIn = async () => {
    try {
      const data = {
        email: email,
        pw: pw,
      };
      if (email === "") {
        alert("이메일을 입력해주세요.");
      } else if (pw === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        const response = await axios.post("api/auth", data);
        const { accessToken, refreshToken, role } = response.data;

        localStorage.setItem("Access-Token", accessToken);
        localStorage.setItem("Refresh-Token", refreshToken);
        localStorage.setItem("Role", role);
        if (role === "HEAD_TEACHER") {
          history.push("/main");
        } else if (role === "TEACHER") {
          history.push("/main");
        } else {
          alert("권한이 없습니다.");
        }
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div className="signin-container">
      <div className="glassmorphism-box">
        <img src="image/logo.png" alt="logo" className="logo" />
        <div className="input-container">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
          />
          <button onClick={handleSignIn}>로그인</button>
        </div>
      </div>
      <img src="image/rocket.png" alt="rocket" className="rocket" />
    </div>
  );
}
export default SignIn;
