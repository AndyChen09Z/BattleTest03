import React from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./ResultPage.css";

export default function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="resultpage-container">
      <motion.div
        className="resultpage-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="resultpage-title">
          🕑 Battle 结束！
        </h2>
        <p className="resultpage-subtitle">你觉得Battle说服你了吗？</p>

        <div className="resultpage-buttons">
          <Button className="button-green-gradient">
            😋 我怎么可能被说服
          </Button>
          <Button className="button-red-gradient">
            👌 你说的对，牛掰
          </Button>
        </div>

        <div className="resultpage-restart">
          <Button
            onClick={() => navigate("/")}
            className="button-purple-gradient"
          >
            🔁 再来一局 Battle
          </Button>
        </div>
      </motion.div>
    </div>
  );
}