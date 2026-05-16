import React, { useState, useEffect } from 'react';
import { Church, Sparkles, Loader2, MessageCircle } from 'lucide-react';

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // 웹사이트 주소창에서 ?key=본인의API키 를 읽어오는 기능
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    if (key) {
      setApiKey(key);
    }
  }, []);

  const getGeminiComfort = async () => {
    if (!userInput.trim() || loading) return;

    if (!apiKey) {
      setResponse("알림: 주소 뒤에 올바른 보안 키가 입력되지 않았습니다. 관리자에게 문의하세요.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      // 가장 범용적인 gemini-1.5-flash 정식 v1 주소 사용
      const apiUrl = `[https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=$](https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=$){apiKey}`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `당신은 따뜻한 기독교 상담가입니다. 다음 고민에 대해 성경적인 위로와 정성어린 짧은 기도문을 따뜻한 한국어로 작성해주세요: ${userInput}`
            }]
          }]
        })
      });

      const data = await res.json();

      if (data.error) {
        setResponse(`알림: ${data.error.message} (코드: ${data.error.status})`);
        return;
      }

      if (data.candidates && data.candidates[0].content) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse("잠시 마음의 평안을 구하고 있습니다. 다시 한번 말씀해 주시겠어요?");
      }
    } catch (error) {
      setResponse("연결에 어려움이 있습니다. 인터넷 환경을 확인하신 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', boxSizing: 'border-box' },
    textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2.2rem', fontWeight: '700', minHeight: '350px', outline: 'none', marginBottom: '2.5rem', textAlign: 'center', fontFamily: 'inherit' }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc" }}>
      <div style={{ ...styles.section, backgroundColor: "#fffbeb", textAlign: "center" }}>
        <Sparkles style="{{" width: "120px", height: color: "#f59e0b", marginBottom: "2.5rem" }}/>
        <h1 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a" }}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
      </div>

      <div style={{ ...styles.section, backgroundColor: "#0f172a", color: "white" }}>
        <MessageCircle style="{{" width: "100px", height: color: "#f59e0b", marginBottom: "3rem" }}/>
        <h2 style={{ fontSize: "4rem", fontWeight: 900, marginBottom: "2rem" }}>당신의 마음을 들려주세요</h2>
        <div style={{ maxWidth: "900px", width: "100%" }}>
          {!response && !loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="지금 어떤 기분이신가요?..." style={styles.textArea} />
              <button onClick={getGeminiComfort} style={{ width: "100%", backgroundColor: "#d97706", color: "white", padding: "2.5rem", borderRadius: "2.5rem", fontSize: "2.5rem", fontWeight: 900, border: "none", cursor: "pointer" }}>위로의 메시지 보기</button>
            </div>
          ) : (
            <div style={{ padding: '4rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3rem', width: '100%' }}>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <Loader2 className="animate-spin" style="{{" width: "60px", height: margin: "0 auto 1.5rem" }}/>
                  <p style={{ fontSize: "1.5rem" }}>말씀을 묵상 중입니다...</p>
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

      <div style={{ padding: "8rem 1.5rem", backgroundColor: "white", textAlign: "center", borderTop: "15px solid #f59e0b" }}>
        <Church style="{{" width: "100px", height: color: "#1e293b", margin: "0 auto 3rem" }}/>
        <h3 style={{ fontSize: "4.5rem", fontWeight: 900 }}>예원참된교회</h3>
      </div>
    </div>
  );
}

export default App;