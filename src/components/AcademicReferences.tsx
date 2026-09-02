'use client';

import React from 'react';
import { BookOpen, ArrowSquareOut } from '@phosphor-icons/react';
import { motion } from 'motion/react';

const REFERENCES = [
  {
    authors: 'McCulloch, W. S., & Pitts, W.',
    year: '1943',
    title: 'A Logical Calculus of the Ideas Immanent in Nervous Activity',
    publication: 'Bulletin of Mathematical Biophysics, 5(4), 115-133.',
    doi: 'https://doi.org/10.1007/BF02478259',
    relevance: 'Foundational historical paper introducing the first mathematical model of an artificial neuron.',
  },
  {
    authors: 'Rosenblatt, F.',
    year: '1958',
    title: 'The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain',
    publication: 'Psychological Review, 65(6), 386-408.',
    doi: 'https://doi.org/10.1037/h0042519',
    relevance: 'Introduced the Perceptron algorithm, establishing supervised weight adaptation principles.',
  },
  {
    authors: 'Rumelhart, D. E., Hinton, G. E., & Williams, R. J.',
    year: '1986',
    title: 'Learning Representations by Back-Propagating Errors',
    publication: 'Nature, 323(6088), 533-536.',
    doi: 'https://doi.org/10.1038/323533a0',
    relevance: 'Pioneered backpropagation via chain rule derivative gradient descent for multi-layer networks.',
  },
];

export const AcademicReferences: React.FC = () => {
  return (
    <section id="references" className="py-20 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold">
            <BookOpen size={18} weight="bold" />
            <span>Academic Basis & Research References</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-1 font-sans">Foundational Scientific Literature</h2>
          <p className="text-[var(--muted-foreground)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
            The mathematical concepts demonstrated in this article are grounded in seminal peer-reviewed research publications in computer science and biophysics.
          </p>
        </motion.div>

        {/* Paper Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REFERENCES.map((paper, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[var(--primary)] font-bold mb-2">
                  {paper.authors} ({paper.year})
                </div>
                <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug mb-2 font-sans">
                  {paper.title}
                </h3>
                <p className="text-xs font-mono text-[var(--muted-foreground)] mb-4">{paper.publication}</p>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-6 font-sans">
                  {paper.relevance}
                </p>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={paper.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[var(--muted)] hover:bg-[var(--accent)] border border-[var(--border)] text-[var(--foreground)] text-xs font-mono transition-colors shadow-xs"
              >
                <span>Read Paper</span>
                <ArrowSquareOut size={14} weight="bold" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
