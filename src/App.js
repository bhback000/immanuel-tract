import React, { useState } from 'react';
import { 
  Heart, Church, Sparkles, Loader2, MessageCircle, 
  ChevronDown, Sun, CloudRain, Anchor, UserPlus
} from 'lucide-react';

// 1. 선생님의 최신 API 키와 '최신 고정 모델명' 설정
const apiKey = "AIzaSyB9qhkADlStOxgq1_XsUD_vJuxJ_xX9Vv0"; 
// 모델명 뒤에 -latest를 붙여서 경로 인식을 가장 확실하게 만듭니다.
const modelName = "gemini-1.5-flash-latest"; 

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getGeminiComfort = async () => {
    if (!userInput.trim() || loading) return;

    setLoading(true);
    setResponse("");

    try {
      // 2. [핵심] v1beta 주소와 models/ 경로를 결합한 구글 API 표준 규격입니다.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `당신은 따뜻한 기독교 상담가입니다. 다음 고민에 대해 성경적인 위로와 정성어린 짧은 기도문을 따뜻하게 작성해주세요: ${userInput}`
            }]
          }]
        })
      });

      const data = await res.json();

      // 구글 서버에서 에러를 보낸 경우
      if (data.error) {
        setResponse(`알림: ${data.error.message} (에러코드: ${data.error.status})`);
        return;
      }

      // 정상적인 응답 출력
      if (data.candidates && data.candidates[0].content) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse("잠시 마음의 평안을 구하고 있습니다. 다시 한번 말씀해 주시겠어요?");
      }
    } catch (error) {
      console.error(error);
      setResponse("연결에 어려움이 있습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // --- 디자인 레이아웃 (선생님의 전도지 스타일 유지) ---
  const styles = {
    section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', boxSizing: 'border-box' },
    card: { maxWidth: '800px', width: '100%', backgroundColor: 'white', borderRadius: '3.5rem', padding: '4rem 3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    title: { fontSize: '4.5rem', fontWeight: 900, color: '#0f172a', textAlign: 'center', lineHeight: '1.2' },
    textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2.2rem', fontWeight: '700', minHeight: '350px', outline: 'none', marginBottom: '2.5rem', textAlign: 'center', fontFamily: 'inherit' }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc" }}>
      {/* 1. 인트로 섹션 */}
      <div style={{ ...styles.section, backgroundColor: "#fffbeb" }}>
        <Sparkles style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "2.5rem" }} />
        <h1 style={styles.title}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
        <p style={{ fontSize: "2rem", fontWeight: 700, color: "#64748b" }}>하나님이 당신과 함께하십니다.</p>
        <ChevronDown style={{ width: "60px", height: "60px", color: "#cbd5e1", marginTop: "4rem" }} />
      </div>

      {/* 2. 복음 설명 섹션 */}
      <div style={{ ...styles.section, backgroundColor: "#eff6ff" }}>
        <div style={styles.card}>
          <Sun style={{ width: "100px", height: "100px", color: "#f59e0b", marginBottom: "2rem" }} />
          <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>1. 진정한 복의 시작</h2>
          <p style={{ fontSize: "2rem", color: "#334155", fontWeight: 600 }}>하나님과 함께 걷는 것이 인간에게 가장 큰 행복입니다.</p>
        </div>
      </div>

      {/* 3. AI 상담 섹션 */}
      <div style={{ ...styles.section, backgroundColor: "#0f172a", color: "white" }}>
        <MessageCircle style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "3rem" }} />
        <h2 style={{ fontSize: "4rem", fontWeight: 900, marginBottom: "2rem" }}>당신의 마음을 들려주세요</h2>
        <div style={{ maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {!response && !loading ? (
            <>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="고민을 적어주세요..." style={styles.textArea} />
              <button onClick={getGeminiComfort} style={{ width: "100%", backgroundColor: "#d97706", color: "white", padding: "2.5rem", borderRadius: "2.5rem", fontSize: "2.5rem", fontWeight: 900, border: "none", cursor: "pointer" }}>위로의 메시지 보기</button>
            </>
          ) : (
            <div style={{ padding: '4rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3rem', width: '100%' }}>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <Loader2 className="animate-spin" style={{ width: "60px", height: "60px", margin: "0 auto 1.5rem" }} />
                  <p style={{ fontSize: "1.5rem" }}>위로의 말씀을 묵상 중입니다...</p>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: '2.2rem', color: '#fef3c7', whiteSpace: 'pre-wrap', lineHeight: '1.7', textAlign: 'left', fontStyle: 'italic' }}>{response}</p>
                  <button onClick={() => {setResponse(""); setUserInput("");}} style={{ marginTop: '3rem', color: '#fbbf24', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', textDecoration: 'underline', width: '100%' }}>다시 이야기하기</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. 푸터 */}
      <div style={{ padding: "8rem 1.5rem", backgroundColor: "white", textAlign: "center", borderTop: "15px solid #f59e0b" }}>
        <Church style={{ width: "100px", height: "100px", color: "#1e293b", margin: "0 auto 3rem" }} />
        <h3 style={{ fontSize: "4.5rem", fontWeight: 900 }}>예원참된교회</h3>
        <p style={{ fontSize: "2rem", color: "#64748b", fontWeight: 700 }}>부천시 소사구 경인로 70, 5층</p>
      </div>
    </div>
  );
}

export default App;