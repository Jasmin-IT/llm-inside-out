import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hash, Type, Binary } from 'lucide-react';

// Mock tokenizer logic - in real apps this would use a BPE tokenizer
const mockTokenize = (text: string) => {
  if (!text) return [];
  // Split by spaces and some common punctuation for simple visual
  const parts = text.split(/(\s+)/);
  return parts.map((part, index) => ({
    id: 1000 + (index * 42) + part.length, // Deterministic mock ID
    text: part,
    color: `hsl(${(index * 45) % 360}, 60%, 45%)`
  })).filter(t => t.text !== '');
};

export default function TokenizationVisual() {
  const [inputText, setInputText] = useState("Large language models are efficient.");
  const [tokens, setTokens] = useState(mockTokenize(inputText));

  useEffect(() => {
    setTokens(mockTokenize(inputText));
  }, [inputText]);

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto border-t border-zinc-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Type className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Step 2: Tokenization</h2>
          <p className="text-zinc-400 text-sm">Models don't see words. They see sequences of numbers called <b>Tokens</b>.</p>
        </div>
      </div>

      {/* ELI5 Section */}
      <div className="mb-12 p-6 bg-purple-500/10 rounded-2xl border border-purple-500/20 flex gap-4 items-start">
        <div className="p-3 bg-purple-500 rounded-xl">
           <Type className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-purple-400 mb-1">"LEGO Words"</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Computers are really good at numbers, but they don't know what a "Banana" or "Robot" is. 
            Think of <b>Tokens</b> like LEGO bricks. Instead of carrying a whole house, we break it down into 
            specific bricks. If the computer sees a new word it doesn't know, it just breaks it into 
            smaller bricks it <i>does</i> know. Each brick has its own ID number!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="brutalist-border p-6 rounded-2xl">
            <h3 className="mono-label mb-4">Your Input</h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xl font-light focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              rows={3}
              placeholder="Type something..."
            />
          </div>

          <div className="p-6 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Binary className="w-4 h-4 text-purple-500" /> Sub-word logic
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Modern models use <b>Byte-Pair Encoding (BPE)</b>. This allows them to break unknown words 
              into pieces they recognize. For example, "Tokenization" might become 
              <span className="text-blue-400"> Token</span> + <span className="text-purple-400">ization</span>.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="brutalist-border p-6 rounded-2xl min-h-[200px]">
            <h3 className="mono-label mb-4 flex items-center justify-between">
              Computed Tokens
              <span className="text-zinc-600 font-mono text-[10px]">{tokens.length} tokens found</span>
            </h3>
            
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode='popLayout'>
                {tokens.map((token, idx) => (
                  <motion.div
                    key={`${token.id}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <div 
                      className="px-3 py-1 rounded-t-lg bg-zinc-800 border-x border-t border-zinc-700 text-xs font-medium"
                      style={{ borderTopColor: token.color, borderTopWidth: '2px' }}
                    >
                      {token.text.replace(' ', '␣')}
                    </div>
                    <div className="px-3 py-0.5 rounded-b-lg bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-500">
                      ID: {token.id}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {inputText === "" && (
                <div className="text-zinc-600 italic text-sm py-8 w-full text-center">
                  Start typing to see tokens appear...
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <Hash className="w-5 h-5 text-zinc-600 mb-2" />
              <h5 className="text-xs font-bold text-zinc-300">Vocabulary Size</h5>
              <p className="text-[10px] text-zinc-500">Most LLMs have a "dictionary" of 30,000 to 100,000 unique tokens.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="w-5 h-5 flex items-center justify-center text-xs font-bold text-zinc-600 border border-zinc-600 rounded-sm mb-2">0/1</div>
              <h5 className="text-xs font-bold text-zinc-300">Context Window</h5>
              <p className="text-[10px] text-zinc-500">The total number of tokens the model can "remember" at once.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
