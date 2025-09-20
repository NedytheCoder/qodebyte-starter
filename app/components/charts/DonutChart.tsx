import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { ChartComponentProps } from "./types";

type DonutChartProps = ChartComponentProps & {
  colors?: string[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  centerLabel?: string;
  centerSubLabel?: string;
  centerLabelColor?: string;
};

export default function DonutChart({
  data,
  dataKey,
  xAxisKey = "name",
  width = "100%",
  height = 300,
  title,
  description,
  showLegend = true,
  showTooltip = true,
  strokeColor = "#ffffff",
  fillColor = "#8884d8",
  colors = ["#10B981", "#EF4444"],
  className,
  children,
  innerRadius = 60,
  outerRadius = 100,
  centerLabel,
  centerSubLabel,
  centerLabelColor = "#111827",
}: DonutChartProps) {
  return (
    <div
      className={`${className ? className + " " : ""}relative`}
      aria-label={title}
      aria-description={description}
    >
      <ResponsiveContainer width={width} height={height}>
        <RechartsPieChart>
          {showLegend && <Legend />}
          {showTooltip && <Tooltip />}
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={xAxisKey}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill={fillColor}
            stroke={strokeColor}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {children}
        </RechartsPieChart>
      </ResponsiveContainer>
      {(centerLabel || centerSubLabel) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && (
            <span
              className="font-semibold text-gray-700"
              style={{ color: centerLabelColor as string, fontSize: 16 }}
            >
              {centerLabel}
            </span>
          )}
          {centerSubLabel && (
            <span className="text-xs text-gray-500">{centerSubLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
