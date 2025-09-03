export interface LegendPayload {
  value: string;
  color: string;
}

export interface CustomLegendProps {
  payload?: LegendPayload[];
}
