import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputPage.css";

export default function HomePage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [style, setStyle] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
  };

  const handleSubmit = () => {
    if ((text || image) && style) {
      navigate("/battle", {
        state: { image, text, style },
      });
    } else {
      alert("请完整填写：上传图片或输入观点想法 + 选择风格");
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <div className="homepage-logo-title">
          <span className="homepage-logo">🧠</span>
          <h1 className="homepage-title">Let's Battle</h1>
        </div>
        <p className="homepage-subtitle">上传语境 + 选择风格，来一次Battle</p>

        {/* 这里是拖拽上传区域（新的上传图片功能） */}
        <div
          className={`homepage-upload-area ${dragActive ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          {image ? (
            <div className="homepage-preview-wrapper">
              <img src={image} alt="预览" className="homepage-preview" />
              <button className="homepage-remove-button" onClick={handleRemoveImage}>×</button>
            </div>
          ) : (
            <div className="homepage-upload-placeholder">
              <span className="homepage-plus">＋</span>
              <p>拖拽上传图片 / 点击选择</p>
              <p className="homepage-example">(例如：上传一张炸鸡的照片🍗)</p>
            </div>
          )}
          <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        </div>

        <div className="homepage-section">
          <label>输入你的观点想法</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="例如：我今天一定要吃炸鸡！"
            maxLength={50}
          />
        </div>

        <div className="homepage-section">
          <label>选择 AI 的对抗风格</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="">请选择风格</option>
            <option value="温柔母亲">👩 温柔母亲</option>
            <option value="毒蛇损友">😏 毒舌损友</option>
            <option value="逻辑大师">🧠 逻辑大师</option>
            <option value="中二少年">🔥 中二少年</option>
          </select>
        </div>

        <button className="homepage-button" onClick={handleSubmit}>
          ✅ 准备 Battle！
        </button>
      </div>
    </div>
  );
}
