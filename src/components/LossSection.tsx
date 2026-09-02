'use client';

import React, { useState } from 'react';
import { computeMSE, computeLossGradientWrtPrediction } from '../simulation/loss';
import { Target, Warning } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface LossSectionProps {
  reducedMotion: boolean;
}

export const LossSection: React.FC<LossSectionProps> = ({ reducedMotion }) => {
  const targetOutput = 1.0;
  const [prediction, setPrediction] = useState<number>(2.5);

  const rawResidual = prediction - targetOutput;
  const mseLoss = computeMSE(prediction, targetOutput);
  const gradient = computeLossGradientWrtPrediction(prediction, targetOutput);

  return (
    <section id="loss" className="relative py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
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
            Section 05
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">05. Measuring Error with Loss Functions</h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            A loss function quantifies how far the neural network prediction is from the true target value. Minimizing loss drives the entire learning process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-6 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-semibold uppercase tracking-wider">
              <Target size={18} weight="bold" />
              <span>Target vs Prediction Slider</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--foreground)] font-medium">Model Prediction (ŷ)</span>
                  <span className="text-[var(--primary)] font-bold">{prediction.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-3.0"
                  max="4.0"
                  step="0.1"
                  value={prediction}
                  onChange={(e) => setPrediction(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                />
              </div>

              <div className="pt-2 border-t border-[var(--border)] text-xs font-mono flex justify-between text-[var(--muted-foreground)]">
                <span>Ground Truth Target (y):</span>
                <span className="text-[var(--foreground)] font-bold">{targetOutput.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Loss Metrics Readout */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-6 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-4"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[var(--primary)] font-semibold">
              <span className="flex items-center space-x-1.5">
                <Warning size={18} weight="bold" />
                <span>Squared Error Loss Breakdown</span>
              </span>
            </div>

            <div className="bg-[var(--background)] rounded-2xl p-6 border border-[var(--border)] space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center text-[var(--muted-foreground)]">
                <span>Raw Residual (ŷ - y):</span>
                <span className="text-[var(--foreground)] font-bold">{rawResidual.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-[var(--muted-foreground)]">
                <span>Gradient ∂L/∂ŷ:</span>
                <span className="text-[var(--primary)] font-bold">{gradient.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-[var(--foreground)] pt-3 border-t border-[var(--border)]">
                <span>MSE Loss Value ½(ŷ - y)²:</span>
                <span className="text-2xl font-extrabold text-[var(--primary)]">
                  {mseLoss.toFixed(4)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
