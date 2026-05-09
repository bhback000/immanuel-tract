import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Heart, Church, Sparkles, Loader2, MessageCircle, 
  ChevronDown, Sun, CloudRain, Anchor, UserPlus
} from 'lucide-react';

// 1. 선생님의 API 키와 설정
const apiKey = "AIzaSyB9qhkADlStOxgq1_XsUD_vJuxJ_xX9Vv0"; 
const genAI = new GoogleGenerativeAI(apiKey);

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. 에러 방지를 위한 최적화된 호출 함수
  const getGeminiComfort = async () => {
    if (!userInput.trim() || loading) return;

    setLoading(true);
    setResponse("");

    try {
      // ★ 핵심 수정: 모델명을 "gemini-1.5-flash"로 설정하고 SDK가 주소를 자동 관리하게 함
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        }
      });

      // 시스템 메시지를 질문 앞에 붙여 성격을 부여합니다.
      const prompt = `당신은 따뜻한 기독교 상담가입니다. 성경적인 위로와 짧은 기도문을 작성해주세요: ${userInput}`;
      
      const result = await model.generateContent(prompt);
      const resText = result.response.text();
      setResponse(resText);
    } catch (error) {
      console.error(error);
      // 구체적인 에러 상황을 사용자에게 알립니다.
      if (error.message.includes("not found")) {
        setResponse("안내: 현재 구글 서버에서 모델을 찾을 수 없습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        setResponse("연결이 원활하지 않습니다. 잠시 후 다시 말씀해 주시겠어요?");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- 디자인 부분 ---
  const styles = {
    section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', boxSizing: 'border-box' },
    card: { maxWidth: '800px', width: '100%', backgroundColor: 'white', borderRadius: '3.5rem', padding: '4rem 3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2.2rem', fontWeight: '700', minHeight: '350px', outline: 'none', marginBottom: '2.5rem', textAlign: 'center', fontFamily: 'inherit' }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc" }}>
      <div style={{ ...styles.section, backgroundColor: "#fffbeb", textAlign: "center" }}>
        <Sparkles style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "2.5rem" }} />
        <h1 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a" }}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
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
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <Loader2 className="animate-spin" style={{ width: "60px", height: "60px", margin: "0 auto 1rem" }} />
                  <p>위로의 말씀을 묵상 중입니다...</p>
                </div>
              ) : (
                <p style={{ fontSize: '2.2rem', color: '#fef3c7', whiteSpace: 'pre-wrap', lineHeight: '1.7', textAlign: 'left' }}>{response}</p>
              )}
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