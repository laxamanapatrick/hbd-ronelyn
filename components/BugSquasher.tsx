
import React, { useState, useEffect } from 'react';
import { Bug as BugIcon, CheckCircle, Flame } from 'lucide-react';

interface Bug {
  id: number;
  x: number;
  y: number;
  label: string;
  squashed: boolean;
}

const WISHES = [
  "Endless Joy", "Perfect Sprints", "Zero Regressions", 
  "Infinite Health", "Bug-Free Life", "Career Growth",
  "Great Coffee", "Love & Peace", "High Coverage"
];

const BugSquasher: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [score, setScore] = useState(0);

  const spawnBug = () => {
    const newBug: Bug = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      label: WISHES[Math.floor(Math.random() * WISHES.length)],
      squashed: false
    };
    setBugs(prev => [...prev.slice(-10), newBug]);
  };

  useEffect(() => {
    const interval = setInterval(spawnBug, 2000);
    return () => clearInterval(interval);
  }, []);

  const squash = (id: number) => {
    setBugs(prev => prev.map(b => b.id === id ? { ...b, squashed: true } : b));
    setScore(s => s + 1);
  };

  return (
    <div className="relative w-full h-96 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-12 group">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/50 backdrop-blur p-2 rounded-lg border border-pink-500/30">
        <Flame className="text-orange-500 w-5 h-5" />
        <span className="font-mono text-pink-400 font-bold">BUGS SQUASHED: {score}</span>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <h2 className="text-6xl font-black rotate-12">TEST ENVIRONMENT</h2>
      </div>

      {bugs.map(bug => (
        <button
          key={bug.id}
          onClick={() => !bug.squashed && squash(bug.id)}
          className={`absolute transition-all duration-300 transform ${bug.squashed ? 'scale-125 opacity-0' : 'hover:scale-110'}`}
          style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
        >
          {bug.squashed ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500 w-8 h-8" />
              <span className="text-xs text-white font-bold bg-green-600 px-1 rounded">{bug.label}</span>
            </div>
          ) : (
            <BugIcon className="text-red-500 w-10 h-10 animate-bounce" />
          )}
        </button>
      ))}

      {score === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-zinc-500 animate-pulse font-mono">CRITICAL: BUGS DETECTED! SQUASH THEM FOR RONELYN!</p>
        </div>
      )}
    </div>
  );
};

export default BugSquasher;
