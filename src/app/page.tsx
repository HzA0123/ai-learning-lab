'use client';

import React, { useState, useEffect } from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { HeroSection } from '@/components/HeroSection';
import { NeuronSection } from '@/components/NeuronSection';
import { WeightsBiasSection } from '@/components/WeightsBiasSection';
import { ForwardPassSection } from '@/components/ForwardPassSection';
import { ActivationSection } from '@/components/ActivationSection';
import { LossSection } from '@/components/LossSection';
import { GradientDescentSection } from '@/components/GradientDescentSection';
import { BackpropagationSection } from '@/components/BackpropagationSection';
import { LearningLoopSection } from '@/components/LearningLoopSection';
import { AcademicReferences } from '@/components/AcademicReferences';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Sync theme class '.dark' on <html> document element
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 selection:bg-[var(--primary)]/30 selection:text-[var(--foreground)]">
      {/* Header Navigation */}
      <HeaderNav
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Single-Page Scientific Experience */}
      <main id="main-content">
        <HeroSection reducedMotion={reducedMotion} />
        <NeuronSection reducedMotion={reducedMotion} />
        <WeightsBiasSection reducedMotion={reducedMotion} />
        <ForwardPassSection reducedMotion={reducedMotion} />
        <ActivationSection reducedMotion={reducedMotion} />
        <LossSection reducedMotion={reducedMotion} />
        <GradientDescentSection reducedMotion={reducedMotion} />
        <BackpropagationSection reducedMotion={reducedMotion} />
        <LearningLoopSection reducedMotion={reducedMotion} />
        <AcademicReferences />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
