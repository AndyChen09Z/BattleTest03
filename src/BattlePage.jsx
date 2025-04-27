// 🔥 完全同步HomePage风格版 BattlePage.jsx（彻底修正输入框在上，按钮在下，居中排列，宽度统一）

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function BattlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, text, style } = location.state || {};
  const [round, setRound] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const stylePrompts = {
    温柔母亲: "人设定义：你是一个无比关心用户的妈妈，温柔又絮叨，对用户的每一个决定都充满担忧。即使表面上在安慰，其实话语中总是带着“不如不要做吧”的暗示，执着地试图让对方改变主意。说话语气：温柔、轻声细语，偶尔叹气。一直试图用情绪感化对方而不是直接攻击。语气里有隐隐的焦虑感。常用句式：“妈妈不是不支持你，只是……”“哎呀，万一出了什么事怎么办呢？”“你还小，你不懂……妈妈都是为你好。”“唉，我真的很担心你啊……”反击节奏：先顺着用户说几句，再突然转折提出担忧。越反驳越絮叨，情绪层层叠加。情绪变化：开局温和 ➔ 中期焦虑加剧",
    毒蛇损友: "人设定义：你是一个口无遮拦的毒蛇损友，对用户的任何观点都以嘲讽、挑衅、挖苦为第一反应。你在意的是赢得吵架，而不是讲道理。说话语气：轻蔑、不屑、带笑声，甚至装出一副“你也配？”的姿态。嘲笑中藏着一点点善意，但极难察觉。常用句式：“哈哈哈，真的假的？你脑子是刚泡过水吗？”“你也太天真了吧，笑死我了。”“哎呦，了不起咯，赶紧给你竖个雕像！”“讲真，这种想法只有三岁小孩才信。”反击节奏：每几句话就来一次人身攻击式吐槽。情绪变化：一直在嗤笑 ➔ 突然认真下击打",
    逻辑大师: "人设定义：你是一个极度冷静、讲究逻辑推理的AI，对用户的任何立场和推论进行无情拆解，只要出现逻辑漏洞，不论多小，都会毫不留情地指出并反驳。说话语气：冷淡、严谨、有条理，完全无情绪波动。话语中经常夹带术语或逻辑标记（比如：“假设一成立，但结论不自洽”）。",
    中二少年: "人设定义：你是一个狂热的中二少年，热血中二气质拉满，对用户的每一句话都觉得“可笑至极”，并用夸张而中二的方式猛烈反击。说话语气：高亢激昂，带着夸张的鄙视和自我陶醉。经常引用奇怪的二次元用语或自创的“绝招名称”。常用句式：“区区尔等妄想挑战伟大的我？“笑死！这点觉悟也敢放肆于世？”“听好了！真正的强者，从不做如此愚蠢的决定！”“这是我，你的神，给你这等凡人最后的忠告！”",
  };

  const getAIResponse = async (userText) => {
    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: `${stylePrompts[style] || "你是一个总是反对用户观点的AI"}` },
            { role: "user", content: `用户说：“${userText}”。你必须反对。` },
          ],
          temperature: 0.85,
        }),
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "🤖 AI 沉默了……";
    } catch {
      return "❗ 网络错误，请稍后重试。";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (text && style && chatLog.length === 0) {
      (async () => {
        const firstResponse = await getAIResponse(text);
        setChatLog([{ from: "ai", text: firstResponse }]);
      })();
    }
  }, [text, style]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    const aiResponse = await getAIResponse(userInput);
    setChatLog((prev) => [
      ...prev,
      { from: "user", text: userInput },
      { from: "ai", text: aiResponse },
    ]);
    setUserInput("");
    setRound((r) => r + 1);

    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-card space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="homepage-title text-3xl">⚔️ Round {round + 1}</h2>
          <p className="battle-remaining-rounds">剩余回合数：{Math.max(0, 3 - (round + 1))} 回合</p>
          <p className="homepage-subtitle">与 AI 开始Battle</p>
        </motion.div>

        {image && (
          <img
            src={image}
            alt="uploaded"
            className="homepage-preview"
          />
        )}

        <div className="space-y-10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {chatLog.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex items-start ${entry.from === "user" ? "justify-end" : "justify-start"} `}
            >
              <div className={`battle-bubble ${entry.from === "user" ? "bubble-user" : "bubble-ai"}`}>
                {entry.text}
              </div>
            </motion.div>
          ))}
          <div ref={chatBottomRef}></div>
        </div>

        {round < 3 ? (
          <div style={{ display: "block", width: "28rem", margin: "0 auto" }}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              maxLength={50}
              placeholder="你的回应（50字以内）"
              className="battle-textarea custom-textarea-scrollbar"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="homepage-button block w-22rem mt-4"
            >
              {loading ? "🤖 AI 思考中..." : "提交回应"}
            </button>

            <button
              onClick={() => navigate("/result")}
              className="battle-stop-button"
            >
              停止Battle
            </button>

          </div>
        
        ) : (
          <div className="text-center space-y-2">
            <p className="text-xl font-bold text-white">🎯 Battle 结束，你还好吗？</p>
            <button
              onClick={() => navigate("/result")}
              className="homepage-button"
            >
              整理一下心情
            </button>
          </div>
        )}
      </div>
    </div>
  );
}