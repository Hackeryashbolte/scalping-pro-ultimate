'use client';

import { FormEvent, useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

type AssistantMessage = { role: 'assistant' | 'user' | 'stream'; content: string };

export function TradingAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { role: 'assistant', content: 'Ask me to analyze XAUUSD, find the best trade today, explain market outlook, or build a risk plan.' },
  ]);
  const [input, setInput] = useState('Analyze XAUUSD');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const prompt = input.trim();
    setInput('');
    setMessages((current) => [...current, { role: 'user', content: prompt }]);
    setLoading(true);

    const res = await fetch('/api/assistant', { method: 'POST', body: JSON.stringify({ prompt }) });
    const reader = res.body?.getReader();
    let content = '';
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += new TextDecoder().decode(value);
        setMessages((current) => [...current.filter((message) => message.role !== 'stream'), { role: 'stream', content }]);
      }
    }
    setMessages((current) => current.map((message) => (message.role === 'stream' ? { role: 'assistant', content: message.content } : message)));
    setLoading(false);
  }

  return (
    <section id="assistant" className="glass rounded-[2rem] p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-quantum-blue/10 p-3 text-quantum-blue"><Bot /></div>
        <div>
          <p className="text-sm uppercase tracking-[.35em] text-quantum-blue">AI Trading Assistant</p>
          <h2 className="text-3xl font-black">Streaming Market Copilot</h2>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {['Analyze XAUUSD', 'Best trade today', 'Market outlook', 'Risk management'].map((prompt) => (
          <button key={prompt} onClick={() => setInput(prompt)} className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300 hover:border-quantum-blue hover:text-quantum-blue" type="button">
            <Sparkles size={13} className="mr-1 inline" />{prompt}
          </button>
        ))}
      </div>
      <div className="mt-6 h-[360px] overflow-y-auto rounded-3xl border border-white/10 bg-black/30 p-4">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`mb-4 max-w-[88%] rounded-2xl p-4 ${message.role === 'user' ? 'ml-auto bg-quantum-gold text-black' : 'bg-white/[.06] text-slate-100'}`}>
            {message.content}
          </div>
        ))}
        {loading && <div className="text-sm text-slate-500">Quantum model is streaming...</div>}
      </div>
      <form onSubmit={submit} className="mt-4 flex gap-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-quantum-blue" placeholder="Ask for XAUUSD analysis, best trade, outlook, or risk management..." />
        <button disabled={loading} className="rounded-2xl bg-quantum-blue px-5 text-black disabled:opacity-50"><Send /></button>
      </form>
    </section>
  );
}
