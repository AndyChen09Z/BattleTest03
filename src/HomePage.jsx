import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const handleStartBattle = () => {
    navigate("/input");
  };

  return (
    <div className="homepage-container">
      <div className="homepage-card space-y-8 text-center">
        <div className="homepage-logo-title">
          <span className="homepage-logo">🧠</span>
          <h1 className="homepage-title">Let's Battle</h1>
        </div>
        <p className="homepage-subtitle text-lg">
          欢迎来到 Let's Battle！在这里，你可以随时发起一场Battle掰头，争锋相对。随便想到什么，就开战吧！⚔️
        </p>

        <button
          onClick={handleStartBattle}
          className="homepage-button"
        >
          🚀 立即开始 Battle
        </button>
      </div>
    </div>
  );
}
