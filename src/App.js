import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Heart, Church, Sparkles, Loader2, MessageCircle, 
  ChevronDown, Sun, CloudRain, Anchor, UserPlus, Send 
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// 1. 선생님의 최신 API 키 (AI Studio에서 발급받은 새 키)
const apiKey = "AIzaSyB9qhkADlStOxgq1_XsUD_vJuxJ_xX9Vv0"; 
const genAI = new GoogleGenerativeAI(apiKey);

// 2. 스타일 설정
const styles = {
  section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', boxSizing: 'border-box' },
  card: { maxWidth: '800px', width: '100%', backgroundColor: 'white', borderRadius: '3.5rem', padding: '4rem 3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  title: { fontSize: '4.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '2rem', textAlign: 'center' },
  textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2rem', fontWeight: '700', minHeight: '300px', outline: 'none', marginBottom: '2.5rem', textAlign: 'center', fontFamily: 'inherit' }
};

// 3. 복음 설명 컴포넌트
const PageSection = ({ title, content, bg, icon: Icon, color }) => (
  <div style={{ ...styles.section, backgroundColor: bg }}>
    <div style={styles.card}>
      <Icon style={{ width: "100px", height: "100px", color: color, marginBottom: "2rem" }} />
      <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>{title}</h2>
      <p style={{ fontSize: "2rem", fontWeight: 600, color: "#334155", lineHeight: "1.6", wordBreak: "keep-all" }}>{content}</p>
    </div>
  </div>
);

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 4. AI 상담 함수 (SDK 방식)
  const getGeminiComfort = async () => {
    if (!userInput.trim() || loading) return;

    setLoading(true);
    setResponse("");

    try {
      // 모델 설정 (시스템 지침 포함)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "당신은 따뜻하고 공감 능력이 뛰어난 '기독교 상담가'입니다. 사용자의 고민을 경청하고, 성경적인 위로의 말씀과 함께 따뜻한 기도문을 작성해주세요. 말투는 부드러운 한국어(해요체)를 사용하세요.",
      });

      const result = await model.generateContent(userInput);
      const resText = result.response.text();
      setResponse(resText);
    } catch (error) {
      console.error(error);
      setResponse("죄송합니다. 잠시 마음의 통로가 원활하지 않네요. 다시 한번 말씀해 주시겠어요? (만약 계속된다면 API 활성화 상태를 확인해 주세요.)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc" }}>
      {/* 인트로 */}
      <div style={{ ...styles.section, backgroundColor: "#fffbeb" }}>
        <Sparkles style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "2.5rem" }} />
        <h1 style={styles.title}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
        <p style={{ fontSize: "2rem", fontWeight: 700, color: "#64748b" }}>하나님이 당신과 함께하십니다.</p>
        <ChevronDown style={{ width: "60px", height: "60px", color: "#cbd5e1", marginTop: "4rem" }} />
      </div>

      {/* 복음 메시지 섹션 */}
      <PageSection title="진정한 복의 시작" content="하나님과 함께 걷는 것이 인간에게 가장 큰 행복입니다." bg="#eff6ff" icon={Sun} color="#f59e0b" />
      <PageSection title="상실된 행복" content="하나님을 떠난 인간은 스스로 복을 찾으려 하지만 결국 공허함뿐입니다." bg="#f1f5f9" icon={CloudRain} color="#94a3b8" />
      <PageSection title="찾아오신 하나님" content="예수 그리스도가 우리를 다시 하나님께로 인도하는 유일한 길입니다." bg="#fffbeb" icon={Anchor} color="#92400e" />

      {/* AI 상담 섹션 */}
      <div style={{ ...styles.section, backgroundColor: "#0f172a", color: "white" }}>
        <MessageCircle style={{ width: "100px", height: "100px", color: "#f59e0b", marginBottom: "3rem" }} />
        <h2 style={{ fontSize: "4rem", fontWeight: 900, marginBottom: "2rem" }}>당신의 마음을 들려주세요</h2>
        
        <div style={{ maxWidth: "900px", width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!response && !loading ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <textarea 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                placeholder="지금 고민이나 기도가 필요한 내용을 적어주세요..." 
                style={styles.textArea} 
              />
              <button 
                onClick={getGeminiComfort} 
                style={{ width: "100%", backgroundColor: "#d97706", color: "white", padding: "2.5rem", borderRadius: "2.5rem", fontSize: "2.5rem", fontWeight: 900, border: "none", cursor: "pointer" }}
              >
                위로의 메시지 보기
              </button>
            </div>
          ) : (
            <div style={{ width: '100%', padding: '4rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3rem' }}>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Loader2 className="animate-spin" style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem' }} />
                  <p style={{ fontSize: '1.5rem' }}>하늘의 평안을 구하고 있습니다...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: '2.2rem', fontStyle: 'italic', color: '#fef3c7', whiteSpace: 'pre-wrap', lineHeight: '1.7', textAlign: 'left' }}
                >
                  {response}
                  <button 
                    onClick={() => {setResponse(""); setUserInput("");}} 
                    style={{ marginTop: '3rem', color: '#fbbf24', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', textDecoration: 'underline', width: '100%' }}
                  >
                    다시 이야기하기
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <div style={{ padding: "8rem 1.5rem", backgroundColor: "white", textAlign: "center", borderTop: "15px solid #f59e0b" }}>
        <Church style={{ width: "100px", height: "100px", color: "#1e293b", margin: "0 auto 3rem" }} />
        <h3 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a", marginBottom: "1.5rem" }}>예원참된교회</h3>
        <p style={{ fontSize: "2rem", fontWeight: 700, color: "#64748b" }}>부천시 소사구 경인로 70, 농협건물 5층</p>
      </div>
    </div>
  );
}

export default App;