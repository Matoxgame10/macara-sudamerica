import { useState, useEffect } from "react";

const BOMBO1 = [
  { name: "River Plate", country: "ARG", flag: "🇦🇷" },
  { name: "Racing Club", country: "ARG", flag: "🇦🇷" },
  { name: "América de Cali", country: "COL", flag: "🇨🇴" },
  { name: "São Paulo", country: "BRA", flag: "🇧🇷" },
  { name: "Atlético Mineiro", country: "BRA", flag: "🇧🇷" },
  { name: "Grêmio", country: "BRA", flag: "🇧🇷" },
  { name: "Olimpia", country: "PAR", flag: "🇵🇾" },
  { name: "Santos", country: "BRA", flag: "🇧🇷" },
];

const BOMBO2 = [
  { name: "Millonarios", country: "COL", flag: "🇨🇴" },
  { name: "San Lorenzo", country: "ARG", flag: "🇦🇷" },
  { name: "Bragantino", country: "BRA", flag: "🇧🇷" },
  { name: "Palestino", country: "CHI", flag: "🇨🇱" },
  { name: "Caracas FC", country: "VEN", flag: "🇻🇪" },
  { name: "Vasco da Gama", country: "BRA", flag: "🇧🇷" },
  { name: "Tigre", country: "ARG", flag: "🇦🇷" },
  { name: "Cienciano", country: "PER", flag: "🇵🇪" },
];

const BOMBO4 = [
  { name: "Alianza Atlético", country: "PER", flag: "🇵🇪" },
  { name: "Barracas Central", country: "ARG", flag: "🇦🇷" },
  { name: "Dep. Riestra", country: "ARG", flag: "🇦🇷" },
  { name: "Recoleta", country: "PAR", flag: "🇵🇾" },
  { name: "Barcelona SC", country: "ECU", flag: "🇪🇨", pending: true },
  { name: "Botafogo", country: "BRA", flag: "🇧🇷", pending: true },
  { name: "Ind. Medellín", country: "COL", flag: "🇨🇴", pending: true },
  { name: "Juventud", country: "URU", flag: "🇺🇾", pending: true },
  { name: "O'Higgins", country: "CHI", flag: "🇨🇱", pending: true },
  { name: "Dep. Tolima", country: "COL", flag: "🇨🇴", pending: true },
  { name: "Sporting Cristal", country: "PER", flag: "🇵🇪", pending: true },
  { name: "Carabobo FC", country: "VEN", flag: "🇻🇪", pending: true },
];

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
  }

  .app-wrapper {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(155deg,#081410 0%,#0c1e16 45%,#091510 100%);
    font-family: 'Trebuchet MS', Tahoma, sans-serif;
    color: #fff;
    padding-bottom: 60px;
  }

  .header {
    background: linear-gradient(90deg,#143520,#0e5228,#143520);
    border-bottom: 3px solid #f0cc1a;
    padding: 16px 20px;
    text-align: center;
    width: 100%;
  }

  .page-content {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 28px 24px;
  }

  /* Teams grid: auto-fill columns, min 160px each */
  .teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
  }

  .team-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 2px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: #e8e8e8;
    font-family: inherit;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.18s;
    text-align: left;
    position: relative;
    width: 100%;
  }
  .team-btn.selected {
    background: linear-gradient(135deg,#b8960a,#f0cc1a);
    border-color: #f0cc1a;
    color: #111;
    font-weight: 800;
    transform: scale(1.03);
  }
  .team-btn .flag { font-size: 22px; flex-shrink: 0; }
  .team-btn .team-name { line-height: 1.25; }
  .team-btn .team-country { font-size: 10px; opacity: 0.65; }
  .team-btn .pending-badge {
    position: absolute; top: 4px; right: 5px;
    font-size: 9px;
    background: rgba(255,140,0,0.2);
    border: 1px solid rgba(255,140,0,0.45);
    border-radius: 4px; padding: 1px 4px; color: #ffaa44;
  }

  /* Progress pills */
  .progress-pills {
    display: flex;
    gap: 8px;
    margin-bottom: 26px;
  }
  .pill {
    flex: 1; padding: 8px 6px; text-align: center;
    border-radius: 8px; font-size: 13px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pill.done {
    background: rgba(240,204,26,0.12);
    border-color: #f0cc1a;
    color: #f0cc1a;
  }

  /* Home card */
  .home-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 28px;
    max-width: 420px;
    margin: 0 auto;
  }

  /* Result card */
  .result-card {
    background: rgba(255,255,255,0.04);
    border: 2px solid rgba(240,204,26,0.3);
    border-radius: 16px;
    padding: 28px;
    max-width: 520px;
    margin: 0 auto 28px;
    text-align: left;
  }

  /* Rankings row */
  .rank-row {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }
  .rank-teams {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    flex: 1;
  }
  .rank-badge {
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 13px;
  }

  /* Bombo header */
  .bombo-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .bombo-tag {
    border-radius: 8px;
    padding: 5px 16px;
    font-weight: 900;
    font-size: 13px;
    letter-spacing: 2px;
    color: #fff;
  }

  /* Nav */
  .nav-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: #bbb;
    border-radius: 8px;
    padding: 5px 14px;
    font-size: 12px;
    cursor: pointer;
    font-weight: 400;
    font-family: inherit;
  }
  .nav-btn.active {
    background: rgba(240,204,26,0.18);
    border-color: #f0cc1a;
    color: #f0cc1a;
    font-weight: 700;
  }

  /* Name input */
  .name-input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 2px solid rgba(240,204,26,0.35);
    background: rgba(255,255,255,0.07);
    color: #fff;
    font-size: 16px;
    outline: none;
    font-family: inherit;
  }
  .name-input.error { border-color: #ff6b6b; }

  /* CTA button */
  .cta-btn {
    width: 100%; margin-top: 16px; padding: 14px;
    background: linear-gradient(135deg,#b8960a,#f0cc1a);
    border: none; border-radius: 10px;
    font-size: 16px; font-weight: 900; cursor: pointer;
    color: #111; letter-spacing: 1px;
    font-family: inherit;
  }
  .submit-btn {
    padding: 16px 52px;
    border: none; border-radius: 12px;
    font-size: 17px; font-weight: 900;
    letter-spacing: 1px; font-family: inherit;
  }
  .action-btn {
    padding: 12px 26px; border: none; border-radius: 10px;
    font-size: 14px; font-weight: 700; cursor: pointer;
    color: #fff; font-family: inherit;
  }

  /* Responsive tweaks */
  @media (max-width: 600px) {
    .page-content { padding: 20px 14px; }
    .teams-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
    .progress-pills { flex-direction: column; }
    .result-card { padding: 18px; }
    .rank-row { flex-direction: column; align-items: flex-start; }
  }

  @media (min-width: 900px) {
    .teams-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
    .home-card { padding: 36px; }
  }
`;

export default function App() {
  const [step, setStep] = useState("home");
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState("");
  const [selected, setSelected] = useState({ b1: null, b2: null, b4: null });
  const [predictions, setPredictions] = useState([]);
  const [myPrediction, setMyPrediction] = useState(null);

  useEffect(() => { loadPredictions(); }, []);

  async function loadPredictions() {
    try {
      const result = await window.storage.get("macara_predictions_v2", true);
      if (result) setPredictions(JSON.parse(result.value));
    } catch {}
  }

  async function savePrediction() {
    const entry = {
      name: userName.trim(),
      b1: selected.b1, b2: selected.b2, b4: selected.b4,
      date: new Date().toLocaleDateString("es-EC"),
    };
    const updated = [
      ...predictions.filter(p => p.name.toLowerCase() !== entry.name.toLowerCase()),
      entry,
    ];
    try {
      await window.storage.set("macara_predictions_v2", JSON.stringify(updated), true);
      setPredictions(updated);
      setMyPrediction(entry);
      setStep("result");
    } catch { alert("Error al guardar. Intenta de nuevo."); }
  }

  function handleStart() {
    const name = userName.trim();
    if (!name || name.length < 2) { setNameError("Ingresa tu nombre (mínimo 2 caracteres)"); return; }
    setNameError("");
    setStep("pick");
  }

  const canSubmit = selected.b1 && selected.b2 && selected.b4;

  function TeamCard({ team, isSel, onSelect }) {
    return (
      <button onClick={onSelect} className={`team-btn${isSel ? " selected" : ""}`}>
        <span className="flag">{team.flag}</span>
        <div>
          <div className="team-name">{team.name}</div>
          <div className="team-country">{team.country}</div>
        </div>
        {team.pending && <span className="pending-badge">pendiente</span>}
      </button>
    );
  }

  function BomboSection({ number, accent, teams, selKey, label }) {
    return (
      <div style={{ marginBottom: 32 }}>
        <div className="bombo-header">
          <div className="bombo-tag" style={{ background: accent }}>BOMBO {number}</div>
          <span style={{ fontSize: 12, color: "#5a8070" }}>{label}</span>
          {selected[selKey] && (
            <span style={{ marginLeft: "auto", color: "#f0cc1a", fontSize: 13, fontWeight: 700 }}>
              ✓ {selected[selKey].name}
            </span>
          )}
        </div>
        <div className="teams-grid">
          {teams.map(t => (
            <TeamCard key={t.name} team={t}
              isSel={selected[selKey]?.name === t.name}
              onSelect={() => setSelected(s => ({ ...s, [selKey]: t }))} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="app-wrapper">

        {/* HEADER */}
        <div className="header">
          <div style={{ fontSize: 10, letterSpacing: 5, color: "#f0cc1a", textTransform: "uppercase", marginBottom: 2 }}>
            ⚽ Predicción Fan Celeste Panasmac ⚽
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2 }}>MACARÁ</div>
          <div style={{ fontSize: 13, color: "#8dc4a2", letterSpacing: 4, marginTop: 1 }}>
            COPA SUDAMERICANA 2026
          </div>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 8 }}>
            {[["home","Inicio"],["rankings",`🏆 Predicciones (${predictions.length})`]].map(([s,lbl]) => (
              <button key={s} className={`nav-btn${step === s ? " active" : ""}`}
                onClick={() => { if (s === "rankings") loadPredictions(); setStep(s); }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        <div className="page-content">

          {/* HOME */}
          {step === "home" && (
            <div style={{ textAlign: "center", paddingTop: 16 }}>
              <div style={{
                width: 96, height: 96, borderRadius: "50%",
                background: "linear-gradient(135deg,#185e2e,#0c3a1c)",
                border: "4px solid #f0cc1a",
                margin: "0 auto 20px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 46,
              }}>⚽</div>

              <h1 style={{ fontSize: 26, fontWeight: 900, color: "#f0cc1a", marginBottom: 10 }}>
                ¿Qué grupo le tocará a Macará?
              </h1>
              <p style={{ color: "#8dc4a2", fontSize: 15, maxWidth: 520, margin: "0 auto 12px" }}>
                Macará quedó en el <strong style={{color:"#fff"}}>Bombo 3</strong>. Elige un rival del Bombo 1, uno del Bombo 2 y uno del Bombo 4 para completar el grupo predicho.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 30, flexWrap: "wrap" }}>
                {[["🟩 B1","Cabezas de serie"],["🟦 B2","Segundo pelotón"],["🟥 B4","Fase previa / Libertadores"]].map(([b,d]) => (
                  <div key={b} style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#8dc4a2",
                  }}><strong style={{color:"#fff"}}>{b}</strong> {d}</div>
                ))}
              </div>

              <div className="home-card">
                <label style={{ display: "block", textAlign: "left", marginBottom: 8, color: "#8dc4a2", fontSize: 14 }}>
                  Tu nombre:
                </label>
                <input
                  className={`name-input${nameError ? " error" : ""}`}
                  value={userName}
                  onChange={e => { setUserName(e.target.value); setNameError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleStart()}
                  placeholder="Ingresa tu nombre..."
                />
                {nameError && <div style={{ color: "#ff6b6b", fontSize: 12, marginTop: 6, textAlign: "left" }}>{nameError}</div>}
                <button className="cta-btn" onClick={handleStart}>HACER MI PREDICCIÓN →</button>
              </div>
            </div>
          )}

          {/* PICK */}
          {step === "pick" && (
            <div>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 22,
                background: "rgba(240,204,26,0.07)", border: "1px solid rgba(240,204,26,0.2)",
                borderRadius: 12, padding: "12px 16px",
              }}>
                <span style={{ fontSize: 24 }}>👋</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    Hola, <span style={{ color: "#f0cc1a" }}>{userName}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#5a8070" }}>
                    Elige un rival de cada bombo para completar el grupo de Macará
                  </div>
                </div>
              </div>

              <div className="progress-pills">
                {[["b1","Bombo 1"],["b2","Bombo 2"],["b4","Bombo 4"]].map(([key,lbl]) => (
                  <div key={key} className={`pill${selected[key] ? " done" : ""}`}>
                    {selected[key] ? `✓ ${selected[key].name}` : lbl}
                  </div>
                ))}
              </div>

              <BomboSection number="1" accent="#185e2e" teams={BOMBO1} selKey="b1" label="Cabezas de serie — los más fuertes" />
              <BomboSection number="2" accent="#1a3f7a" teams={BOMBO2} selKey="b2" label="Segundo pelotón" />
              <BomboSection number="4" accent="#7a1a1a" teams={BOMBO4} selKey="b4" label="Fase previa / repechaje Libertadores" />

              <div style={{ textAlign: "center", marginTop: 24 }}>
                <button
                  className="submit-btn"
                  onClick={savePrediction}
                  disabled={!canSubmit}
                  style={{
                    background: canSubmit ? "linear-gradient(135deg,#b8960a,#f0cc1a)" : "#2a2a2a",
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    color: canSubmit ? "#111" : "#555",
                  }}
                >
                  {canSubmit ? "✅ GUARDAR MI PREDICCIÓN" : `Selecciona ${!selected.b1 ? "Bombo 1" : !selected.b2 ? "Bombo 2" : "Bombo 4"}`}
                </button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === "result" && myPrediction && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
              <h2 style={{ fontSize: 24, color: "#f0cc1a", marginBottom: 6 }}>¡Predicción guardada!</h2>
              <p style={{ color: "#8dc4a2", marginBottom: 28 }}>
                Registrada a nombre de <strong style={{ color: "#fff" }}>{myPrediction.name}</strong>
              </p>

              <div className="result-card">
                <div style={{ textAlign: "center", fontWeight: 700, marginBottom: 18, color: "#f0cc1a", letterSpacing: 2, fontSize: 13 }}>
                  EL GRUPO DE MACARÁ
                </div>
                {[
                  { label: "MACARÁ", sub: "Ecuador 🇪🇨 · Bombo 3", bg: "#143520", border: "#1e7a40" },
                  { label: myPrediction.b1.name, sub: `Bombo 1 · ${myPrediction.b1.flag} ${myPrediction.b1.country}`, bg: "#0d2a1a", border: "#185e2e" },
                  { label: myPrediction.b2.name, sub: `Bombo 2 · ${myPrediction.b2.flag} ${myPrediction.b2.country}`, bg: "#0d1a30", border: "#1a3f7a" },
                  { label: myPrediction.b4.name, sub: `Bombo 4 · ${myPrediction.b4.flag} ${myPrediction.b4.country}`, bg: "#2a0d0d", border: "#7a1a1a" },
                ].map((item, i) => (
                  <div key={item.label} style={{
                    background: item.bg, border: `1px solid ${item.border}`,
                    borderRadius: 10, padding: "12px 14px", marginBottom: 10,
                    display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
                  }}>
                    <span style={{ fontWeight: i === 0 ? 900 : 600, fontSize: i === 0 ? 16 : 15 }}>{item.label}</span>
                    <span style={{ fontSize: 12, color: "#8dc4a2" }}>{item.sub}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="action-btn" style={{ background: "#185e2e" }}
                  onClick={() => { setStep("home"); setSelected({ b1:null, b2:null, b4:null }); setUserName(""); }}>
                  + Nueva predicción
                </button>
                <button className="action-btn" style={{ background: "#7a6010" }}
                  onClick={() => { loadPredictions(); setStep("rankings"); }}>
                  🏆 Ver todas
                </button>
              </div>
            </div>
          )}

          {/* RANKINGS */}
          {step === "rankings" && (
            <div>
              <h2 style={{ fontSize: 22, color: "#f0cc1a", marginBottom: 6 }}>🏆 Predicciones registradas</h2>
              <p style={{ color: "#8dc4a2", fontSize: 14, marginBottom: 20 }}>
                {predictions.length} persona{predictions.length !== 1 ? "s" : ""} han hecho su predicción
              </p>

              {predictions.length === 0 ? (
                <div style={{
                  textAlign: "center", padding: 48, color: "#555",
                  border: "1px dashed #333", borderRadius: 12,
                }}>Aún no hay predicciones. ¡Sé el primero! 🚀</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {predictions.map((p, i) => (
                    <div key={p.name + i} className="rank-row">
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: "linear-gradient(135deg,#143520,#0e5228)",
                        border: "2px solid #f0cc1a",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 900, fontSize: 13, flexShrink: 0,
                      }}>{i + 1}</div>
                      <div style={{ flexShrink: 0, minWidth: 120 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "#555" }}>{p.date}</div>
                      </div>
                      <div className="rank-teams">
                        {[
                          { team: p.b1, color: "#185e2e", label: "B1" },
                          { team: p.b2, color: "#1a3f7a", label: "B2" },
                          { team: p.b4, color: "#7a1a1a", label: "B4" },
                        ].map(({ team, color, label }) => team && (
                          <div key={label} className="rank-badge" style={{
                            background: color + "33", border: `1px solid ${color}`,
                          }}>
                            <span style={{ opacity: 0.55, marginRight: 4 }}>{label}</span>
                            {team.flag} {team.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 24, textAlign: "center" }}>
                <button className="action-btn" style={{ background: "#143520" }}
                  onClick={() => setStep("home")}>← Hacer mi predicción</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}