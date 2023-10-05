import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
        setMessage(
          "accessToken: " +
            accessToken +
            " refreshToken: " +
            refreshToken +
            " role: " +
            role
        );

        // 로그인 성공 시 토큰을 Local Storage에 저장
        localStorage.setItem("Access-Token", accessToken);

        // 메인 페이지로 이동
        navigate("/main");
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
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>로그인</button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default SignIn;
