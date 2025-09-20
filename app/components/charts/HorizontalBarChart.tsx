import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartComponentProps } from "./types";

export type HorizontalBarChartProps = ChartComponentProps & {
  xLabel?: string;
  yLabel?: string;
};

export default function HorizontalBarChart({
  data,
  dataKey,
  xAxisKey = "value",
  yAxisKey = "name",
  width = "100%",
  height = 300,
  title,
  description,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  gridStrokeDasharray = "3 3",
  strokeColor = "#6366F1",
  fillColor = "#6366F1",
  className,
  children,
  xLabel,
  yLabel,
}: HorizontalBarChartProps) {
  return (
    <div className={className} aria-label={title} aria-description={description}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart data={data} layout="vertical">
          {showGrid && <CartesianGrid strokeDasharray={gridStrokeDasharray} />}
          {/* X axis is numeric for horizontal bars */}
          <XAxis
            type="number"
            dataKey={xAxisKey}
            label={
              xLabel
                ? { value: xLabel, position: "insideBottomRight", offset: -5 }
                : undefined
            }
            tick={{ fontSize: "0.75rem", className: "text-[10px] sm:text-xs" }}
          />
          {/* Y axis is categorical (categories on Y axis) */}
          <YAxis
            type="category"
            dataKey={yAxisKey}
            label={
              yLabel
                ? { value: yLabel, angle: -90, position: "insideLeft" }
                : undefined
            }
            tick={{ fontSize: "0.75rem", className: "text-[10px] sm:text-xs" }}
            width={100}
          />
          {showTooltip && <Tooltip cursor={{ fill: "transparent" }} />}
          {showLegend && <Legend />}
          <Bar dataKey={dataKey} stroke={strokeColor} fill={fillColor} />
          {children}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
