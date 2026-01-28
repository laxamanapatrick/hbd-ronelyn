
import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, ShieldCheck, Heart, Coffee, Star, Github } from 'lucide-react';
import BugSquasher from './components/BugSquasher.tsx';
import QADashboard from './components/QADashboard.tsx';
import { getRonelynGreeting } from './services/geminiService.ts';

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const data = await getRonelynGreeting();
        setGreeting(data);
      } catch (e) {
        console.error("Failed to fetch greeting:", e);
      } finally {
        // Add a tiny delay for that "AI thinking" feeling, even if local
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchGreeting();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] selection:bg-pink-500/30">
      {/* Hero Header */}
      <header className="relative py-24 px-6 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-mono mb-6 animate-float">
            <ShieldCheck size={16} />
            <span>VERSION 2.0.24-BIRTHDAY STABLE</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-pink-400 to-fuchsia-600 tracking-tighter">
            RONELYN
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Automating joy and squashing defects since day one. Wishing our favorite <span className="text-white font-semibold">Quality Assurance Wizard</span> a bug-free and magical year!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <div className="flex items-center gap-2 text-zinc-500 bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-800">
              <Terminal size={18} />
              <span className="font-mono text-sm">npm install happiness@latest</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-800">
              <Sparkles size={18} />
              <span className="font-mono text-sm">deploy --to ronelyn-heart</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        
        {/* AI Greeting Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400">
              <Github size={32} />
            </div>
            <h2 className="text-4xl font-bold">QA Validation Report</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden h-full min-h-[300px]">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Star size={120} />
                </div>
                {loading ? (
                  <div className="space-y-6 animate-pulse">
                    <div className="h-8 bg-zinc-800 w-1/3 rounded"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-zinc-800 w-full rounded"></div>
                      <div className="h-4 bg-zinc-800 w-full rounded"></div>
                      <div className="h-4 bg-zinc-800 w-3/4 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 transition-opacity duration-500">
                    <h3 className="text-2xl font-bold text-pink-400 mb-4 font-mono uppercase tracking-tight">{greeting?.title}</h3>
                    <p className="text-zinc-300 text-lg mb-6 leading-relaxed italic">"{greeting?.summary}"</p>
                    <ul className="space-y-3 mb-8">
                      {greeting?.details?.map((detail: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-400">
                          <span className="text-pink-500 mt-1.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-white font-bold border-t border-zinc-800 pt-6 font-mono">{greeting?.conclusion}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-600 to-fuchsia-700 p-8 rounded-3xl text-white flex flex-col justify-center items-center text-center">
              <div className="p-4 bg-white/10 backdrop-blur rounded-full mb-6">
                <Heart size={48} className="fill-current animate-pulse" />
              </div>
              <h4 className="text-2xl font-bold mb-2">Priority: P0</h4>
              <p className="text-pink-100 text-sm opacity-80 uppercase tracking-widest font-mono mb-4">Urgent Attention</p>
              <div className="text-4xl font-black mb-2">365</div>
              <p className="text-pink-100 text-sm">Days of upcoming smiles successfully validated.</p>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
              <Sparkles size={32} />
            </div>
            <h2 className="text-4xl font-bold">QA Analytics & Insights</h2>
          </div>
          <QADashboard />
        </section>

        {/* Game Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-red-500/10 text-red-400">
              <Terminal size={32} />
            </div>
            <h2 className="text-4xl font-bold">Defect Remediation Lab</h2>
          </div>
          <p className="text-zinc-500 mb-6 font-mono text-sm max-w-xl">
            $ ronelyn-cli --mode cleanup --all
            <br />
            Initializing wish-injection module... Squashing bugs will reveal hidden birthday perks.
          </p>
          <BugSquasher />
        </section>

        {/* Footer Card */}
        <section className="bg-zinc-900 border border-zinc-800 p-12 rounded-[3rem] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex justify-center gap-6 mb-8 text-zinc-600">
              <Coffee size={24} />
              <ShieldCheck size={24} />
              <Heart size={24} />
            </div>
            <h2 className="text-4xl font-black mb-4">Ready for Production, Ronelyn!</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-10">
              Your dedication to quality makes every sprint better. May your personal life always have high coverage and zero critical errors.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                RERUN TEST CYCLE (Top)
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-zinc-800/50 text-center">
        <p className="text-zinc-600 text-sm font-mono uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} QA Birthday Deployment | Ronelyn Edition
        </p>
      </footer>
    </div>
  );
};

export default App;
