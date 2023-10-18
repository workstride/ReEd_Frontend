import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
        alert("아이디를 입력해주세요.");
      } else if (pw === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        const response = await axios.post("api/auth", data);
        const { accessToken, refreshToken, role } = response.data;

        localStorage.setItem("Access-Token", accessToken);
        if (role === "HEAD_TEACHER") {
          history.push("/main");
        } else {
          alert("권한이 없습니다.");
        }
      }
    } catch (error) {
      setMessage("로그인 실패");
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div className="signin-container">
      <div className="glassmorphism-box">
        <img src="image/logo.png" alt="logo" />
        <div className="input-container">
          <input
            type="email"
            placeholder="이메일 또는 아이디"
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
    </div>
  );
}
export default SignIn;
