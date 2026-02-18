import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [noHits, setNoHits] = useState(0);
  const [noOpacity, setNoOpacity] = useState(1);
  const [noScale, setNoScale] = useState(1);

  const handleYes = () => {
    setPhase("yes");
    emailjs.send(
      "service_0kanvue",
      "template_r8lyyn7",
      {
        message: "Pooja said YES to staying in touch 🙂",
      },
      "wpfs8K0lU3Nxv0zmc",
    );
  };

  const handleNoHover = () => {
    // const h = noHits + 1;
    // setNoHits(h);
    // setNoOpacity(Math.max(0.05, 1 - h * 0.25));
    // setNoScale(Math.max(0.3, 1 - h * 0.18));
    // if (h >= 5)
    setPhase("nope");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        body {
          margin: 0;
          background: #f7f4ee;
          font-family: 'DM Sans', sans-serif;
        }

        .rajini-img {
          width: 220px;
          max-width: 80%;
          border-radius: 14px;
          margin-bottom: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          animation: fadeUp 0.6s ease;
        }

        .scene {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          padding: 42px 36px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          animation: fadeUp 0.6s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .glasses {
          font-size: 48px;
          margin-bottom: 18px;
        }

        .rajini-line {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(22px, 5vw, 30px);
          color: #1a1a2e;
          line-height: 1.4;
          margin-bottom: 10px;
        }

        .rajini-sub {
          font-size: 13px;
          color: #9a8fa8;
          font-style: italic;
          margin-bottom: 28px;
        }

        .message {
          font-size: 16px;
          color: #2d2d3a;
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 28px;
        }

        .message .gold {
          font-family: 'DM Serif Display', serif;
          color: #8b5e3c;
          font-style: italic;
        }

        .btn-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-yes {
          background: #1a1a2e;
          color: #f7f4ee;
          border: none;
          border-radius: 100px;
          padding: 15px;
          font-size: 15px;
          cursor: pointer;
          transition: transform 0.15s, background 0.2s;
        }

        .btn-yes:hover {
          transform: translateY(-1px);
          background: #2d2d4a;
        }

        .btn-no {
          background: transparent;
          border: 1.5px solid #e0d8e8;
          border-radius: 100px;
          padding: 13px;
          font-size: 14px;
          color: #c0b4c8;
          cursor: pointer;
          transition: opacity 0.5s, transform 0.5s;
        }

        .yes-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          margin-bottom: 12px;
          color: #1a1a2e;
        }

        .yes-text {
          font-size: 15px;
          color: #6b6b80;
          line-height: 1.7;
        }

        .nope-text {
          font-size: 15px;
          color: #6b6b80;
          line-height: 1.7;
        }
      `}</style>

      <div className="scene">
        {/* INTRO */}
        {phase === "intro" && (
          <div className="card">
            <div className="glasses">🕶️</div>

            <div className="rajini-line">Hi Pooja.</div>

            <div className="message">
              Thanks a lot for your reply and for being so kind about my
              previous message. I know we haven't talked much.
              <br />
              <br />
              I’d like to stay in touch. Talk sometimes and get to know each
              other slowly… no pressure at all
              <br />
              <br />
              Let’s upgrade from ‘hi’ to actual conversation
            </div>

            <div className="btn-stack">
              <button className="btn-yes" onClick={handleYes}>
                Okay Matladuthaam
              </button>

              <button
                className="btn-no"
                style={{ opacity: noOpacity, transform: `scale(${noScale})` }}
                onClick={handleNoHover}
              >
                Konchem time teesukundam
              </button>
            </div>
          </div>
        )}

        {/* YES */}
        {phase === "yes" && (
          <div className="card">
            <img
              src="/rajini-magizhchi.jpg"
              alt="Rajini Magizhchi"
              className="rajini-img"
            />

            <div className="yes-title">Magizhchi🙂</div>

            <div className="yes-text">
              Happy we’ll stay in touch.
              <br />
            </div>
          </div>
        )}

        {/* NO */}
        {phase === "nope" && (
          <div className="card">
            <div className="glasses">🙂</div>
            <div className="nope-text">
              Totally okay.
              <br />
              <br />
              It was really nice connecting with you. Wishing you good things
              always
            </div>
          </div>
        )}
      </div>
    </>
  );
}
