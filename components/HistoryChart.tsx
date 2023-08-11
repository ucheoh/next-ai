"use client";

import { Value } from "@prisma/client/runtime/library";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  Tooltip,
  TooltipProps,
  LineChart,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { HistoryChartProps } from "@/types/journal";

function CustomToolTip({
  payload,
  label,
  active,
}: TooltipProps<number, string>) {
  console.log("custom tooltip");
  const dateLabel = new Date(label).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  if (active) {
    if (!payload) return;
    const analysis = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    );
  }
}

export default function HistoryChart({ data }: { data: HistoryChartProps[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}
