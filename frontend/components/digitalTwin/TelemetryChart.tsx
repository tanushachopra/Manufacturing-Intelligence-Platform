"use client";

import { useEffect, useState } from "react";

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

interface TemperaturePoint {
  time: string;
  value: number;
}

export default function TelemetryChart({ telemetry }: Props) {
  const [history, setHistory] = useState<TemperaturePoint[]>([]);

  useEffect(() => {
    if (!telemetry) return;

    const temperature = Number(telemetry.temperature);

    if (Number.isNaN(temperature)) return;

    const time = new Date().toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });

    setHistory((previous) => {
      const updated = [
        ...previous,
        {
          time,
          value: Number(temperature.toFixed(2)),
        },
      ];

      // Keep only the latest 10 readings
      return updated.slice(-10);
    });
  }, [telemetry]);

  if (!telemetry) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#121923] p-6">
        Loading Chart...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121923] p-7">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
        Temperature History
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        Live Sensor Trend
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Updating every 3 seconds from simulated telemetry
      </p>

      <div className="mt-6 h-[260px]">
        {history.length < 2 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Collecting sensor readings...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#1E293B"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="time"
                stroke="#64748B"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                stroke="#64748B"
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                formatter={(value) => [
                  `${value} °C`,
                  "Temperature",
                ]}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#22D3EE"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Current:{" "}
          <span className="font-semibold text-cyan-400">
            {Number(telemetry.temperature).toFixed(2)} °C
          </span>
        </span>

        <span>
          {history.length} readings
        </span>
      </div>
    </div>
  );
}