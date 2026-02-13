import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 5 + Math.random() * 5,
  size: 10 + Math.random() * 14,
}));

const hearts = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  angle: (i / 16) * 360,
  dist: 80 + Math.random() * 80,
  size: 18 + Math.random() * 18,
  delay: Math.random() * 0.3,
}));

function HeartBurst() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            fontSize: h.size,
            animation: `burst 1.2s ${h.delay}s ease-out forwards`,
            "--angle": `${h.angle}deg`,
            "--dist": `${h.dist}px`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

export default function Valentine() {
  const [said, setSaid] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState(null); // null = inline, {x,y} = floating
  const cardRef = useRef(null);
  const noRef = useRef(null);

  const moveNo = () => {
    const card = cardRef.current;
    const btn = noRef.current;
    if (!card || !btn) return;

    const cardW = card.offsetWidth;
    const cardH = card.offsetHeight;
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;
    const pad = 24;

    // Safe bounds — button can never leave the card
    const minX = pad;
    const maxX = cardW - btnW - pad;
    const minY = pad;
    const maxY = cardH - btnH - pad;

    // Pick a random spot, retry if too close to current position
    let x, y;
    let tries = 0;
    do {
      x = minX + Math.random() * (maxX - minX);
      y = minY + Math.random() * (maxY - minY);
      tries++;
    } while (
      noPos &&
      Math.abs(x - noPos.x) < 80 &&
      Math.abs(y - noPos.y) < 80 &&
      tries < 8
    );

    setNoPos({ x, y });
    setYesScale((s) => Math.min(s + 0.1, 2.0));
  };

  const handleYes = () => {
    setSaid(true);
    emailjs.send(
      "service_0kanvue",
      "template_r8lyyn7",
      {
        message: "She said YES!! 💕🎉",
      },
      "wpfs8K0lU3Nxv0zmc",
    );
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff0f3; min-height: 100vh; font-family: 'Lato', sans-serif; }

        @keyframes fall {
          from { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          to   { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes burst {
          0%   { transform: translate(0,0) scale(0.3); opacity: 1; }
          80%  { opacity: 1; }
          100% {
            transform: translate(
              calc(cos(var(--angle)) * var(--dist)),
              calc(sin(var(--angle)) * var(--dist))
            ) scale(1);
            opacity: 0;
          }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
        @keyframes bigEntrance {
          0%   { opacity: 0; transform: scale(0.4) translateY(-20px); }
          60%  { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }

        .card {
          position: relative;     /* <-- No button is absolutely positioned inside this */
          background: #fff;
          border-radius: 28px;
          box-shadow: 0 20px 80px rgba(220,80,100,0.18), 0 4px 20px rgba(0,0,0,0.06);
          padding: 52px 48px 80px; /* extra bottom padding so button has room */
          width: min(520px, 92vw);
          min-height: 420px;
          text-align: center;
          z-index: 10;
          animation: floatIn 0.9s ease both;
        }

        .heart-deco {
          font-size: 50px;
          display: block;
          margin-bottom: 10px;
          animation: pulse 2s ease-in-out infinite;
        }
        .date-label {
          font: 300 11px/1 'Lato', sans-serif;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #e8899a;
          margin-bottom: 26px;
        }
        .headline {
          font: 400 clamp(18px, 3.8vw, 24px)/1.6 'Playfair Display', serif;
          color: #2d1a22;
          margin-bottom: 40px;
        }
        .name { font-style: italic; font-weight: 700; color: #c94068; }

        .btn-yes {
          background: linear-gradient(135deg, #e8395a, #f0729a);
          background-size: 200% auto;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 44px;
          font: italic 17px 'Playfair Display', serif;
          cursor: pointer;
          box-shadow: 0 6px 28px rgba(200,50,80,0.35);
          animation: shimmer 3s linear infinite;
          transition: box-shadow 0.2s;
        }
        .btn-yes:hover { box-shadow: 0 10px 40px rgba(200,50,80,0.55); }

        /* Default state: inline, sits next to Yes */
        .btn-no {
          font: 400 16px 'Lato', sans-serif;
          background:white;
          color: #8a6070;
          border: 2px solid #c4909f;
          border-radius: 50px;
          padding: 13px 40px;
          cursor: pointer;
          white-space: nowrap;
          user-select: none;
        }
        .btn-no:hover { color: #c94068; border-color: #c94068; }

        /* Floating state: anchored inside card */
        .btn-no-floating {
          position: absolute;
          font: 400 16px 'Lato', sans-serif;
          color: #8a6070;
          background: transparent;
          border: 2px solid #c4909f;
          border-radius: 50px;
          padding: 13px 40px;
          cursor: not-allowed;
          white-space: nowrap;
          user-select: none;
          transition: left 0.28s cubic-bezier(.22,1.4,.5,1), top 0.28s cubic-bezier(.22,1.4,.5,1);
          z-index: 20;
        }
        .btn-no-floating:hover { color: #c94068; border-color: #c94068; }

        .yes-scene {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          animation: bigEntrance 0.8s ease both;
        }
        .yes-big   { font-size: 72px; animation: pulse 1s ease-in-out infinite; }
        .yes-title { font: italic clamp(22px,5vw,30px) 'Playfair Display', serif; color: #c94068; }
        .yes-sub   { font: 300 15px/1.7 'Lato', sans-serif; color: #7a5060; }
      `}</style>

      {/* Falling petals */}
      {PETALS.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.left}%`,
            top: "-30px",
            fontSize: `${p.size}px`,
            opacity: 0.65,
            pointerEvents: "none",
            animation: `fall ${p.duration}s ${p.delay}s linear infinite`,
            zIndex: 0,
          }}
        >
          🌸
        </div>
      ))}

      {said && <HeartBurst />}

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          position: "relative",
        }}
      >
        <div className="card" ref={cardRef}>
          {!said ? (
            <>
              <span className="heart-deco">💌</span>
              <p className="date-label">Valentine's Day · February 14</p>
              <p className="headline">
                Hi <span className="name">Pooja</span>, this is Ajay. We
                connected on Hinge. We might have missed this Valentine’s, but
                I’d love to celebrate the next one with you…{" "}
                <em style={{ color: "#c94068" }}>maybe forever.</em>
                <br />
                <br />
                Will you be my Valentine?
              </p>

              {/* YES always in normal flow */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <button
                  className="btn-yes"
                  style={{
                    transform: `scale(${yesScale})`,
                    transformOrigin: "center",
                  }}
                  onClick={() => {
                    setSaid(true);
                    handleYes();
                  }}
                >
                  Yes! 💕
                </button>

                {/* NO — inline until first hover */}
                {!noPos && (
                  <button
                    ref={noRef}
                    className="btn-no"
                    onMouseEnter={moveNo}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      moveNo();
                    }}
                  >
                    No
                  </button>
                )}
              </div>

              {/* NO — absolutely positioned inside card after first hover */}
              {noPos && (
                <button
                  ref={noRef}
                  className="btn-no-floating"
                  style={{ left: noPos.x, top: noPos.y }}
                  onMouseEnter={moveNo}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    moveNo();
                  }}
                >
                  No
                </button>
              )}
            </>
          ) : (
            <div className="yes-scene">
              <span className="yes-big">🥂</span>
              <p className="yes-title">She said yes!! 🎉</p>
              <p className="yes-sub">
                Here's to the next Valentine's,
                <br />
                and every one after that. 💕
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
