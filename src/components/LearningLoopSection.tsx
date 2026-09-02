'use client';

import React, { useState } from 'react';
import { ActivationType, TrainingIterationRecord } from '../simulation/types';
import { simulateTrainingSession } from '../simulation/training-loop';
import { Play, ArrowCounterClockwise, ChartLine, Cpu } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface LearningLoopSectionProps {
  reducedMotion: boolean;
}

export const LearningLoopSection: React.FC<LearningLoopSectionProps> = ({
  reducedMotion,
}) => {
  const inputs = [1.5, 2.0];
  const target = 1.0;
  const activation: ActivationType = 'relu';

  const [initialW] = useState<number[]>([1.8, -1.2]);
  const [initialB] = useState<number>(0.5);
  const [learningRate, setLearningRate] = useState<number>(0.15);
  const [iterations, setIterations] = useState<number>(30);
  const [records, setRecords] = useState<TrainingIterationRecord[]>([]);

  const handleRunTraining = () => {
    const session = simulateTrainingSession(
      inputs,
      initialW,
      initialB,
      activation,
      target,
      learningRate,
      iterations
    );
    setRecords(session);
  };

  const handleReset = () => {
    setRecords([]);
  };

  const svgW = 400;
  const svgH = 180;
  const maxLoss = records.length > 0 ? Math.max(...records.map((r) => r.loss), 0.5) : 1.0;

  const lossPointsPath = records.reduce((acc, rec, idx) => {
    const x = (idx / (records.length - 1 || 1)) * svgW;
    const y = svgH - (rec.loss / maxLoss) * svgH * 0.85 - 10;
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <section id="learning-loop" className="relative py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cx={1.5}
        cy={1.5}
        cr={1.2}
        className={cn(
          "fill-[var(--border)]/50 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
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
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold">
            Section 08
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">08. The Complete Learning Loop</h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            Putting it all together: Neural training is an automated feedback loop. The network predicts, calculates error loss, computes gradients via backpropagation, updates weights, and predicts again until loss converges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-bold uppercase tracking-wider">
              <Cpu size={18} weight="bold" />
              <span>Training Hyperparameters</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--foreground)] font-medium">Total Training Iterations</span>
                  <span className="text-[var(--primary)] font-bold">{iterations} Epochs</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={iterations}
                  onChange={(e) => setIterations(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--foreground)] font-medium">Learning Rate (η)</span>
                  <span className="text-[var(--primary)] font-bold">{learningRate.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.4"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRunTraining}
                className="flex-1 py-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <Play size={16} weight="fill" />
                <span>Run Training Loop</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-3 py-3 rounded-xl bg-[var(--muted)] hover:bg-[var(--accent)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs"
              >
                <ArrowCounterClockwise size={16} weight="bold" />
              </motion.button>
            </div>
          </motion.div>

          {/* Training Results & Loss Chart */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[var(--primary)] font-bold mb-4">
              <span className="flex items-center space-x-1.5">
                <ChartLine size={18} weight="bold" />
                <span>Loss Convergence Curve over Iterations</span>
              </span>
              <span className="text-[var(--muted-foreground)]">
                {records.length > 0 ? `${records.length} iterations executed` : 'Ready'}
              </span>
            </div>

            <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] relative mb-6">
              {records.length > 0 ? (
                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
                  <motion.path
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    d={lossPointsPath}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                  />
                </svg>
              ) : (
                <div className="h-40 flex items-center justify-center text-xs font-mono text-[var(--muted-foreground)]">
                  Click &quot;Run Training Loop&quot; to observe loss convergence.
                </div>
              )}
            </div>

            {records.length > 0 && (
              <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] font-mono text-xs space-y-2 text-[var(--foreground)]">
                <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Epoch Metrics Summary</div>
                <div className="flex justify-between text-[var(--foreground)]">
                  <span>Initial Loss (Epoch 1):</span>
                  <span className="text-[var(--primary)] font-bold">{records[0].loss.toFixed(4)}</span>
                </div>
                <div className="flex justify-between text-[var(--foreground)]">
                  <span>Final Loss (Epoch {records.length}):</span>
                  <span className="text-[var(--primary)] font-bold">{records[records.length - 1].loss.toFixed(4)}</span>
                </div>
                <div className="flex justify-between text-[var(--foreground)] border-t border-[var(--border)] pt-2">
                  <span>Final Prediction ŷ:</span>
                  <span className="text-[var(--primary)] font-bold">
                    {records[records.length - 1].prediction.toFixed(4)} (Target: {target.toFixed(1)})
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
