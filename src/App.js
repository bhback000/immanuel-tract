import React, { useState } from 'react';
import { 
  Heart, Church, Sparkles, 
  Loader2, MessageCircle, 
  ChevronDown, Share2, Phone, Sun, CloudRain, Anchor, UserPlus
} from 'lucide-react';

// 개인 계정 API 키 (선생님이 주신 키)
const apiKey = "AIzaSyDlTHBZCLuL5M6YYlzRk5aAt7IZod-k9K4"; 
// 모델명을 최신 규격인 gemini-1.5-flash 로 고정합니다.
const modelName = "gemini-1.5-flash"; 

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getGeminiComfort = async () => {
    if (!userInput.trim()) return;
    setLoading(true); setResponse("");
    try {
      // ★ 핵심 수정: v1beta 대신 v1을 사용하고, 경로 구조를 단순화했습니다.
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `당신은 따뜻한 기독교 상담가입니다. 다음 고민에 대해 성경적인 위로와 짧은 기도문을 따뜻하게 작성해주세요: ${userInput}`
            }]
          }]
        })
      });

      const data = await res.json();
      
      if (data.error) {
        // 에러 발생 시 사용자에게 친절하게 안내하고 상세 내용을 로그에 남깁니다.
        console.error("상세 에러:", data.error);
        setResponse(`안내: 현재 서비스 최적화 중입니다. 잠시 후 다시 시도해 주세요. (사유: ${data.error.message})`);
        return;
      }

      if (data.candidates && data.candidates[0].content) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse("마음을 담아 묵상 중입니다. 다시 한 번 말씀해 주시겠어요?");
      }
    } catch (e) { 
      setResponse("네트워크 연결이 불안정합니다. LTE/5G 환경에서 확인 부탁드립니다."); 
    }
    finally { setLoading(false); }
  };

  // 디자인 스타일 (기존 유지)
  const styles = {
    section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', borderBottom: '1px solid #e2e8f0', boxSizing: 'border-box' },
    card: { maxWidth: '800px', width: '100%', backgroundColor: 'white', borderRadius: '3.5rem', padding: '4rem 3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    title: { fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem', lineHeight: '1.2' },
    textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2.2rem', fontWeight: '700', minHeight: '350px', outline: 'none', marginBottom: '2.5rem', textAlign: 'center' }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ ...styles.section, backgroundColor: "#fffbeb", textAlign: "center" }}>
        <Sparkles style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "2.5rem" }} />
        <h1 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a" }}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
      </div>

      <div style={{ ...styles.section, backgroundColor: "#0f172a", color: "white" }}>
        <MessageCircle style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "3rem" }} />
        <h2 style={{ fontSize: "4rem", fontWeight: 900, marginBottom: "1.5rem" }}>당신의 마음을 들려주세요</h2>
        <div style={{ maxWidth: "900px", width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!response && !loading ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="마음을 적어주세요..." style={styles.textArea} />
              <button onClick={getGeminiComfort} style={{ width: "100%", backgroundColor: "#d97706", color: "white", padding: "2.5rem", borderRadius: "2.5rem", fontSize: "2.5rem", fontWeight: 900, border: "none", cursor: "pointer" }}>위로의 메시지 보기</button>
            </div>
          ) : (
            <div style={{ width: '100%', padding: '3rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3rem' }}>
              {loading ? <Loader2 className="animate-spin" style={{ width: '50px', height: '50px', margin: '0 auto' }} /> : <p style={{ fontSize: '2.2rem', fontStyle: 'italic', color: '#fef3c7', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{response}</p>}
              <button onClick={() => {setResponse(""); setUserInput("");}} style={{ marginTop: '2rem', color: '#fbbf24', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>다시 이야기하기</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "8rem 1.5rem", backgroundColor: "white", textAlign: "center", borderTop: "15px solid #f59e0b", width: '100%' }}>
        <Church style={{ width: "100px", height: "100px", color: "#1e293b", margin: "0 auto 2rem" }} />
        <h3 style={{ fontSize: "4rem", fontWeight: 900 }}>예원참된교회</h3>
        <p style={{ fontSize: "1.8rem", color: "#64748b" }}>부천시 소사구 경인로 70, 5층</p>
      </div>
    </div>
  );
}

export default App;