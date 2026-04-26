import React, { useState, useEffect, useRef } from 'react';

const CodexTerminal = () => {
  // SET YOUR TARGET DATE HERE (UTC Recommended)
  const TARGET_DATE = new Date('2024-05-24T00:00:00Z').getTime(); // Update this to your 3-day mark  
  
  const [isLive, setIsLive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TARGET_DATE - Date.now());
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'INITIALIZING COLLECTIVE OS v3.0.1...' },
    { type: 'system', text: 'CONNECTING TO SOVEREIGN NODE...' },
    { type: 'system', text: 'WARNING: REALITY ANOMALY DETECTED.' },
    { type: 'system', text: 'MULTI-REPO ARCHITECTURE DETECTED: [CLEAR], [BLACKOUT], [OPS]' },
    { type: 'system', text: 'TYPE "HELP" TO BEGIN.' },
  ]);
  const [awaitingKey, setAwaitingKey] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const endOfTerminalRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = TARGET_DATE - now;
      setTimeLeft(distance);
      if (distance <= 0) {
        setIsLive(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [TARGET_DATE]);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toUpperCase();
      const newHistory = [...history, { type: 'user', text: `> ${cmd}` }];
      
      if (awaitingKey) {
        if (cmd === 'GHOST IN THE MACHINE' || cmd === 'LOST AND FOUND') {
          newHistory.push({ type: 'success', text: 'ACCESS GRANTED. SOVEREIGN NODE 001 UNLOCKED.' });
          setUnlocked(true);
        } else if (cmd === 'CANCEL') {
          newHistory.push({ type: 'system', text: 'SEARCH CANCELLED.' });
        } else {
          newHistory.push({ type: 'error', text: 'INVALID KEY.' });
          setInput('');
          setHistory(newHistory);
          return;
        }
        setAwaitingKey(false);
      } else {
        switch (cmd) {
          case 'HELP':
            newHistory.push({ type: 'info', text: 'AVAILABLE COMMANDS: PLAY, SEARCH, CLEAR_MEDIA, BLACKOUT, OPS_LOGIN, CLEAR' });
            break;
          case 'PLAY':
            newHistory.push({ type: 'system', text: 'LOADING MEDIA PAYLOAD...' });
            window.open('https://zacharyemahaffey-ops.github.io/CLEAR_MEDIA', '_blank');
            break;
          case 'BLACKOUT':
            window.location.href = 'https://zacharyemahaffey-ops.github.io/BLKOUT-TC_1107_BRCH/';
            break;
          case 'OPS_LOGIN':
            window.location.href = 'https://zacharyemahaffey-ops.github.io/OPS';
            break;
          case 'SEARCH':
            newHistory.push({ type: 'warning', text: 'ENTER SOVEREIGN KEY:' });
            setAwaitingKey(true);
            break;
          case 'CLEAR':
            setHistory([]);
            setInput('');
            return;
          default:
            newHistory.push({ type: 'error', text: `COMMAND NOT RECOGNIZED: ${cmd}` });
        }
      }
      setHistory(newHistory);
      setInput('');
    }
  };

  // Pre-Live Countdown Screen
  if (!isLive) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-green-500 font-mono p-4 overflow-hidden">
        <div className="text-center">
          <div className="text-xs opacity-50 mb-4 animate-pulse">COLLECTIVE AUTO SECURE UPLINK PENDING...</div>
          <div className="text-4xl md:text-6xl font-bold tracking-tighter">
            {days}D:{hours}H:{minutes}M:{seconds}S
          </div>
          <div className="mt-4 text-green-900 text-[10px] uppercase tracking-[0.2em]">Sovereign Node Synchronization in Progress</div>
        </div>
      </div>
    );
  }

  // Live Terminal Screen
  return (
    <div className="bg-black min-h-screen text-green-500 font-mono p-6 relative overflow-hidden flex flex-col">
      <style>{`\n        .scanlines {\n          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05));\n          background-size: 100% 4px;\n          position: absolute;\n          top: 0; left: 0; right: 0; bottom: 0;\n          pointer-events: none;\n          z-index: 10;\n        }\n        .glitch-text { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; animation: glitch 2s infinite linear alternate-reverse; }\n        @keyframes glitch { \n          0% { transform: translate(0); } \n          20% { transform: translate(-2px, 2px); } \n          100% { transform: translate(0); }\n        }\n      `}</style>
      <div className="scanlines"></div>
      <div className="flex-grow z-20 flex flex-col max-w-4xl mx-auto w-full">\n        <div className="mb-8 border-b border-green-900 pb-2 flex justify-between items-end">\n          <h1 className="text-xl font-bold tracking-widest text-green-400 glitch-text">CODEX_TERMINAL_v3</h1>\n          <span className="text-[10px] text-green-800">STATUS: ONLINE</span>\n        </div>\n        <div className="space-y-1 mb-4 overflow-y-auto flex-grow text-sm">\n          {history.map((line, i) => (\n            <div key={i} className={`${line.type === 'error' ? 'text-red-500' : line.type === 'success' ? 'text-cyan-400' : ''}`}>{line.text}</div>\n          ))} {\n          <div ref={endOfTerminalRef} />\n        </div>\n        <div className="flex items-center text-lg mt-auto pt-4 border-t border-green-900">\n          <span className="mr-2 text-green-400">{awaitingKey ? '[KEY]:' : '>'}</span>\n          <input\n            type="text"\n            value={input}\n            onChange={(e) => setInput(e.target.value)}\n            onKeyDown={handleCommand}\n            className="bg-transparent border-none flex-grow text-green-400 font-mono uppercase focus:outline-none"\n            autoFocus\n          />\n        </div>\n      </div>\n    </div>\n  );\n};\n
export default CodexTerminal;