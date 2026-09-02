'use client';

import React, { useState } from 'react';
import { computeWeightedSum } from '../simulation/neuron';
import { applyActivation } from '../simulation/activations';
import { SlidersHorizontal, GitBranch } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface WeightsBiasSectionProps {
  reducedMotion: boolean;
}

export const WeightsBiasSection: React.FC<WeightsBiasSectionProps> = ({ reducedMotion }) => {
  const inputs = [2.0, 1.0];
  const [weights, setWeights] = useState<number[]>([1.2, -0.8]);
  const [bias, setBias] = useState<number>(0.5);

  const handleWeightChange = (index: number, val: number) => {
    const updated = [...weights];
    updated[index] = val;
    setWeights(updated);
  };

  const z = computeWeightedSum(inputs, weights, bias);
  const output = applyActivation(z, 'relu');

  return (
    <section id="weights" className="relative py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cx={1.5}
        cy={1.5}
        cr={1.2}
        className={cn(
          "fill-[var(--border)]/50 [mask-image:radial-gradient(550px_circle_at_center,white,transparent)]",
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
            Section 02
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">
            02. Weights & Bias Exploration
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            Weights scale the strength of incoming signals (synaptic connections), while bias shifts the activation threshold regardless of inputs. Adjust weights and bias below to observe their effect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-6 glass-panel rounded-3xl p-4 sm:p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-semibold uppercase tracking-wider">
              <SlidersHorizontal size={18} weight="bold" />
              <span>Weight & Bias Parameters</span>
            </div>

            {/* Weights Sliders */}
            <div className="space-y-4">
              {weights.map((w, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[var(--foreground)] font-medium">Weight w{idx + 1} (Input x{idx + 1} = {inputs[idx].toFixed(1)})</span>
                    <span className="text-[var(--primary)] font-bold">{w.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-3.0"
                    max="3.0"
                    step="0.1"
                    value={w}
                    onChange={(e) => handleWeightChange(idx, parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                  />
                </div>
              ))}

              {/* Bias Slider */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border)]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--foreground)] font-medium">Bias Offset (b)</span>
                  <span className="text-[var(--primary)] font-bold">{bias.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-3.0"
                  max="3.0"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-6 glass-panel rounded-3xl p-4 sm:p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-semibold mb-6 uppercase tracking-wider">
              <GitBranch size={18} weight="bold" />
              <span>Mathematical Output Signal</span>
            </div>

            <div className="bg-[var(--background)] rounded-2xl p-6 border border-[var(--border)] space-y-4">
              <div className="flex justify-between items-center text-xs font-mono border-b border-[var(--border)] pb-3">
                <span className="text-[var(--muted-foreground)]">Linear Sum z:</span>
                <span className="text-lg font-bold text-[var(--foreground)]">{z.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xs font-mono border-b border-[var(--border)] pb-3">
                <span className="text-[var(--muted-foreground)]">Activated Output y:</span>
                <span className="text-xl font-extrabold text-[var(--primary)]">{output.toFixed(2)}</span>
              </div>

              <div className="text-[11px] font-mono text-[var(--muted-foreground)] leading-relaxed pt-1">
                z = (2.0 × {weights[0].toFixed(2)}) + (1.0 × {weights[1].toFixed(2)}) + ({bias.toFixed(2)}) = {z.toFixed(2)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
