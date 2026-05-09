import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Heart, Church, Sparkles, Loader2, MessageCircle, 
  ChevronDown, Sun, CloudRain, Anchor, UserPlus
} from 'lucide-react';
import { motion } from "framer-motion";

// 1. API 키 설정 (선생님의 최신 키 그대로 사용)
const apiKey = "AIzaSyB9qhkADlStOxgq1_XsUD_vJuxJ_xX9Vv0"; 
const genAI = new GoogleGenerativeAI(apiKey);

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getGeminiComfort = async () => {
    if (!userInput.trim() || loading) return;

    setLoading(true);
    setResponse("");

    try {
      // ★ 수정 포인트: 모델명 앞에 'models/'를 붙여 경로를 명확히 지정합니다.
      // v1beta 및 v1 통합 호환을 위한 가장 확실한 방법입니다.
      const model = genAI.getGenerativeModel({ 
        model: "models/gemini-1.5-flash",
        systemInstruction: "당신은 따뜻한 기독교 상담가입니다. 성경적 위로와 짧은 기도문을 작성해주세요.",
      });

      const result = await model.generateContent(userInput);
      const resText = result.response.text();
      setResponse(resText);
    } catch (error) {
      console.error("상세 에러 내용:", error);
      // 에러가 나면 사용자에게 구체적인 메시지를 노출하여 원인을 파악합니다.
      setResponse(`연결에 어려움이 있습니다. (에러내용: ${error.message.substring(0, 50)}...)`);
    } finally {
      setLoading(false);
    }
  };

  // --- 디자인 부분 (기존과 동일) ---
  const styles = {
    section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', boxSizing: 'border-box' },
    textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2rem', minHeight: '300px', outline: 'none', marginBottom: '2.5rem', textAlign: 'center' }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc" }}>
      <div style={{ ...styles.section, backgroundColor: "#fffbeb" }}>
        <Sparkles style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "2.5rem" }} />
        <h1 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a", textAlign: "center" }}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
      </div>

      <div style={{ ...styles.section, backgroundColor: "#0f172a", color: "white" }}>
        <MessageCircle style={{ width: "100px", height: "100px", color: "#f59e0b", marginBottom: "3rem" }} />
        <h2 style={{ fontSize: "4rem", fontWeight: 900, marginBottom: "2rem" }}>당신의 마음을 들려주세요</h2>
        <div style={{ maxWidth: "900px", width: "100%" }}>
          {!response && !loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="고민을 적어주세요..." style={styles.textArea} />
              <button onClick={getGeminiComfort} style={{ width: "100%", backgroundColor: "#d97706", color: "white", padding: "2.5rem", borderRadius: "2.5rem", fontSize: "2.5rem", fontWeight: 900, border: "none", cursor: "pointer" }}>위로의 메시지 보기</button>
            </div>
          ) : (
            <div style={{ padding: '4rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3rem' }}>
              {loading ? <Loader2 className="animate-spin" style={{ width: '60px', height: '60px', margin: '0 auto' }} /> : 
                <p style={{ fontSize: '2.2rem', color: '#fef3c7', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{response}</p>
              }
              {!loading && <button onClick={() => {setResponse(""); setUserInput("");}} style={{ marginTop: '3rem', color: '#fbbf24', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', textDecoration: 'underline', width: '100%' }}>다시 이야기하기</button>}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "8rem 1.5rem", backgroundColor: "white", textAlign: "center", borderTop: "15px solid #f59e0b" }}>
        <Church style={{ width: "100px", height: "100px", color: "#1e293b", margin: "0 auto 3rem" }} />
        <h3 style={{ fontSize: "4.5rem", fontWeight: 900 }}>예원참된교회</h3>
      </div>
    </div>
  );
}

export default App;