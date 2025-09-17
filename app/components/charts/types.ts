import { ReactNode } from 'react';

export type ChartType = 'line' | 'bar' | 'pie';

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export interface ChartProps {
  type: ChartType;
  data: ChartData[];
  dataKey: string;
  xAxisKey?: string;
  yAxisKey?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
  description?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  gridStrokeDasharray?: string;
  strokeColor?: string;
  fillColor?: string;
  children?: ReactNode;
  className?: string;
}

export interface ChartComponentProps extends Omit<ChartProps, 'type'> {
  className?: string;
  colors?: string[];
}
