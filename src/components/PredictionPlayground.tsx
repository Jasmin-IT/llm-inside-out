import { motion } from 'motion/react';
import { TokenPrediction, calculateSoftmax, applyTopK, applyTopP, renormalize } from '../lib/llm-math';
import { SCENARIOS } from '../data/mock-logits';
import { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sliders, Sparkles, Zap, Info } from 'lucide-react';

export default function PredictionPlayground() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [temperature, setTemperature] = useState(1.0);
  const [topK, setTopK] = useState(10);
  const [topP, setTopP] = useState(1.0);

  const scenario = SCENARIOS[scenarioIdx];

  const processedData = useMemo(() => {
    // 1. Initial Softmax
    const baseLogits = scenario.baseLogits.map(l => l.logit);
    const baseProbs = calculateSoftmax(baseLogits, temperature);
    
    let predictions: TokenPrediction[] = scenario.baseLogits.map((l, i) => ({
      word: l.word,
      logit: l.logit,
      prob: baseProbs[i]
    }));

    // 2. Apply Top-K
    predictions = applyTopK(predictions, topK);
    
    // 3. Re-normalize after Top-K
    predictions = renormalize(predictions);

    // 4. Apply Top-P
    predictions = applyTopP(predictions, topP);

    // 5. Final Re-normalization
    predictions = renormalize(predictions);

    return predictions.sort((a, b) => b.prob - a.prob);
  }, [scenario, temperature, topK, topP]);

  const topChoice = processedData[0];

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto border-t border-zinc-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Zap className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Step 3: The Prediction Loop</h2>
          <p className="text-zinc-400 text-sm">See how parameters change the "creative" choices of the model.</p>
        </div>
      </div>

      {/* ELI5 Section */}
      <div className="mb-12 p-6 bg-green-500/10 rounded-2xl border border-green-500/20 flex gap-4 items-start">
        <div className="p-3 bg-green-500 rounded-xl">
           <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-green-400 mb-1">"The Ice Cream Shop"</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            When you ask an LLM for a word, it’s like going to an ice cream shop with 50,000 flavors. 
            The model gives a score to each one. <b>Temperature</b> is like how picky you are: 
            at low temp, you always pick Vanilla (the most likely). At high temp, you might close your eyes and 
            point to something crazy like "Spicy Pickle"!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="brutalist-border p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Sliders className="w-12 h-12" />
            </div>
            
            <h3 className="mono-label mb-6 flex items-center gap-2">
              <Sliders className="w-3 h-3" /> Control Panel
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Temperature</label>
                  <span className="font-mono text-blue-400 text-xs">{temperature.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="2.0" step="0.1"
                  value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <p className="text-[10px] text-zinc-500 mt-2">
                  Lower = more predictable. Higher = more random/creative.
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Top-K</label>
                  <span className="font-mono text-blue-400 text-xs">{topK}</span>
                </div>
                <input 
                  type="range" min="1" max="10" step="1"
                  value={topK} onChange={(e) => setTopK(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <p className="text-[10px] text-zinc-500 mt-2">
                  Only considers the top {topK} most likely tokens.
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Top-P (Nucleus)</label>
                  <span className="font-mono text-blue-400 text-xs">{topP.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.0" step="0.05"
                  value={topP} onChange={(e) => setTopP(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <p className="text-[10px] text-zinc-500 mt-2">
                  Cumulative probability threshold. Prunes tail words.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="mono-label">Try a different prompt</h3>
            <div className="grid grid-cols-1 gap-2">
              {SCENARIOS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setScenarioIdx(idx)}
                  className={`text-left p-3 rounded-xl transition-all border ${
                    scenarioIdx === idx 
                      ? 'bg-blue-500/10 border-blue-500/50 text-blue-100' 
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <span className="text-xs font-mono block opacity-50 mb-1">Scenario {idx + 1}</span>
                  <span className="text-sm font-medium">"{s.context}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="brutalist-border p-8 rounded-2xl flex-1 flex flex-col">
            <div className="mb-6">
              <h3 className="mono-label mb-2">Incoming Context</h3>
              <p className="text-2xl font-light text-zinc-300">
                {scenario.context} <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 animate-pulse">
                   {topChoice.prob > 0.01 ? topChoice.word : '...'}
                </span>
              </p>
            </div>

            <div className="h-[300px] w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData} margin={{ top: 20, right: 0, left: -20, bottom: 40 }}>
                  <XAxis 
                    dataKey="word" 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#60a5fa' }}
                    labelStyle={{ color: '#a1a1aa', fontWeight: 'bold' }}
                    formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Probability']}
                  />
                  <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                    {processedData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? '#3b82f6' : '#27272a'} 
                        className="transition-all duration-300"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span>Highest Probability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-zinc-800 border border-zinc-700 rounded-sm"></div>
                <span>Other Candidates</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 italic">
                <Info className="w-4 h-4 text-zinc-500" /> What's happening?
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The chart shows a <b>Probability Distribution</b>. LLMs don't know the answer; 
                they just calculate the likelihood of every word in their dictionary. 
                Your settings are currently "shaping" this landscape.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 italic">
                <Sparkles className="w-4 h-4 text-blue-500" /> Recommendation
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Try setting Temperature to <b>0.1</b>. Notice how one word dominates. 
                Then try <b>2.0</b>. Notice how the distribution flattens out, 
                making the model much more unpredictable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
