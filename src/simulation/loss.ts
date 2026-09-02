/**
 * Mean Squared Error (MSE) / Half-Squared Error Loss: L = 1/2 * (prediction - target)^2
 * We use 1/2 factor to make derivative cleaner: dL/d(pred) = (prediction - target)
 */
export function computeMSE(prediction: number, target: number): number {
  const error = prediction - target;
  return 0.5 * error * error;
}

export function computeAbsoluteError(prediction: number, target: number): number {
  return Math.abs(prediction - target);
}

export function computeLossGradientWrtPrediction(prediction: number, target: number): number {
  return prediction - target;
}
