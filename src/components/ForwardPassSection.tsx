'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SkipForward, ArrowCounterClockwise, CircleNotch } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

interface ForwardPassSectionProps {
  reducedMotion: boolean;
}

const STEPS = [
  {
    step: 1,
    title: '1. Read Input Signals',
    description: 'The neuron receives external vector signals x = [1.00, 2.00].',
    formula: 'x₁ = 1.00,  x₂ = 2.00',
  },
  {
    step: 2,
    title: '2. Compute Weighted Sum (z)',
    description: 'Each input signal is multiplied by its weight and added to the bias.',
    formula: 'z = (x₁·w₁) + (x₂·w₂) + b = (1.0·0.6) + (2.0·0.8) - 0.2 = 2.00',
  },
  {
    step: 3,
    title: '3. Apply Non-Linear Activation f(z)',
    description: 'The scalar weighted sum is passed into the non-linear activation function.',
    formula: 'f(z) = \\text{ReLU}(2.00) = \\max(0, 2.00) = 2.00',
  },
  {
    step: 4,
    title: '4. Produce Output Prediction (ŷ)',
    description: 'The output signal is published as the neural network prediction.',
    formula: '\\hat{y} = 2.00',
  },
];

export const ForwardPassSection: React.FC<ForwardPassSectionProps> = ({ reducedMotion }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic Step Interval (runs by default)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !reducedMotion) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev < 4 ? prev + 1 : 1));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, reducedMotion]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  // Handle manual interaction: pause autoplay, wait 10 seconds, then auto-resume
  const handleManualStep = (targetStep?: number) => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
    setIsPlaying(false);

    if (typeof targetStep === 'number') {
      setCurrentStep(targetStep);
    } else {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : 1));
    }

    // Resume autoplay after 10 seconds of inactivity
    pauseTimerRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 10000);
  };

  const handleReset = () => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
    setIsPlaying(false);
    setCurrentStep(1);

    pauseTimerRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 10000);
  };

  const stepInfo = STEPS[currentStep - 1];

  return (
    <section id="forward-pass" className="py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold">
            Section 03
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">03. The Forward Pass Stepper</h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            The forward pass is the sequential propagation of input data through the neural architecture to produce a prediction. Watch the automated stepper or advance manually below.
          </p>
        </motion.div>

        {/* Stepper Controls Bar */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Control Buttons */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleManualStep()}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-[var(--primary)] hover:opacity-90 text-[var(--primary-foreground)] text-xs font-mono font-semibold transition-all shadow-md"
              >
                <SkipForward size={16} weight="bold" />
                <span>Next Step</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl bg-[var(--muted)] hover:bg-[var(--accent)] border border-[var(--border)] text-[var(--foreground)] text-xs font-mono transition-colors"
              >
                <ArrowCounterClockwise size={16} weight="bold" />
                <span>Reset</span>
              </motion.button>
            </div>

            {/* Status & Step Indicators */}
            <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
              {/* Autoplay Status Badge */}
              <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono text-[var(--muted-foreground)]">
                {isPlaying ? (
                  <span className="flex items-center space-x-1 text-[var(--primary)]">
                    <CircleNotch size={12} weight="bold" className="animate-spin" />
                    <span>Autoplay</span>
                  </span>
                ) : (
                  <span className="text-[var(--muted-foreground)]">Paused (10s)</span>
                )}
              </div>

              {/* Step Numbers */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {STEPS.map((s) => (
                  <button
                    key={s.step}
                    onClick={() => handleManualStep(s.step)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-xs flex items-center justify-center border transition-all ${
                      currentStep === s.step
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)] font-bold shadow-md'
                        : currentStep > s.step
                        ? 'bg-[var(--card)] border-[var(--primary)]/50 text-[var(--primary)]'
                        : 'bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]'
                    }`}
                  >
                    {s.step}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visual Stepper Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Step Active Card */}
          <div className="md:col-span-6 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--primary)] mb-4">
              <span>ACTIVE STAGE</span>
              <span className="px-2 py-0.5 rounded bg-[var(--primary)]/15 border border-[var(--primary)]/30 font-semibold">
                Step {currentStep} of 4
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 font-sans">{stepInfo.title}</h3>
                <p className="text-[var(--muted-foreground)] text-xs leading-relaxed mb-6 font-sans">{stepInfo.description}</p>

                <div className="bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)] font-mono text-xs text-[var(--primary)]">
                  <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Formula Execution</div>
                  {stepInfo.formula}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Pipeline Architecture */}
          <div className="md:col-span-6 glass-panel rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] flex flex-col justify-between">
            <div className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
              Pipeline Stage Highlight
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[1, 2, 3, 4].map((stepNum) => (
                <motion.div
                  key={stepNum}
                  animate={currentStep === stepNum ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120 }}
                  className={`p-3 rounded-xl border transition-all ${
                    currentStep === stepNum
                      ? 'bg-[var(--primary)]/15 border-[var(--primary)] text-[var(--primary)] font-semibold'
                      : 'bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)]'
                  }`}
                >
                  {stepNum === 1 && '[Stage 1] Inputs: x = [1.00, 2.00]'}
                  {stepNum === 2 && '[Stage 2] Weighted Sum z = (1.0×0.6) + (2.0×0.8) - 0.2 = 2.00'}
                  {stepNum === 3 && '[Stage 3] Activation f(2.00) = max(0, 2.00) = 2.00'}
                  {stepNum === 4 && '[Stage 4] Final Output Prediction ŷ = 2.00'}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
