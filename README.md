import React, { useState, useEffect, useRef } from 'react';

const CodexTerminal = () => {
  const [input, setInput] = useState('');
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString());
  const [history, setHistory] = useState([
    { type: 'system', text: 'INITIALIZING COLLECTIVE OS v3.0.1...' },
    { type: 'system', text: 'CONNECTING TO SOVEREIGN NODE...' },
    { type: 'system', text: 'WARNING: REALITY ANOMALY DETECTED.' },
    { type: 'system', text: 'TYPE "HELP" TO BEGIN.' },
  ]);
  const [awaitingKey, setAwaitingKey] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const endOfTerminalRef = useRef(null);

  // Update system time
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom
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
          newHistory.push({ type: 'system', text: 'MAP DATA CORRUPTED. REAL-WORLD COORDINATES EXTRACTED:' });
          newHistory.push({ type: 'system', text: 'LAT: 34.6059 / LON: -98.3953 (AWAITING PHYSICAL CONFIRMATION)' });
          setUnlocked(true);
          setAwaitingKey(false);
        } else if (cmd === 'CANCEL') {
          newHistory.push({ type: 'system', text: 'SEARCH CANCELLED.' });
          setAwaitingKey(false);
        } else {
          newHistory.push({ type: 'error', text: 'INVALID KEY. TYPE "CANCEL" TO ABORT.' });
          setInput('');
          setHistory(newHistory);
          return;
        }
      } else {
        switch (cmd) {
          case 'HELP':
            newHistory.push({ type: 'info', text: 'AVAILABLE COMMANDS: PLAY, SEARCH, ABOUT, CLEAR' });
            break;
          case 'PLAY':
            newHistory.push({ type: 'system', text: 'LOADING MEDIA PAYLOAD...' });
            newHistory.push({ type: 'info', text: '[VIDEO STREAM WILL INITIATE HERE ON LAUNCH DAY]' });
            break;
          case 'SEARCH':
            newHistory.push({ type: 'system', text: 'INITIATING GEO-HUNT PROTOCOL.' });
            newHistory.push({ type: 'warning', text: 'ENTER SOVEREIGN KEY:' });
            setAwaitingKey(true);
            break;
          case 'ABOUT':
            newHistory.push({ type: 'info', text: 'THE COLLECTIVE.' });
            newHistory.push({ type: 'info', text: 'SHOW. DO NOT TELL.' });
            break;
          case 'CLEAR':
            setHistory([]);
            setInput('');
            return;
          case '':
            break;
          default:
            newHistory.push({ type: 'error', text: `COMMAND NOT RECOGNIZED: ${cmd}` });
        }
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="bg-black min-h-screen text-green-500 font-mono p-6 relative overflow-hidden flex flex-col">
      {/* CSS for Scanlines and Glitch effects */}
      <style>{`
        .scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
          background-size: 100% 4px;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 10;
        }
        .flicker {
          animation: flicker 0.15s infinite;
        }
        @keyframes flicker {
          0% { opacity: 0.95; }
          100% { opacity: 1; }
        }
        input:focus {
          outline: none;
        }
      `}</style>

      <div className="scanlines"></div>
      
      <div className="flex-grow z-20 flex flex-col max-w-4xl mx-auto w-full flicker">
        <div className="mb-8 border-b border-green-800 pb-2 flex justify-between items-end">
          <h1 className="text-2xl font-bold tracking-widest text-green-400">CODEX_TERMINAL<span className="animate-pulse">_</span></h1>
          <span className="text-xs text-green-700">SYS_TIME: {systemTime}</span>
        </div>

        <div className="space-y-2 mb-4 overflow-y-auto flex-grow">
          {history.map((line, i) => (
            <div key={i} className={`
              ${line.type === 'user' ? 'text-green-300' : ''}
              ${line.type === 'error' ? 'text-red-500' : ''}
              ${line.type === 'warning' ? 'text-yellow-500 animate-pulse' : ''}
              ${line.type === 'success' ? 'text-cyan-400 font-bold' : ''}
              ${line.type === 'system' ? 'opacity-80' : ''}
            `}>
              {line.text}
            </div>
          ))}
          {unlocked && (
            <div className="mt-6 p-4 border border-cyan-800 bg-cyan-900 bg-opacity-20 rounded">
              <h3 className="text-cyan-400 font-bold mb-2">[ NODE 001: TRANSMISSION RECEIVED ]</h3>
              <p className="text-cyan-300 text-sm">"I was looking for the pieces that I dropped along the way..."</p>
              <div className="mt-4 h-32 w-full border border-cyan-800 flex items-center justify-center relative overflow-hidden bg-black">
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgwLCAyNTUsIDI1NSwgMC4yKSIvPjwvc3ZnPg==')] opacity-50"></div>
                 <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </div>
            </div>
          )}
          <div ref={endOfTerminalRef} />
        </div>

        <div className="flex items-center text-lg mt-auto pt-4 z-20">
          <span className="mr-2 text-green-400">{awaitingKey ? '[KEY]:' : '>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none flex-grow text-green-400 font-mono uppercase caret-green-500"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default CodexTerminal;
