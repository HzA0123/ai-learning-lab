export type ActivationType = 'relu' | 'sigmoid' | 'tanh';

export interface SimulationState {
  inputs: number[]; // e.g. [x1, x2, x3]
  weights: number[]; // e.g. [w1, w2, w3]
  bias: number;
  activation: ActivationType;
  weightedSum: number; // z = Σ(w_i * x_i) + b
  output: number; // y = f(z)
  target: number; // expected target value y_target
  loss: number; // MSE or absolute error
  learningRate: number; // η
  iteration: number;
}

export interface BackpropGradients {
  dL_dpred: number;
  dpred_dz: number;
  dL_dz: number;
  dL_dw: number[];
  dL_db: number;
}

export interface ForwardPassStepInfo {
  step: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  formula: string;
  detail: string;
}

export interface TrainingIterationRecord {
  iteration: number;
  loss: number;
  prediction: number;
  target: number;
  weights: number[];
  bias: number;
  gradients: number[];
}
