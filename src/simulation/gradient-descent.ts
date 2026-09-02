export function applyWeightUpdate(
  currentWeights: number[],
  gradients: number[],
  learningRate: number
): number[] {
  return currentWeights.map((w, idx) => {
    const grad = gradients[idx] ?? 0;
    return w - learningRate * grad;
  });
}

export function applyBiasUpdate(
  currentBias: number,
  gradientB: number,
  learningRate: number
): number {
  return currentBias - learningRate * gradientB;
}

export interface ParabolaPoint {
  w: number;
  loss: number;
}

/**
 * Generates a 1D loss landscape curve centered around target optimal weight
 */
export function generateLossParabola(
  optimalW: number,
  minW = -4,
  maxW = 4,
  curvature = 0.5,
  steps = 80
): ParabolaPoint[] {
  const points: ParabolaPoint[] = [];
  const stepSize = (maxW - minW) / steps;
  for (let i = 0; i <= steps; i++) {
    const w = minW + i * stepSize;
    const diff = w - optimalW;
    const loss = curvature * diff * diff + 0.05;
    points.push({ w, loss });
  }
  return points;
}
