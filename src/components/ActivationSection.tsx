'use client';

import React, { useState } from 'react';
import { ActivationType } from '../simulation/types';
import {
  applyActivation,
  getActivationFormula,
  generateActivationCurve,
} from '../simulation/activations';
import { TrendUp, Pulse } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface ActivationSectionProps {
  reducedMotion: boolean;
}

export const ActivationSection: React.FC<ActivationSectionProps> = ({ reducedMotion }) => {
  const [activeFunc, setActiveFunc] = useState<ActivationType>('relu');
  const [testZ, setTestZ] = useState<number>(1.5);

  const formulaInfo = getActivationFormula(activeFunc);
  const outputY = applyActivation(testZ, activeFunc);
  const points = generateActivationCurve(activeFunc, -5, 5, 80);

  const svgWidth = 400;
  const svgHeight = 240;
  const mapZToX = (z: number) => ((z + 5) / 10) * (svgWidth - 40) + 20;

  const mapYToSvgY = (y: number) => {
    let minY = -0.5;
    let maxY = 5.5;
    if (activeFunc === 'sigmoid') {
      minY = -0.2;
      maxY = 1.2;
    } else if (activeFunc === 'tanh') {
      minY = -1.2;
      maxY = 1.2;
    }
    const clampedY = Math.max(minY, Math.min(maxY, y));
    return svgHeight - 20 - ((clampedY - minY) / (maxY - minY)) * (svgHeight - 40);
  };

  const pathD = points.reduce((acc, pt, idx) => {
    const x = mapZToX(pt.z);
    const y = mapYToSvgY(pt.y);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const dotSvgX = mapZToX(testZ);
  const dotSvgY = mapYToSvgY(outputY);

  return (
    <section id="activation" className="relative py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
      <DotPattern
        width={24}
        height={24}
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
            Section 04
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">04. Activation Function Playground</h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            Without non-linear activation functions, a deep neural network would collapse mathematically into a simple linear model. Compare non-linear activation functions dynamically below.
          </p>
        </motion.div>

        {/* Function Selector Tabs */}
        <div className="flex space-x-2 mb-8">
          {(['relu', 'sigmoid', 'tanh'] as ActivationType[]).map((func) => (
            <motion.button
              key={func}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveFunc(func)}
              className={`px-5 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider border transition-all ${
                activeFunc === func
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-md font-bold'
                  : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {func}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Curve Graph Visualization */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[var(--primary)] font-bold mb-4">
              <span className="flex items-center space-x-1.5">
                <TrendUp size={18} weight="bold" />
                <span className="uppercase">Interactive Graph f(z)</span>
              </span>
              <span className="text-[var(--muted-foreground)]">z ∈ [-5, 5]</span>
            </div>

            {/* SVG Graph View with Overflow Containment */}
            <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] relative overflow-hidden">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-hidden">
                {/* Grid Axes */}
                <line
                  x1="0"
                  y1={mapYToSvgY(0)}
                  x2={svgWidth}
                  y2={mapYToSvgY(0)}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <line
                  x1={mapZToX(0)}
                  y1="0"
                  x2={mapZToX(0)}
                  y2={svgHeight}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Function Curve */}
                <path d={pathD} fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Dynamic Evaluation Point */}
                <circle
                  cx={dotSvgX}
                  cy={dotSvgY}
                  r="7"
                  fill="var(--primary)"
                  stroke="var(--card)"
                  strokeWidth="2"
                  className="shadow-lg"
                />
              </svg>
            </div>
          </motion.div>

          {/* Controls & Formula breakdown */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-bold uppercase tracking-wider">
              <Pulse size={18} weight="bold" />
              <span>Input Z Evaluation</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--foreground)]">Weighted Sum Input (z)</span>
                <span className="text-[var(--primary)] font-bold">{testZ.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-5.0"
                max="5.0"
                step="0.1"
                value={testZ}
                onChange={(e) => setTestZ(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            {/* Readout */}
            <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-[var(--foreground)]">
                <span>Selected Function:</span>
                <span className="px-2 py-0.5 rounded bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30 uppercase font-bold">
                  {activeFunc}
                </span>
              </div>

              <div className="flex justify-between items-center text-[var(--foreground)]">
                <span>Evaluated Output y:</span>
                <span className="text-[var(--primary)] font-bold text-sm">
                  {outputY.toFixed(4)}
                </span>
              </div>

              <div className="pt-3 border-t border-[var(--border)] text-[var(--muted-foreground)] text-[11px] leading-relaxed">
                {formulaInfo.description}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
