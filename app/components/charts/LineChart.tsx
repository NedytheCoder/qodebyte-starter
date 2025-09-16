import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartComponentProps } from "./types";

export default function LineChart({
  data,
  dataKey,
  xAxisKey = "name",
  width = "100%",
  height = 300,
  title,
  description,
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  gridStrokeDasharray = "3 3",
  strokeColor = "#8884d8",
  fillColor = "#8884d8",
  className,
  children,
}: ChartComponentProps) {
  return (
    <div
      className={className}
      aria-label={title}
      aria-description={description}
    >
      <ResponsiveContainer width={width} height={height}>
        <RechartsLineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray={gridStrokeDasharray} />}
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            fill={fillColor}
          />
          {children}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
