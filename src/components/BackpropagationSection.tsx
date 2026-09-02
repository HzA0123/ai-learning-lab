'use client';

import React, { useState } from 'react';
import { computeBackpropGradients } from '../simulation/backpropagation';
import { computeWeightedSum } from '../simulation/neuron';
import { applyActivation } from '../simulation/activations';
import { computeMSE } from '../simulation/loss';
import { ArrowLeft, Play, GitCommit } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface BackpropagationSectionProps {
  reducedMotion: boolean;
}

export const BackpropagationSection: React.FC<BackpropagationSectionProps> = ({
  reducedMotion,
}) => {
  const inputs = [1.5, 2.0];
  const target = 1.0;

  const [weights, setWeights] = useState<number[]>([1.8, -1.2]);
  const [bias, setBias] = useState<number>(0.5);

  const z = computeWeightedSum(inputs, weights, bias);
  const prediction = applyActivation(z, 'relu');
  const loss = computeMSE(prediction, target);

  const grads = computeBackpropGradients(inputs, z, 'relu', prediction, target);

  const handleStepUpdate = () => {
    const learningRate = 0.1;
    const newW1 = weights[0] - learningRate * grads.dL_dw[0];
    const newW2 = weights[1] - learningRate * grads.dL_dw[1];
    const newB = bias - learningRate * grads.dL_db;

    setWeights([newW1, newW2]);
    setBias(newB);
  };

  return (
    <section id="backprop" className="relative py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
      <DotPattern
        width={24}
        height={24}
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
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold">
            Section 07
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">07. Backpropagation & Chain Rule Derivatives</h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            Backpropagation calculates how much each weight contributed to the total loss error by propagating partial derivatives backwards through the network using calculus chain rule.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chain Rule Partial Derivatives Breakdown */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-semibold uppercase tracking-wider">
              <ArrowLeft size={18} weight="bold" />
              <span>Reverse Derivative Chain Rule Flow</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {/* Step A */}
              <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)] space-y-1">
                <div className="text-[var(--primary)] font-bold">Stage 1: Loss Derivative wrt Output (∂L/∂ŷ)</div>
                <div className="text-[var(--foreground)]">∂L/∂ŷ = ŷ - y = {prediction.toFixed(2)} - {target.toFixed(1)} = {grads.dL_dpred.toFixed(4)}</div>
              </div>

              {/* Step B */}
              <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)] space-y-1">
                <div className="text-[var(--primary)] font-bold">Stage 2: Activation Derivative wrt Sum (∂ŷ/∂z)</div>
                <div className="text-[var(--foreground)]">d/dz ReLU({z.toFixed(2)}) = {grads.dpred_dz.toFixed(1)}</div>
              </div>

              {/* Step C */}
              <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)] space-y-1">
                <div className="text-[var(--primary)] font-bold">Stage 3: Final Weight Gradient (∂L/∂w₁)</div>
                <div className="text-[var(--primary)] font-bold">
                  ∂L/∂w₁ = (∂L/∂ŷ) · (∂ŷ/∂z) · (∂z/∂w₁) = {grads.dL_dpred.toFixed(2)} × {grads.dpred_dz.toFixed(1)} × {inputs[0].toFixed(1)} = {grads.dL_dw[0].toFixed(4)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Weight Update Test */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--primary)] font-semibold uppercase tracking-wider">
              <GitCommit size={18} weight="bold" />
              <span>Gradient Weight Step Update</span>
            </div>

            <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] space-y-3 font-mono text-xs text-[var(--foreground)]">
              <div className="flex justify-between">
                <span>Weight w₁:</span>
                <span className="text-[var(--primary)] font-bold">{weights[0].toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Weight w₂:</span>
                <span className="text-[var(--primary)] font-bold">{weights[1].toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Bias b:</span>
                <span className="text-[var(--primary)] font-bold">{bias.toFixed(3)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border)] text-[var(--primary)]">
                <span>Computed Loss:</span>
                <span className="font-extrabold">{loss.toFixed(4)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStepUpdate}
              className="w-full py-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Play size={16} weight="fill" />
              <span>Apply Backprop Gradient Step (η=0.1)</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
