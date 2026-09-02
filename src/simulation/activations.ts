import { ActivationType } from './types';

export function applyActivation(z: number, type: ActivationType): number {
  switch (type) {
    case 'relu':
      return Math.max(0, z);
    case 'sigmoid':
      return 1 / (1 + Math.exp(-Math.max(-50, Math.min(50, z))));
    case 'tanh':
      return Math.tanh(z);
    default:
      return z;
  }
}

export function activationDerivative(z: number, type: ActivationType): number {
  switch (type) {
    case 'relu':
      return z > 0 ? 1 : 0;
    case 'sigmoid': {
      const s = applyActivation(z, 'sigmoid');
      return s * (1 - s);
    }
    case 'tanh': {
      const t = Math.tanh(z);
      return 1 - t * t;
    }
    default:
      return 1;
  }
}

export function getActivationFormula(type: ActivationType): { formula: string; description: string } {
  switch (type) {
    case 'relu':
      return {
        formula: 'f(z) = \\max(0, z)',
        description: 'Passes positive values unchanged, clamps negative inputs to zero.',
      };
    case 'sigmoid':
      return {
        formula: 'f(z) = \\frac{1}{1 + e^{-z}}',
        description: 'Squashes any real number input into a bounded range between (0, 1).',
      };
    case 'tanh':
      return {
        formula: 'f(z) = \\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}',
        description: 'Zero-centered function squashing inputs into a range between (-1, 1).',
      };
  }
}

export interface ActivationPoint {
  z: number;
  y: number;
}

export function generateActivationCurve(
  type: ActivationType,
  minZ = -5,
  maxZ = 5,
  steps = 100
): ActivationPoint[] {
  const points: ActivationPoint[] = [];
  const stepSize = (maxZ - minZ) / steps;
  for (let i = 0; i <= steps; i++) {
    const z = minZ + i * stepSize;
    const y = applyActivation(z, type);
    points.push({ z, y });
  }
  return points;
}
