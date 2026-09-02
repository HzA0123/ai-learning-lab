'use client';

import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Eye,
  EyeSlash,
  Circle,
  SlidersHorizontal,
  Play,
  TrendUp,
  Target,
  TrendDown,
  ArrowLeft,
  ArrowCounterClockwise,
  BookOpen,
  Sun,
  Moon,
  IconProps,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

interface HeaderNavProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

type PhosphorIcon = React.ComponentType<IconProps>;

const TOPIC_ITEMS: {
  id: string;
  title: string;
  description: string;
  icon: PhosphorIcon;
  badge: string;
}[] = [
  {
    id: 'neuron',
    title: '01. Computational Neuron',
    description: 'Weighted sum calculation z = Σ(w·x) + b & linear combination.',
    icon: Circle,
    badge: 'Basics',
  },
  {
    id: 'weights',
    title: '02. Weights & Bias',
    description: 'Synaptic connection strength scaling and constant offset shifts.',
    icon: SlidersHorizontal,
    badge: 'Parameters',
  },
  {
    id: 'forward-pass',
    title: '03. Forward Pass Stepper',
    description: 'Sequential data signal flow execution through network nodes.',
    icon: Play,
    badge: 'Pipeline',
  },
  {
    id: 'activation',
    title: '04. Activation Function',
    description: 'Non-linear transformations (ReLU, Sigmoid, Tanh) playground.',
    icon: TrendUp,
    badge: 'Non-Linear',
  },
  {
    id: 'loss',
    title: '05. Loss & Prediction Error',
    description: 'MSE Loss function distance measurement between prediction & target.',
    icon: Target,
    badge: 'Metric',
  },
  {
    id: 'gradient',
    title: '06. Gradient Descent',
    description: 'Iterative parameter optimization on parabola loss landscape curve.',
    icon: TrendDown,
    badge: 'Optimization',
  },
  {
    id: 'backprop',
    title: '07. Backpropagation',
    description: 'Calculus chain rule partial derivatives error signal propagation.',
    icon: ArrowLeft,
    badge: 'Calculus',
  },
  {
    id: 'learning-loop',
    title: '08. Complete Learning Loop',
    description: 'Automated multi-epoch training loop & loss convergence runner.',
    icon: ArrowCounterClockwise,
    badge: 'Training',
  },
];

const PAPER_ITEMS: {
  authors: string;
  year: string;
  title: string;
  doi: string;
}[] = [
  {
    authors: 'McCulloch & Pitts',
    year: '1943',
    title: 'A Logical Calculus of Ideas Immanent in Nervous Activity',
    doi: 'https://doi.org/10.1007/BF02478259',
  },
  {
    authors: 'Rosenblatt',
    year: '1958',
    title: 'The Perceptron: Probabilistic Model for Information Storage',
    doi: 'https://doi.org/10.1037/h0042519',
  },
  {
    authors: 'Rumelhart, Hinton & Williams',
    year: '1986',
    title: 'Learning Representations by Back-Propagating Errors',
    doi: 'https://doi.org/10.1038/323533a0',
  },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  reducedMotion,
  onToggleReducedMotion,
  theme,
  onToggleTheme,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[var(--border)] backdrop-blur-xl bg-[var(--card)]/90 text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/15 border border-[var(--primary)]/40 flex items-center justify-center text-[var(--primary)]">
            <Cpu size={18} weight="bold" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-wide uppercase font-sans">
              AI Learning Lab
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)] font-mono border border-[var(--border)]">
              Topic 01
            </span>
          </div>
        </div>

        {/* Rich Navigation Menu */}
        <div className="hidden md:flex items-center">
          <NavigationMenu className="z-20">
            <NavigationMenuList className="space-x-1">
              
              {/* Menu Item 1: Learning Topics */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learning Topics</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4">
                  <div className="w-[680px] lg:w-[760px] p-2">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)] font-mono text-xs text-[var(--muted-foreground)]">
                      <span className="font-semibold text-[var(--primary)] uppercase tracking-widest text-[10px]">
                        Interactive Curriculum (8 Modules)
                      </span>
                      <span>Click to scroll</span>
                    </div>

                    <ul className="grid grid-cols-2 gap-2">
                      {TOPIC_ITEMS.map((item) => (
                        <li key={item.id}>
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => scrollToSection(item.id)}
                              className={cn(
                                "w-full text-left block select-none rounded-xl p-3 leading-none no-underline outline-hidden transition-all hover:bg-[var(--accent)]/30 border border-transparent group"
                              )}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2 font-semibold text-xs text-[var(--foreground)] group-hover:text-[var(--primary)] font-sans">
                                  <item.icon size={16} weight="bold" className="text-[var(--primary)]" />
                                  <span>{item.title}</span>
                                </div>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--muted)] border border-[var(--border)] text-[var(--muted-foreground)]">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-2 leading-relaxed font-sans">
                                {item.description}
                              </p>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Menu Item 2: Academic References */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Research Papers</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4">
                  <div className="w-[420px] p-2">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)] font-mono text-xs text-[var(--muted-foreground)]">
                      <span className="font-semibold text-[var(--primary)] uppercase tracking-widest text-[10px]">
                        Seminal Publications
                      </span>
                      <BookOpen size={14} weight="bold" />
                    </div>

                    <ul className="space-y-2">
                      {PAPER_ITEMS.map((paper, idx) => (
                        <li key={idx}>
                          <NavigationMenuLink asChild>
                            <a
                              href={paper.doi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 rounded-xl hover:bg-[var(--accent)]/30 border border-transparent hover:border-[var(--border)] transition-all text-left group"
                            >
                              <div className="flex items-center justify-between text-xs font-mono text-[var(--primary)] font-semibold mb-1">
                                <span>{paper.authors}</span>
                                <span className="text-[var(--muted-foreground)]">({paper.year})</span>
                              </div>
                              <p className="text-xs text-[var(--foreground)] group-hover:text-[var(--primary)] font-medium line-clamp-1 leading-snug">
                                {paper.title}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Direct Link: References Section */}
              <NavigationMenuItem>
                <button
                  onClick={() => scrollToSection('references')}
                  className={navigationMenuTriggerStyle()}
                >
                  Scientific Basis
                </button>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Action Controls: Theme Switcher & Reduced Motion */}
        <div className="flex items-center space-x-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--primary)] transition-all shadow-xs"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={16} weight="bold" className="text-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={16} weight="bold" className="text-[var(--primary)]" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* Motion Toggle Button */}
          <button
            onClick={onToggleReducedMotion}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              reducedMotion
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 font-semibold'
                : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
            title="Toggle reduced motion for animations"
          >
            {reducedMotion ? <EyeSlash size={16} weight="bold" /> : <Eye size={16} weight="bold" />}
            <span className="hidden sm:inline">
              {reducedMotion ? 'Reduced Motion' : 'Motion Active'}
            </span>
          </button>
        </div>
      </div>

      {/* Reading Progress Indicator Bar */}
      <div className="w-full bg-[var(--muted)] h-0.5">
        <div
          className="bg-[var(--primary)] h-0.5 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
