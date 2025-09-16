import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { ChartComponentProps } from "./types";

export default function PieChart({
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
  className,
  children,
}: ChartComponentProps) {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#d0ed57",
    "#a28fd0",
    "#ffbb28",
  ];

  return (
    <div
      className={className}
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
            outerRadius={100}
            fill={fillColor}
            stroke={strokeColor}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          {children}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
