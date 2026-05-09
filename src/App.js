import React, { useState } from 'react';
import { 
  Heart, Church, Sparkles, 
  Loader2, MessageCircle, 
  ChevronDown, Share2, Phone, Sun, CloudRain, Anchor, UserPlus
} from 'lucide-react';

// 선생님이 새로 주신 개인 계정 API 키 적용
const apiKey = "AIzaSyDlTHBZCLuL5M6YYlzRk5aAt7IZod-k9K4"; 
const model = "gemini-1.5-flash"; 

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getGeminiComfort = async () => {
    if (!userInput.trim()) return;
    setLoading(true); setResponse("");
    try {
      // 가장 안정적인 v1 경로 사용
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `당신은 따뜻한 기독교 상담가입니다. 다음 고민에 대해 성경적인 위로와 짧은 기도문을 정성껏 작성해주세요: ${userInput}`
            }]
          }]
        })
      });

      const data = await res.json();
      
      // 구글 서버에서 에러 응답을 보낸 경우
      if (data.error) {
        setResponse(`에러 발생: ${data.error.message} (코드: ${data.error.code})`);
        return;
      }

      // 정상 응답 출력
      if (data.candidates && data.candidates[0].content) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse("따뜻한 마음으로 묵상 중입니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (e) { 
      setResponse("네트워크 연결에 문제가 있습니다. LTE/5G 환경인지 확인해 주세요."); 
    }
    finally { setLoading(false); }
  };

  // --- 아래는 전도지 디자인 및 레이아웃 (수정 불필요) ---
  const styles = {
    section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', borderBottom: '1px solid #e2e8f0', boxSizing: 'border-box' },
    card: { maxWidth: '800px', width: '100%', backgroundColor: 'white', borderRadius: '3.5rem', padding: '4rem 3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    title: { fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem', lineHeight: '1.2' },
    textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2.2rem', fontWeight: '700', minHeight: '300px', outline: 'none', marginBottom: '2.5rem', textAlign: 'center' }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ ...styles.section, backgroundColor: "#fffbeb", textAlign: "center" }}>
        <Sparkles style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "2.5rem" }} />
        <h1 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a" }}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
        <p style={{ fontSize: "2rem", fontWeight: 700, color: "#64748b" }}>하나님이 당신과 함께하십니다.</p>
        <ChevronDown style={{ width: "60px", height: "60px", color: "#cbd5e1", marginTop: "4rem" }} />
      </div>

      <div style={{ ...styles.section, backgroundColor: "#0f172a", color: "white" }}>
        <MessageCircle style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "3rem" }} />
        <h2 style={{ fontSize: "4rem", fontWeight: 900, marginBottom: "1.5rem" }}>당신의 마음을 들려주세요</h2>
        <div style={{ maxWidth: "900px", width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!response && !loading ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="고민이나 기도가 필요한 내용을 적어주세요..." style={styles.textArea} />
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