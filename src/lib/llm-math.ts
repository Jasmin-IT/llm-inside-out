/**
 * Utility functions for simulating LLM sampling logic.
 */

export interface TokenPrediction {
  word: string;
  logit: number;
  prob: number;
}

/**
 * Applies Softmax with Temperature
 */
export function calculateSoftmax(logits: number[], temperature: number): number[] {
  // Edge case: extremely low temperature (deterministic)
  if (temperature < 0.01) {
    const maxIdx = logits.indexOf(Math.max(...logits));
    return logits.map((_, i) => (i === maxIdx ? 1 : 0));
  }

  const scaledLogits = logits.map((l) => l / temperature);
  const maxLogit = Math.max(...scaledLogits); // for numerical stability
  const expLogits = scaledLogits.map((l) => Math.exp(l - maxLogit));
  const sumExp = expLogits.reduce((a, b) => a + b, 0);
  return expLogits.map((e) => e / sumExp);
}

/**
 * Top-K filtering: Keep only top K indices
 */
export function applyTopK(predictions: TokenPrediction[], k: number): TokenPrediction[] {
  const sorted = [...predictions].sort((a, b) => b.logit - a.logit);
  const topKEntries = sorted.slice(0, k);
  const minLogit = topKEntries[topKEntries.length - 1].logit;
  
  return predictions.map(p => ({
    ...p,
    logit: p.logit >= minLogit ? p.logit : -Infinity,
    prob: p.logit >= minLogit ? p.prob : 0
  }));
}

/**
 * Top-P (Nucleus) filtering
 */
export function applyTopP(predictions: TokenPrediction[], p: number): TokenPrediction[] {
  const sorted = [...predictions].sort((a, b) => b.prob - a.prob);
  let cumulativeProb = 0;
  const keptWords = new Set<string>();

  for (const item of sorted) {
    cumulativeProb += item.prob;
    keptWords.add(item.word);
    if (cumulativeProb >= p) break;
  }

  return predictions.map(item => ({
    ...item,
    logit: keptWords.has(item.word) ? item.logit : -Infinity,
    prob: keptWords.has(item.word) ? item.prob : 0
  }));
}

/**
 * Re-normalizes probabilities after filtering
 */
export function renormalize(predictions: TokenPrediction[]): TokenPrediction[] {
  const sum = predictions.reduce((a, b) => a + b.prob, 0);
  if (sum === 0) return predictions;
  return predictions.map(p => ({
    ...p,
    prob: p.prob / sum
  }));
}
