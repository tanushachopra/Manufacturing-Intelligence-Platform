"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  telemetry: any;
}

export default function TelemetryChart({
  telemetry,
}: Props) {

  if (!telemetry) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#121923] p-6">
        Loading Chart...
      </div>
    );
  }

  const temp = telemetry.temperature;

  const data = [
    { time: "-25", value: temp - 4 },
    { time: "-20", value: temp - 3 },
    { time: "-15", value: temp - 2 },
    { time: "-10", value: temp - 1 },
    { time: "-5", value: temp },
    { time: "Now", value: temp + 0.5 },
  ];

  return (

    <div className="rounded-3xl border border-white/10 bg-[#121923] p-7">

      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">

        Temperature History

      </p>

      <h2 className="mt-3 text-2xl font-bold">

        Live Sensor Trend

      </h2>

      <div className="mt-6 h-[260px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              stroke="#1E293B"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              stroke="#64748B"
            />

            <YAxis
              stroke="#64748B"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#22D3EE"
              strokeWidth={3}
              dot={{
                r:4,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}