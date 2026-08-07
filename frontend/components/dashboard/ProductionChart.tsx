"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const data = [
  { hour: "08", output: 85 },
  { hour: "09", output: 130 },
  { hour: "10", output: 185 },
  { hour: "11", output: 255 },
  { hour: "12", output: 315 },
  { hour: "13", output: 395 },
  { hour: "14", output: 470 },
  { hour: "15", output: 560 },
];

export default function ProductionChart() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#131922]/80 backdrop-blur-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Production Analytics
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Production Trend
          </h2>

        </div>

        <div className="text-right">

          <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
            Today's Output
          </p>

          <h2 className="text-3xl font-semibold">
            785
          </h2>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="production"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#36C2FF"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#36C2FF"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#242D39"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="hour"
              tick={{
                fill: "#7B8794",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#7B8794",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#131922",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 12,
                color: "white",
              }}
            />

            <ReferenceLine
              y={500}
              stroke="#F59E0B"
              strokeDasharray="6 6"
              label={{
                value: "Target",
                fill: "#F59E0B",
                fontSize: 11,
              }}
            />

            <Area
              dataKey="output"
              stroke="#36C2FF"
              strokeWidth={3}
              fill="url(#production)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* Bottom Stats */}

      <div className="mt-6 grid grid-cols-3 gap-5">

        <div>

          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Efficiency
          </p>

          <h3 className="mt-2 text-2xl font-semibold">
            98.2%
          </h3>

        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Avg / Hour
          </p>

          <h3 className="mt-2 text-2xl font-semibold">
            112
          </h3>

        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Shift Target
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-green-400">
            98%
          </h3>

        </div>

      </div>

    </div>
  );
}