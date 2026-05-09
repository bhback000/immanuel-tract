import React, { useState } from 'react';
import { 
  Heart, Church, Sparkles, 
  Loader2, MessageCircle, 
  ChevronDown, Share2, Phone, Sun, CloudRain, Anchor, UserPlus
} from 'lucide-react';

// 1. 개인 계정 API 키와 표준 모델명 설정
const apiKey = "AIzaSyDlTHBZCLuL5M6YYlzRk5aAt7IZod-k9K4"; 
const model = "gemini-1.5-flash"; 

const styles = {
  section: { minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', borderBottom: '1px solid #e2e8f0', boxSizing: 'border-box' },
  card: { maxWidth: '800px', width: '100%', backgroundColor: 'white', borderRadius: '3.5rem', padding: '4rem 3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' },
  title: { fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem', lineHeight: '1.2', wordBreak: 'keep-all' },
  subtitle: { fontSize: '1.5rem', fontWeight: '800', color: '#b45309', letterSpacing: '0.1em', marginBottom: '2.5rem', textTransform: 'uppercase' },
  content: { fontSize: '2rem', fontWeight: '600', color: '#334155', lineHeight: '1.6', wordBreak: 'keep-all', marginBottom: '2.5rem' },
  scripture: { backgroundColor: '#fffbeb', padding: '2rem', borderRadius: '1.5rem', borderLeft: '10px solid #fbbf24', textAlign: 'left', width: '100%', marginTop: '1.5rem', boxSizing: 'border-box' },
  textArea: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', borderBottom: '5px solid rgba(255, 255, 255, 0.3)', padding: '2rem', color: 'white', fontSize: '2.2rem', fontWeight: '700', minHeight: '350px', outline: 'none', marginBottom: '2.5rem', fontFamily: 'inherit', textAlign: 'center' }
};

const Illustration = ({ type }) => {
  const iconStyle = { width: "120px", height: "120px", marginBottom: "2rem" };
  switch (type) {
    case 'creation': return <Sun style={{...iconStyle, color: "#f59e0b"}} />;
    case 'fall': return <CloudRain style={{...iconStyle, color: "#94a3b8"}} />;
    case 'redemption': return <Anchor style={{...iconStyle, color: "#92400e"}} />;
    case 'restoration': return <UserPlus style={{...iconStyle, color: "#f43f5e"}} />;
    default: return null;
  }
};

const PageSection = ({ title, subtitle, content, scripture, bg, illustration, pageNo }) => (
  <div style={{ ...styles.section, backgroundColor: bg }}>
    <div style={styles.card}>
      <span style={{ fontSize: "1rem", fontWeight: 900, color: "#d97706", letterSpacing: "0.3em", marginBottom: "1.5rem" }}>PART {pageNo}</span>
      {illustration}
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.subtitle}>{subtitle}</p>
      <div style={{ height: '2px', width: '60px', backgroundColor: '#e2e8f0', marginBottom: '2.5rem' }}></div>
      <p style={styles.content}>{content}</p>
      {scripture && (
        <div style={styles.scripture}>
          <p style={{ color: "#475569", fontStyle: "italic", fontWeight: 600, fontSize: "1.3rem", lineHeight: "1.6" }}>"{scripture}"</p>
        </div>
      )}
    </div>
  </div>
);

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getGeminiComfort = async () => {
    if (!userInput.trim()) return;
    setLoading(true); setResponse("");
    try {
      // 2. 구글 API 표준 주소 체계 (v1beta/models/모델명)
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
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
        setResponse(`알림: ${data.error.message}`);
        return;
      }

      if (data.candidates && data.candidates[0].content) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse("잠시 묵상 중입니다. 다시 시도해 주세요.");
      }
    } catch (e) { 
      setResponse("연결이 원활하지 않습니다. LTE/5G 환경에서 다시 시도해 주세요."); 
    }
    finally { setLoading(false); }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#f8fafc", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* 1. 인트로 */}
      <div style={{ ...styles.section, backgroundColor: "#fffbeb", textAlign: "center" }}>
        <Sparkles style={{ width: "120px", height: "120px", color: "#f59e0b", marginBottom: "2.5rem" }} />
        <h1 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a", marginBottom: "2rem", fontStyle: "italic" }}>진정한 복의 회복,<br /><span style={{ color: "#d97706" }}>임마누엘</span></h1>
        <p style={{ fontSize: "2rem", fontWeight: 700, color: "#64748b" }}>하나님이 당신과 함께하십니다.</p>
        <ChevronDown style={{ width: "60px", height: "60px", color: "#cbd5e1", marginTop: "4rem" }} />
      </div>

      {/* 2. 복음 설명 섹션들 */}
      <PageSection pageNo="1" title="1. 진정한 복의 시작" subtitle="THE CREATION" bg="#eff6ff" illustration={<Illustration type="creation" />} scripture="하나님이 그들에게 복을 주시며... (창세기 1:28)" content="진정한 복은 소유의 넉넉함이 아니라, 창조주 하나님과 마주하며 함께 걷는 임마누엘의 상태입니다." />
      <PageSection pageNo="2" title="2. 상실된 행복" subtitle="THE FALL" bg="#f1f5f9" illustration={<Illustration type="fall" />} scripture="죄의 삯은 사망이요... (로마서 6:23)" content="인간은 자기 노력으로 행복하려 하나님을 떠났습니다. 그러나 복의 근원을 떠난 삶의 끝은 결국 고통과 절망뿐입니다." />
      <PageSection pageNo="3" title="3. 찾아오신 하나님" subtitle="THE REDEMPTION" bg="#fffbeb" illustration={<Illustration type="redemption" />} scripture="그의 이름은 임마누엘이라 하리라... (마태복음 1:23)" content="예수 그리스도는 당신의 모든 아픔을 짊어지시고, 하나님과 다시 동행할 길을 여셨습니다." />
      <PageSection pageNo="4" title="4. 영접과 새로운 삶" subtitle="THE RESTORATION" bg="#fdf2f8" illustration={<Illustration type="restoration" />} scripture="영접하는 자 곧 그 이름을 믿는 자들에게는 하나님의 자녀가 되는 권세를 주셨으니 (요한복음 1:12)" content="예수님을 나의 구주로 모실 때, 어떤 고난도 이기는 진정한 평안이 시작됩니다." />

      {/* 3. AI 위로 대화 섹션 */}
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
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Loader2 className="animate-spin" style={{ width: '50px', height: '50px', margin: '0 auto 1rem' }} />
                  <p>하늘의 위로를 구하는 중입니다...</p>
                </div>
              ) : (
                <p style={{ fontSize: '2.2rem', fontStyle: 'italic', color: '#fef3c7', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{response}</p>
              )}
              <button onClick={() => {setResponse(""); setUserInput("");}} style={{ marginTop: '2rem', color: '#fbbf24', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>다시 이야기하기</button>
            </div>
          )}
        </div>
      </div>

      {/* 4. 푸터(교회 정보) */}
      <div style={{ padding: "8rem 1.5rem", backgroundColor: "white", textAlign: "center", borderTop: "15px solid #f59e0b", width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Church style={{ width: "120px", height: "120px", color: "#1e293b", marginBottom: "3rem" }} />
        <h3 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#0f172a", marginBottom: "1.5rem" }}>예원참된교회</h3>
        <p style={{ fontSize: "2rem", fontWeight: 700, color: "#64748b" }}>부천시 소사구 경인로 70, 농협건물 5층</p>
        <p style={{ fontSize: "1.8rem", color: "#94a3b8", marginTop: "2rem" }}>문의: 032-661-0191</p>
      </div>
    </div>
  );
}

export default App;