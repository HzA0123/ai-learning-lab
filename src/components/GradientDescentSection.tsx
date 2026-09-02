'use client';

import React, { useState } from 'react';
import { generateLossParabola } from '../simulation/gradient-descent';
import { SlidersHorizontal, TrendDown, ArrowsClockwise } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface GradientDescentSectionProps {
  reducedMotion: boolean;
}

export const GradientDescentSection: React.FC<GradientDescentSectionProps> = ({
  reducedMotion,
}) => {
  const optimalW = 0.0;
  const [currentW, setCurrentW] = useState<number>(-3.2);
  const [learningRate, setLearningRate] = useState<number>(0.3);
  const [stepHistory, setStepHistory] = useState<number[]>([-3.2]);

  const points = generateLossParabola(optimalW, -4, 4, 0.4, 80);

  const currentGrad = 0.8 * currentW;
  const currentLoss = 0.4 * currentW * currentW + 0.05;

  const svgW = 400;
  const svgH = 220;
  const mapWToX = (w: number) => ((w + 4) / 8) * svgW;
  const mapLossToY = (l: number) => svgH - (l / 7.0) * svgH;

  const parabolaPath = points.reduce((acc, pt, idx) => {
    const x = mapWToX(pt.w);
    const y = mapLossToY(pt.loss);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const dotX = mapWToX(currentW);
  const dotY = mapLossToY(currentLoss);

  const handleStep = () => {
    const nextW = currentW - learningRate * currentGrad;
    setCurrentW(nextW);
    setStepHistory((prev) => [...prev.slice(-10), nextW]);
  };

  const handleReset = () => {
    setCurrentW(-3.2);
    setStepHistory([-3.2]);
  };

  let lrLabel = 'Optimal';
  let lrColor = 'text-[var(--primary)] font-bold';
  if (learningRate < 0.15) {
    lrLabel = 'Slow (Tiny Steps)';
    lrColor = 'text-[var(--muted-foreground)] font-bold';
  } else if (learningRate > 0.6) {
    lrLabel = 'Too Large (Overshooting)';
    lrColor = 'text-[var(--destructive)] font-bold';
  }

  return (
    <section id="gradient" className="relative py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
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
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold">
            Section 06
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">06. Gradient Descent & Learning Rate</h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            Gradient descent calculates the slope (gradient) of the loss landscape with respect to weights, taking iterative steps in the opposite direction of the gradient to reach the minimum loss.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Parabola Graph */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-4 sm:p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[var(--primary)] font-bold mb-4">
              <span className="flex items-center space-x-1.5">
                <TrendDown size={18} weight="bold" />
                <span>Loss Landscape Curve</span>
              </span>
              <span className="text-[var(--muted-foreground)]">Optimal w* = 0.0</span>
            </div>

            <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] relative">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible">
                {/* Curve */}
                <path d={parabolaPath} fill="none" stroke="var(--primary)" strokeWidth="2.5" />

                {/* History Dots */}
                {stepHistory.map((wVal, i) => {
                  const x = mapWToX(wVal);
                  const l = 0.4 * wVal * wVal + 0.05;
                  const y = mapLossToY(l);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="var(--primary)"
                      opacity={0.3 + (i / stepHistory.length) * 0.7}
                    />
                  );
                })}

                {/* Ultra Smooth Framer Motion Ball */}
                <motion.circle
                  animate={{ cx: dotX, cy: dotY }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                  r="7"
                  fill="var(--primary)"
                  stroke="var(--card)"
                  strokeWidth="2"
                  className="shadow-lg"
                />
              </svg>
            </div>
          </motion.div>

          {/* Learning Rate Controls */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-4 sm:p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-bold uppercase tracking-wider">
              <SlidersHorizontal size={18} weight="bold" />
              <span>Hyperparameter Controls</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--foreground)]">Learning Rate (η)</span>
                <span className={lrColor}>{learningRate.toFixed(2)} — {lrLabel}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.05"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStep}
                className="flex-1 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-mono text-xs font-bold transition-all shadow-md"
              >
                Take Gradient Step
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-3 py-2.5 rounded-xl bg-[var(--muted)] hover:bg-[var(--accent)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs"
                title="Reset Position"
              >
                <ArrowsClockwise size={16} weight="bold" />
              </motion.button>
            </div>

            {/* Numerical State */}
            <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] font-mono text-xs space-y-2 text-[var(--foreground)]">
              <div className="flex justify-between">
                <span>Current Weight w:</span>
                <span className="text-[var(--primary)] font-bold">{currentW.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gradient ∂L/∂w:</span>
                <span className="text-[var(--foreground)] font-bold">{currentGrad.toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--border)] pt-2">
                <span>Current Loss L:</span>
                <span className="text-[var(--primary)] font-bold">{currentLoss.toFixed(4)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
