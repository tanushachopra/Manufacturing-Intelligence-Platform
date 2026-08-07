"use client";

import {
  IconBrain,
  IconShieldCheck,
  IconAlertTriangle,
  IconClockHour4,
  IconActivity,
  IconSparkles,
} from "@tabler/icons-react";

interface Props {
  aiData: any;
}

export default function AIPrediction({ aiData }: Props) {
  if (!aiData) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#121923] p-6">
        Loading AI Engine...
      </div>
    );
  }

  const prediction = aiData?.predictive_maintenance ?? {
    failure_prediction: 0,
    failure_probability: 0,
  };

  const rul = aiData?.remaining_useful_life ?? {
    remaining_useful_life: 0,
  };

  const anomaly = aiData?.anomaly_detection ?? {
    anomaly: false,
  };

  const telemetry = aiData?.telemetry ?? {
    tool_wear: 0,
  };

  const health = Math.max(
    0,
    Math.round(
      100 -
        Number(prediction.failure_probability || 0) -
        (anomaly.anomaly ? 20 : 0)
    )
  );

  const status =
    health >= 90
      ? "Healthy"
      : health >= 75
      ? "Warning"
      : "Critical";

  const statusColor =
    health >= 90
      ? "text-green-400"
      : health >= 75
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-[#121923] p-7">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-cyan-500/10 p-4">
          <IconBrain size={28} className="text-cyan-400" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            AI COMMAND CENTER
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Machine Intelligence
          </h2>
        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-[#1A2330] p-4">
          <div className="flex items-center gap-2">
            <IconShieldCheck className="text-green-400" />
            <span className="text-sm text-slate-400">
              Health
            </span>
          </div>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            {health}%
          </h3>
        </div>

        <div className="rounded-2xl bg-[#1A2330] p-4">
          <div className="flex items-center gap-2">
            <IconAlertTriangle className="text-red-400" />
            <span className="text-sm text-slate-400">
              Failure Risk
            </span>
          </div>

          <h3 className="mt-3 text-3xl font-bold">
            {Number(prediction.failure_probability).toFixed(2)}%
          </h3>
        </div>

        <div className="rounded-2xl bg-[#1A2330] p-4">
          <div className="flex items-center gap-2">
            <IconClockHour4 className="text-yellow-400" />
            <span className="text-sm text-slate-400">
              Remaining Life
            </span>
          </div>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            {Math.round(
              Number(rul.remaining_useful_life)
            )} hrs
          </h3>
        </div>

        <div className="rounded-2xl bg-[#1A2330] p-4">
          <div className="flex items-center gap-2">
            <IconActivity className="text-cyan-400" />
            <span className="text-sm text-slate-400">
              Status
            </span>
          </div>

          <h3 className={`mt-3 text-2xl font-bold ${statusColor}`}>
            {status}
          </h3>
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

        <div className="flex items-center gap-2">
          <IconSparkles className="text-cyan-400" />
          <h3 className="font-semibold">
            AI Recommendations
          </h3>
        </div>

        <ul className="mt-4 space-y-3 text-sm text-slate-300">

          <li>
            • Current machine health:
            <span className={`ml-2 ${statusColor}`}>
              {status}
            </span>
          </li>

          <li>
            • Failure probability:
            <span className="ml-2 text-red-400">
              {Number(
                prediction.failure_probability
              ).toFixed(2)}
              %
            </span>
          </li>

          <li>
            • Remaining Useful Life:
            <span className="ml-2 text-yellow-400">
              {Math.round(
                Number(rul.remaining_useful_life)
              )} hrs
            </span>
          </li>

          <li>
            • Tool Wear:
            <span className="ml-2 text-cyan-400">
              {Number(
                telemetry.tool_wear
              ).toFixed(2)}
              %
            </span>
          </li>

          <li>
            •{" "}
            {anomaly.anomaly
              ? "Anomaly detected. Schedule maintenance immediately."
              : "No anomaly detected. Machine operating normally."}
          </li>

        </ul>

      </div>

    </div>
  );
}