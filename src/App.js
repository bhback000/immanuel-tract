import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Heart, Church, Sparkles, Loader2, MessageCircle, 
  ChevronDown, Sun, CloudRain, Anchor, UserPlus, Send 
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// 1. 선생님의 API 키와 설정
const apiKey = "AIzaSyB9qhkADlStOxgq1_XsUD_vJuxJ_xX9Vv0"; 
const genAI = new GoogleGenerativeAI(apiKey);

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. AI 상담 함수 (SDK 방식)
  const getGeminiComfort = async () => {
    if (!userInput.trim() || loading) return;

    setLoading(true);
    setResponse("");

    try {
      // 모델 설정 (시스템 인스트럭션 포함)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "당신은 따뜻하고 공감 능력이 뛰어난 '기독교 상담가'입니다. 성경적인 위로와 함께 사용자를 위한 짧은 기도문을 따뜻한 한국어(해요체)로 작성해주세요.",
      });

      const result = await model.generateContent(userInput);
      const resText = result.response.text();
      setResponse(resText);
    } catch (error) {
      console.error(error);
      setResponse("잠시 마음이 가로막힌 것 같아요. 다시 한번 말씀해 주시겠어요? (에러가 지속되면 API 키 활성화를 확인해주세요)");
    } finally {
      setLoading(false);
    }
  };

  // 디자인 스타일
  const styles = {
    section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', boxSizing: 'border-box' },
    textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '1.8rem', minHeight: '200px', outline: 'none', marginBottom: '2rem', textAlign: 'center' }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc" }}>
      {/* 메인 헤더 */}
      <div style={{ ...styles.section, backgroundColor: "#fffbeb" }}>
        <Sparkles style={{ width: "100px", height: "100px", color: "#f59e0b", marginBottom: "2rem" }} />
        <h1 style={{ fontSize: "4rem", fontWeight: 900, textAlign: "center" }}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
        <p style={{ fontSize: "1.5rem", color: "#64748b" }}>하나님이 당신과 함께하십니다.</p>
        <ChevronDown style={{ marginTop: "3rem", animate: "bounce" }} />
      </div>

      {/* 상담 섹션 */}
      <div id="talk" style={{ ...styles.section, backgroundColor: "#0f172a", color: "white" }}>
        <MessageCircle style={{ width: "80px", height: "80px", color: "#f59e0b", marginBottom: "2rem" }} />
        <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>당신의 마음을 들려주세요</h2>
        
        <div style={{ maxWidth: "800px", width: "100%" }}>
          {!response && !loading ? (
            <>
              <textarea 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="지금 어떤 기분이신가요? 편하게 이야기해 주세요." 
                style={styles.textArea}
              />
              <button 
                onClick={getGeminiComfort}
                style={{ width: "100%", padding: "2rem", borderRadius: "1rem", backgroundColor: "#d97706", color: "white", fontSize: "1.5rem", fontWeight: "bold", border: "none", cursor: "pointer" }}
              >
                위로의 메시지 받기
              </button>
            </>
          ) : (
            <div style={{ padding: "2rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "2rem" }}>
              {loading ? (
                <div style={{ textAlign: "center" }}><Loader2 style={{ animate: "spin", margin: "0 auto" }} /> <p>마음을 듣고 있습니다...</p></div>
              ) : (
                <div style={{ fontSize: "1.6rem", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
                  {response}
                  <button 
                    onClick={() => {setResponse(""); setUserInput("");}}
                    style={{ display: "block", marginTop: "2rem", color: "#fbbf24", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    다시 이야기하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <div style={{ padding: "5rem", textAlign: "center", backgroundColor: "white" }}>
        <Church style={{ width: "60px", height: "60px", marginBottom: "1rem" }} />
        <h3 style={{ fontSize: "2.5rem" }}>예원참된교회</h3>
        <p>부천시 소사구 경인로 70, 5층</p>
      </div>
    </div>
  );
}

export default App;