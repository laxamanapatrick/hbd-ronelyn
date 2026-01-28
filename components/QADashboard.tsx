
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Happiness', value: 100, color: '#f472b6' },
  { name: 'Success', value: 95, color: '#fb7185' },
  { name: 'Health', value: 98, color: '#e879f9' },
  { name: 'Prosperity', value: 92, color: '#c084fc' },
  { name: 'Bug Resistance', value: 100, color: '#818cf8' },
];

const QADashboard: React.FC = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white">Project: Ronelyn Life Cycle v{new Date().getFullYear()}</h3>
          <p className="text-zinc-400 font-mono text-sm">Deployment Status: <span className="text-green-400">Stable</span></p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Environment</div>
          <div className="text-pink-500 font-bold">PRODUCTION / CELEBRATION</div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#666" fontSize={12} />
            <YAxis hide />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
          <p className="text-xs text-zinc-500 font-mono">TEST CASES</p>
          <p className="text-2xl font-bold text-pink-500">365/365</p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
          <p className="text-xs text-zinc-500 font-mono">COVERAGE</p>
          <p className="text-2xl font-bold text-fuchsia-500">100%</p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
          <p className="text-xs text-zinc-500 font-mono">REGRESSIONS</p>
          <p className="text-2xl font-bold text-green-500">NONE</p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
          <p className="text-xs text-zinc-500 font-mono">PRIORITY</p>
          <p className="text-2xl font-bold text-red-500">URGENT P0</p>
        </div>
      </div>
    </div>
  );
};

export default QADashboard;
