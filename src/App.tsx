/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import TrainingVisual from './components/TrainingVisual';
import TokenizationVisual from './components/TokenizationVisual';
import PredictionPlayground from './components/PredictionPlayground';
import { Cpu, Github, ExternalLink, Brain } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">LLM Inside Out</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <a href="#training" className="hover:text-zinc-200 transition-colors">01 Training</a>
            <a href="#tokens" className="hover:text-zinc-200 transition-colors">02 Tokenization</a>
            <a href="#prediction" className="hover:text-zinc-200 transition-colors">03 Prediction</a>
          </nav>

          <div className="flex items-center gap-4">
             <button className="text-zinc-500 hover:text-zinc-200 transition-colors">
               <Github className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-6 max-w-4xl mx-auto text-center border-x border-zinc-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-widest mb-6"
          >
            <Cpu className="w-3 h-3" /> Technical Interactive Guide
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            How do <span className="text-blue-500">LLMs</span> actually work?
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Large Language Models perform a simple task: <span className="text-zinc-200 underline decoration-blue-500/50 underline-offset-4">predicting the next word</span>. 
            Yet, this simple goal leads to human-like intelligence. Let's break it down.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="flex flex-wrap justify-center gap-4"
          >
            <a href="#training" className="px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold hover:bg-white transition-all">
              Start The Journey
            </a>
            <a href="#prediction" className="px-6 py-3 rounded-xl bg-zinc-900 text-zinc-300 font-semibold border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center gap-2">
              Play with Parameters <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </section>

        {/* Content Sections */}
        <div id="training">
          <TrainingVisual />
        </div>
        
        <div id="tokens">
          <TokenizationVisual />
        </div>

        <div id="prediction">
          <PredictionPlayground />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
               <Brain className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">LLM Inside Out</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-10">
            A production-grade explainer designed to make the invisible math of AI visible to everyone.
          </p>
          <div className="flex justify-center gap-8 text-[11px] font-mono text-zinc-600 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-400">Terms</a>
            <a href="#" className="hover:text-blue-400">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
