import React from "react";

function MenuBar(props) {
  const handleMenuClick = (menuItem) => {
    console.log(`메뉴 항목 "${menuItem}"을 클릭했습니다.`);
  };

  return (
    <div className="menuBar">
      <img src="image/logo.svg" alt="logo" />
      <ul>
        <li>홈</li>
        <li>학생 관리</li>
        <li>강사 관리</li>
        <li>수업 관리</li>
      </ul>
    </div>
  );
}

export default MenuBar;
