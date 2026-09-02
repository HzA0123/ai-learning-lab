'use client';

import React from 'react';
import { Cpu, ArrowUp } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)]">
            <Cpu size={18} weight="bold" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--foreground)] font-sans">AI Learning Lab</div>
            <div className="text-xs text-[var(--muted-foreground)] font-mono">Topic 01: Neural Networks — How a Neural Network Learns</div>
          </div>
        </div>

        <div className="text-xs text-[var(--muted-foreground)] font-mono text-center sm:text-right">
          <p className="italic mb-2">&quot;Explain through interaction, not through walls of text.&quot;</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-[var(--primary)] hover:opacity-80 transition-colors font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} weight="bold" />
          </button>
        </div>
      </div>
    </footer>
  );
};
