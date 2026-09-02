import { ActivationType, TrainingIterationRecord } from './types';
import { computeNeuronOutput } from './neuron';
import { computeMSE } from './loss';
import { computeBackpropGradients } from './backpropagation';
import { applyWeightUpdate, applyBiasUpdate } from './gradient-descent';

export function runSingleTrainingStep(
  inputs: number[],
  weights: number[],
  bias: number,
  activation: ActivationType,
  target: number,
  learningRate: number,
  currentIteration: number
): {
  newWeights: number[];
  newBias: number;
  record: TrainingIterationRecord;
} {
  const { weightedSum, output: prediction } = computeNeuronOutput(inputs, weights, bias, activation);
  const loss = computeMSE(prediction, target);
  const backprop = computeBackpropGradients(inputs, weightedSum, activation, prediction, target);

  const newWeights = applyWeightUpdate(weights, backprop.dL_dw, learningRate);
  const newBias = applyBiasUpdate(bias, backprop.dL_db, learningRate);

  const record: TrainingIterationRecord = {
    iteration: currentIteration,
    loss,
    prediction,
    target,
    weights: [...weights],
    bias,
    gradients: [...backprop.dL_dw],
  };

  return { newWeights, newBias, record };
}

export function simulateTrainingSession(
  inputs: number[],
  initialWeights: number[],
  initialBias: number,
  activation: ActivationType,
  target: number,
  learningRate: number,
  totalIterations = 30
): TrainingIterationRecord[] {
  let weights = [...initialWeights];
  let bias = initialBias;
  const history: TrainingIterationRecord[] = [];

  for (let i = 1; i <= totalIterations; i++) {
    const { newWeights, newBias, record } = runSingleTrainingStep(
      inputs,
      weights,
      bias,
      activation,
      target,
      learningRate,
      i
    );
    history.push(record);
    weights = newWeights;
    bias = newBias;
  }

  return history;
}
