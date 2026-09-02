'use client';

import React, { useState } from 'react';
import { computeWeightedSum } from '../simulation/neuron';
import { applyActivation } from '../simulation/activations';
import { SlidersHorizontal, Pulse } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface NeuronSectionProps {
  reducedMotion: boolean;
}

export const NeuronSection: React.FC<NeuronSectionProps> = ({ reducedMotion }) => {
  const [inputs, setInputs] = useState<number[]>([1.5, -0.8, 2.0]);
  const defaultWeights = [0.8, -0.5, 0.4];
  const defaultBias = 0.2;

  const handleInputChange = (index: number, val: number) => {
    const updated = [...inputs];
    updated[index] = val;
    setInputs(updated);
  };

  const weightedSum = computeWeightedSum(inputs, defaultWeights, defaultBias);
  const output = applyActivation(weightedSum, 'relu');

  return (
    <section id="neuron" className="relative py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1.2}
        className={cn(
          "fill-[var(--border)]/50 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold">
            Section 01
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">
            01. The Computational Neuron
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            A neuron is the fundamental building block of an artificial neural network. It receives numerical input signals, computes a weighted sum with a bias offset, and applies a non-linear activation function to generate an output signal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Controls */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-semibold mb-6 uppercase tracking-wider">
              <SlidersHorizontal size={18} weight="bold" />
              <span>Input Signal Controllers</span>
            </div>

            <div className="space-y-5">
              {inputs.map((val, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[var(--foreground)]">Input Signal x{idx + 1}</span>
                    <span className="text-[var(--primary)] font-semibold">{val.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-4.0"
                    max="4.0"
                    step="0.1"
                    value={val}
                    onChange={(e) => handleInputChange(idx, parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] space-y-2 text-xs font-mono text-[var(--muted-foreground)]">
              <div className="flex justify-between">
                <span>Fixed Weights (w₁, w₂, w₃):</span>
                <span className="text-[var(--foreground)] font-semibold">[0.80, -0.50, 0.40]</span>
              </div>
              <div className="flex justify-between">
                <span>Fixed Bias (b):</span>
                <span className="text-[var(--foreground)] font-semibold">+0.20</span>
              </div>
            </div>
          </motion.div>

          {/* Real-time Visualization & Formula */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-semibold mb-6 uppercase tracking-wider">
              <Pulse size={18} weight="bold" />
              <span>Live Neuron Calculation Engine</span>
            </div>

            {/* Visual Diagram */}
            <div className="bg-[var(--background)] rounded-2xl p-6 mb-6 border border-[var(--border)] relative overflow-hidden">
              <div className="flex items-center justify-between">
                {/* Inputs Stack */}
                <div className="space-y-3 font-mono text-xs z-10">
                  {inputs.map((val, i) => (
                    <motion.div
                      key={i}
                      animate={reducedMotion ? false : { scale: [1, 1.03, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      className="flex items-center space-x-2"
                    >
                      <span className="w-6 text-[var(--muted-foreground)]">x{i + 1}</span>
                      <div className="px-2.5 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-semibold">
                        {val.toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Computational Node */}
                <motion.div
                  animate={reducedMotion ? false : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-2xl bg-[var(--card)] border-2 border-[var(--primary)] flex flex-col items-center justify-center p-2 z-10 shadow-lg shadow-[var(--primary)]/10"
                >
                  <span className="text-[10px] font-mono text-[var(--primary)] uppercase font-semibold">Weighted Sum</span>
                  <span className="font-mono text-sm font-bold text-[var(--foreground)] mt-0.5">
                    z = {weightedSum.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--muted-foreground)] mt-1">f(z) ReLU</span>
                </motion.div>

                {/* Output Node */}
                <div className="font-mono text-xs z-10 text-right">
                  <span className="block text-[var(--muted-foreground)] font-medium mb-1">Output y</span>
                  <motion.div
                    key={output}
                    initial={reducedMotion ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--primary)] font-bold text-base shadow-sm"
                  >
                    {output.toFixed(2)}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Formula Breakdown */}
            <div className="bg-[var(--muted)]/50 rounded-2xl p-4 border border-[var(--border)] font-mono text-xs space-y-2">
              <div className="text-[var(--muted-foreground)] uppercase text-[10px] tracking-wider mb-1">Mathematical Representation</div>
              <div className="text-[var(--primary)] font-semibold">
                z = (x₁·w₁) + (x₂·w₂) + (x₃·w₃) + b
              </div>
              <div className="text-[var(--foreground)]">
                z = ({inputs[0].toFixed(2)} × 0.8) + ({inputs[1].toFixed(2)} × -0.5) + ({inputs[2].toFixed(2)} × 0.4) + 0.20
              </div>
              <div className="text-[var(--primary)] font-bold pt-1 border-t border-[var(--border)]">
                z = {weightedSum.toFixed(2)}  ➔  y = max(0, {weightedSum.toFixed(2)}) = {output.toFixed(2)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
