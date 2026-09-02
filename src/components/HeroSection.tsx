'use client';

import React from 'react';
import { Sparkle, Cpu, TrendUp, Lightning } from '@phosphor-icons/react';
import { WarpBackground } from '@/components/ui/warp-background';
import { Card, CardContent } from '@/components/ui/card';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface HeroSectionProps {
  reducedMotion: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ reducedMotion }) => {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden bg-[var(--background)] border-b border-[var(--border)] transition-colors duration-300">
      {/* Dark/Light Dot Pattern Background */}
      <DotPattern
        width={20}
        height={20}
        cx={1.5}
        cy={1.5}
        cr={1.5}
        className={cn(
          "fill-[var(--border)]/60 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
        )}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Asymmetric Left Content */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] text-xs font-mono mb-6">
              <Sparkle size={14} weight="fill" className="text-[var(--primary)]" />
              <span className="font-medium tracking-wide">Interactive Learning Lab</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] mb-6 leading-[1.08] font-sans">
              How Does a <span className="text-[var(--primary)]">Neural Network</span> Learn?
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted-foreground)] font-normal leading-relaxed mb-8 max-w-[55ch]">
              Explore the exact mathematical intuition behind forward passes, loss functions, gradient descent, and backpropagation through real-time interactive simulations.
            </p>

            <div className="inline-flex flex-wrap items-center gap-2 p-2 rounded-2xl glass-panel border-[var(--border)] text-xs font-mono text-[var(--foreground)] mb-8">
              <span className="px-3 py-1.5 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] font-medium border border-[var(--primary)]/30">01 Read</span>
              <span className="text-[var(--muted-foreground)]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[var(--muted)] text-[var(--foreground)] font-medium border border-[var(--border)]">02 Observe</span>
              <span className="text-[var(--muted-foreground)]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[var(--muted)] text-[var(--foreground)] font-medium border border-[var(--border)]">03 Interact</span>
              <span className="text-[var(--muted-foreground)]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[var(--muted)] text-[var(--foreground)] font-medium border border-[var(--border)]">04 Master</span>
            </div>
          </div>

          {/* Right Side: Rock-Solid Neural Network Architecture Showcase */}
          <div className="lg:col-span-6">
            <WarpBackground gridColor="rgba(183, 124, 65, 0.1)" perspective={120} beamDuration={4}>
              <Card className="w-full bg-[var(--card)] border-[var(--border)] shadow-2xl overflow-hidden text-[var(--card-foreground)]">
                <CardContent className="p-6 sm:p-8">
                  
                  {/* Top Bar Label */}
                  <div className="text-xs font-mono text-[var(--muted-foreground)] font-medium uppercase tracking-widest mb-4 flex items-center justify-between">
                    <span className="flex items-center space-x-1.5 text-[var(--primary)] font-semibold">
                      <Cpu size={15} weight="bold" />
                      <span>Neural Signal Architecture</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--muted)] border border-[var(--border)] text-[var(--muted-foreground)]">
                      Topic 01
                    </span>
                  </div>

                  {/* SVG Neural Diagram with Theme Variables */}
                  <div className="relative w-full aspect-[540/230] bg-[var(--background)]/80 rounded-2xl border border-[var(--border)] p-2 overflow-hidden">
                    <svg viewBox="0 0 540 230" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="wireGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="var(--ring)" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="wireGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--destructive)" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="outputGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.9" />
                        </linearGradient>

                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* --- COLUMN LABELS --- */}
                      <text x="65" y="24" fill="var(--muted-foreground)" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" textAnchor="middle" letterSpacing="1.5">
                        INPUTS
                      </text>
                      <text x="270" y="24" fill="var(--primary)" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" textAnchor="middle" letterSpacing="1.5">
                        NEURON NODE
                      </text>
                      <text x="475" y="24" fill="var(--muted-foreground)" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" textAnchor="middle" letterSpacing="1.5">
                        OUTPUT
                      </text>

                      {/* --- SYNAPTIC CONNECTION PATHS --- */}
                      <path
                        d="M 88 68 C 145 68, 155 118, 205 118"
                        fill="none"
                        stroke="url(#wireGradient1)"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                      />
                      <path
                        d="M 88 168 C 145 168, 155 118, 205 118"
                        fill="none"
                        stroke="url(#wireGradient2)"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                      />
                      <path
                        d="M 335 118 L 452 118"
                        fill="none"
                        stroke="url(#outputGradient)"
                        strokeWidth="2.5"
                      />

                      {/* --- ANIMATED SIGNAL PARTICLES (60 FPS Framer Motion) --- */}
                      {!reducedMotion && (
                        <>
                          <motion.circle
                            r="4.5"
                            fill="var(--primary)"
                            filter="url(#glow)"
                            animate={{
                              cx: [88, 145, 205],
                              cy: [68, 93, 118],
                              opacity: [0, 1, 0.2],
                            }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          />

                          <motion.circle
                            r="4.5"
                            fill="var(--destructive)"
                            filter="url(#glow)"
                            animate={{
                              cx: [88, 145, 205],
                              cy: [168, 143, 118],
                              opacity: [0, 1, 0.2],
                            }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                          />

                          <motion.circle
                            r="4.5"
                            fill="var(--primary)"
                            filter="url(#glow)"
                            animate={{
                              cx: [335, 393, 452],
                              cy: [118, 118, 118],
                              opacity: [0.8, 1, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                          />
                        </>
                      )}

                      {/* --- WEIGHT BADGES ALONG THE PATHS --- */}
                      <g transform="translate(132, 76)">
                        <rect x="-24" y="-10" width="48" height="20" rx="6" fill="var(--card)" stroke="var(--primary)" strokeWidth="1" />
                        <text x="0" y="3.5" fill="var(--primary)" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" textAnchor="middle">
                          w₁ = +0.8
                        </text>
                      </g>

                      <g transform="translate(132, 160)">
                        <rect x="-24" y="-10" width="48" height="20" rx="6" fill="var(--card)" stroke="var(--destructive)" strokeWidth="1" />
                        <text x="0" y="3.5" fill="var(--destructive)" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" textAnchor="middle">
                          w₂ = -0.5
                        </text>
                      </g>

                      {/* --- INPUT NODES --- */}
                      <g transform="translate(65, 68)">
                        <circle r="23" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" filter="url(#glow)" />
                        <text x="0" y="4" fill="var(--foreground)" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700" textAnchor="middle">
                          x₁
                        </text>
                      </g>

                      <g transform="translate(65, 168)">
                        <circle r="23" fill="var(--card)" stroke="var(--destructive)" strokeWidth="2" filter="url(#glow)" />
                        <text x="0" y="4" fill="var(--foreground)" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700" textAnchor="middle">
                          x₂
                        </text>
                      </g>

                      {/* --- CENTRAL NEURON NODE --- */}
                      <g transform="translate(205, 74)">
                        <rect width="130" height="88" rx="16" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" filter="url(#glow)" />
                        <text x="65" y="32" fill="var(--foreground)" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600" textAnchor="middle">
                          z = Σwx + b
                        </text>
                        <line x1="16" y1="46" x2="114" y2="46" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="65" y="68" fill="var(--primary)" fontSize="14" fontFamily="JetBrains Mono" fontWeight="800" textAnchor="middle">
                          f(z) ReLU
                        </text>
                      </g>

                      {/* --- OUTPUT NODE --- */}
                      <g transform="translate(475, 118)">
                        <circle r="23" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" filter="url(#glow)" />
                        <text x="0" y="4" fill="var(--primary)" fontSize="15" fontFamily="JetBrains Mono" fontWeight="800" textAnchor="middle">
                          ŷ
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Bottom Stats Footer */}
                  <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
                    <span className="flex items-center space-x-1.5 text-[var(--primary)] font-medium">
                      <Lightning size={14} weight="bold" />
                      <span>Math Signal Engine</span>
                    </span>
                    <span className="flex items-center space-x-1 text-[var(--primary)] font-medium">
                      <TrendUp size={14} weight="bold" />
                      <span>60 FPS Particle Flow</span>
                    </span>
                  </div>

                </CardContent>
              </Card>
            </WarpBackground>
          </div>

        </div>
      </div>
    </section>
  );
};
