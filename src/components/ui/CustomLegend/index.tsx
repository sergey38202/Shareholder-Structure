import React from 'react';

import type { CustomLegendProps, LegendPayload } from './types';
import './styles.css';

export const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <div className="chart-legend">
      {payload?.map((entry: LegendPayload, index: number) => (
        <div key={index} className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: entry.color }}
          />
          <span className="p2-secondary legend-text">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
