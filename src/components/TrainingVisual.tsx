import { motion } from 'motion/react';
import { BookOpen, BrainCircuit, Target, CheckCircle2, Info, ArrowRight, Zap, Database } from 'lucide-react';

export default function TrainingVisual() {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <BookOpen className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Step 1: Training (Self-Supervision)</h2>
          <p className="text-zinc-400 text-sm">The process of turning raw data into intelligence through trillions of calculations.</p>
        </div>
      </div>

      {/* ELI5 Section */}
      <div className="mb-12 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex gap-4 items-start">
        <div className="p-3 bg-blue-500 rounded-xl">
           <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-blue-400 mb-1">"The Detective Game"</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Imagine a detective reading every book in a giant library. To learn, the detective covers up one word with their thumb and tries to guess what it is. 
            If they guess wrong, a "Smart Coach" tells them <i>"You were off by this much!"</i>. The detective then changes how they think just a tiny bit so they won't 
            make that same mistake again. After doing this a trillion times, the detective starts to understand how every story is built!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connection Lines (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-[30%] right-[30%] h-px bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-purple-500/20 -z-10"></div>

        {/* Stage 1 */}
        <div className="flex flex-col gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="brutalist-border p-6 rounded-2xl border-orange-500/20 flex-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
                <span className="text-xs font-mono text-orange-400">01</span>
              </div>
              <Database className="w-4 h-4 text-zinc-600" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">The Masking Task</h3>
            <p className="text-[11px] text-zinc-500 mb-4 uppercase tracking-wider font-mono italic">Phase: Data Preparation</p>
            
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-serif mb-4 shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              "The capital of <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30 blur-[2px] mx-1">France</span> is Paris."
            </div>
            
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                We take a sentence from a book or website and <b>hide</b> a word. This creates a "Ground Truth" that the model doesn't see yet.
              </p>
              <div className="pt-3 border-t border-zinc-800 flex items-start gap-2">
                <Info className="w-3 h-3 text-orange-400 mt-0.5 shrink-0" />
                <p className="text-[10px] text-zinc-500 italic">This is "Self-Supervised" because the data itself provides the correct answer.</p>
              </div>
            </div>
          </motion.div>
          <div className="flex justify-center md:hidden">
            <ArrowRight className="w-6 h-6 text-zinc-700 rotate-90" />
          </div>
        </div>

        {/* Stage 2 */}
        <div className="flex flex-col gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="brutalist-border p-6 rounded-2xl border-blue-500/20 flex-1"
          >
             <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
                <BrainCircuit className="w-4 h-4 text-blue-400" />
              </div>
              <Zap className="w-4 h-4 text-zinc-600" />
            </div>

            <h3 className="text-lg font-semibold mb-2">The Blind Guess</h3>
            <p className="text-[11px] text-zinc-500 mb-4 uppercase tracking-wider font-mono italic">Phase: Forward Pass</p>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="flex items-center justify-between text-[10px] mono-label mb-1">
                  <span>Candidate: London</span>
                  <span className="text-red-400 text-right">Error High</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "45%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-red-400"
                  ></motion.div>
                </div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="flex items-center justify-between text-[10px] mono-label mb-1">
                  <span>Candidate: France</span>
                  <span className="text-green-400 text-right">Correct</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
                    className="h-full bg-green-400"
                  ></motion.div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                The model looks at surrounding words and uses its <b>current weights</b> to estimate the probability of every word in its dictionary.
              </p>
              <div className="pt-3 border-t border-zinc-800 flex items-start gap-2">
                <Info className="w-3 h-3 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-[10px] text-zinc-500 italic">Early in training, these guesses are completely random gibberish.</p>
              </div>
            </div>
          </motion.div>
          <div className="flex justify-center md:hidden">
            <ArrowRight className="w-6 h-6 text-zinc-700 rotate-90" />
          </div>
        </div>

        {/* Stage 3 */}
        <div className="flex flex-col gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="brutalist-border p-6 rounded-2xl border-purple-500/20 flex-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <CheckCircle2 className="w-4 h-4 text-zinc-600" />
            </div>

            <h3 className="text-lg font-semibold mb-2">Backpropagation</h3>
            <p className="text-[11px] text-zinc-500 mb-4 uppercase tracking-wider font-mono italic">Phase: Optimization</p>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-6 flex flex-col items-center justify-center min-h-[100px]">
               <div className="relative mb-4">
                  <div className="flex gap-1.5">
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          height: [12, 24, 12],
                          backgroundColor: i % 2 === 0 ? ["#27272a", "#a855f7", "#27272a"] : ["#27272a", "#3b82f6", "#27272a"]
                        }}
                        transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
                        className="w-1.5 bg-zinc-800 rounded-full"
                      />
                    ))}
                  </div>
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -inset-2 bg-purple-500/10 blur-md rounded-full -z-10"
                  ></motion.div>
               </div>
               <div className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">Adjusting Weights...</div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                If the model guessed 'London' instead of 'France', math is used to trace back which <b>neurons</b> were responsible and nudge them in the right direction.
              </p>
              <div className="pt-3 border-t border-zinc-800 flex items-start gap-2">
                <Info className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
                <p className="text-[10px] text-zinc-500 italic">This is repeated trillions of times until the model "understands" the pattern.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* The Mastery Loop explanation */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold tracking-tight">The "Loss" Function</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Think of training as a mountain climber in the dark. The "Loss" is the distance from the valley. 
            The model uses a math tool called <b>Gradient Descent</b> to feel the slope and step 
            downwards towards better accuracy.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="text-xs font-mono text-zinc-500 mb-1">Total Loss</div>
              <div className="flex items-end gap-2">
                <div className="text-xl font-bold text-red-400">0.024</div>
                <div className="text-[10px] text-green-500 mb-1">↓ 12%</div>
              </div>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="text-xs font-mono text-zinc-500 mb-1">Training Step</div>
              <div className="text-xl font-bold text-zinc-300">#4.2M</div>
            </div>
          </div>
        </div>

        <div className="brutalist-border rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <h4 className="mono-label mb-6 flex items-center gap-2">
            <Target className="w-3 h-3" /> Convergence Visualization
          </h4>
          <div className="h-48 flex items-end justify-between gap-1">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(10, 100 - (i * 5) + (Math.sin(i) * 10))}%` }}
                className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm"
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-mono text-zinc-600">
            <span>START (RANDOM)</span>
            <span>END (INTELLIGENT)</span>
          </div>
        </div>
      </div>

      {/* Scale and Emergent Abilities */}
      <div className="mt-20 p-10 rounded-3xl bg-zinc-900 border border-zinc-800 relative border-l-4 border-l-blue-500 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BrainCircuit className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-400" /> The Secret Sauce: Scale
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-200">The Power of Trillions</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When you combine simple next-word prediction with <b>trillions of parameters</b> (internal math connections) 
                and <b>billions of tokens</b> of data, something magical happens.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-200">Emergent Intelligence</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The model starts to "emerge" with abilities it wasn't explicitly trained for, like coding, 
                logical reasoning, and translation. It learns these to get a better "Loss" score.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <div className="text-2xl font-bold text-blue-400">1.7T</div>
                <div className="text-[9px] mono-label">GPT-4 Weights</div>
              </div>
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <div className="text-2xl font-bold text-blue-400">10T+</div>
                <div className="text-[9px] mono-label">Tokens Read</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Sparkles } from 'lucide-react';

