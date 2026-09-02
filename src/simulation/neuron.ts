import { ActivationType } from './types';
import { applyActivation } from './activations';

/**
 * Calculates weighted sum z = Σ(w_i * x_i) + b
 */
export function computeWeightedSum(inputs: number[], weights: number[], bias: number): number {
  const productSum = inputs.reduce((sum, x, idx) => sum + x * (weights[idx] ?? 0), 0);
  return productSum + bias;
}

/**
 * Calculates full single neuron output y = f( Σ(w_i * x_i) + b )
 */
export function computeNeuronOutput(
  inputs: number[],
  weights: number[],
  bias: number,
  activation: ActivationType
): { weightedSum: number; output: number } {
  const weightedSum = computeWeightedSum(inputs, weights, bias);
  const output = applyActivation(weightedSum, activation);
  return { weightedSum, output };
}
