import { ActivationType, BackpropGradients } from './types';
import { activationDerivative } from './activations';
import { computeLossGradientWrtPrediction } from './loss';

export function computeBackpropGradients(
  inputs: number[],
  z: number,
  activation: ActivationType,
  prediction: number,
  target: number
): BackpropGradients {
  const dL_dpred = computeLossGradientWrtPrediction(prediction, target);
  const dpred_dz = activationDerivative(z, activation);
  const dL_dz = dL_dpred * dpred_dz;

  const dL_dw = inputs.map((x_i) => dL_dz * x_i);
  const dL_db = dL_dz * 1;

  return {
    dL_dpred,
    dpred_dz,
    dL_dz,
    dL_dw,
    dL_db,
  };
}
