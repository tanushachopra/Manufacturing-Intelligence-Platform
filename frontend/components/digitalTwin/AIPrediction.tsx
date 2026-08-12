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

  // =========================================================
  // BACKEND AI RESULTS
  // =========================================================

  const prediction = aiData?.predictive_maintenance ?? {
    failure_prediction: 0,
    failure_probability: 0,
  };

  const rul = aiData?.remaining_useful_life ?? {
    remaining_useful_life: 0,
  };

  const anomaly = aiData?.anomaly_detection ?? {
    anomaly: false,
    anomaly_score: 0,
  };

  const telemetry = aiData?.telemetry ?? {
    tool_wear: 0,
  };

  // =========================================================
  // VALUES
  // =========================================================

  const failureProbability = Number(
    prediction.failure_probability ?? 0
  );

  const remainingLife = Number(
    rul.remaining_useful_life ?? 0
  );

  const toolWear = Number(
    telemetry.tool_wear ?? 0
  );

  const anomalyScore = Number(
    anomaly.anomaly_score ?? 0
  );

  const failurePrediction =
    Number(prediction.failure_prediction ?? 0);

  // =========================================================
  // MACHINE HEALTH
  // =========================================================

  const health = Math.max(
    0,
    Math.min(
      100,
      Math.round(100 - failureProbability)
    )
  );

  let status = "Healthy";
  let statusColor = "text-green-400";

  if (
    failureProbability >= 80 ||
    anomaly.anomaly ||
    failurePrediction === 1
  ) {
    status = "Critical";
    statusColor = "text-red-400";
  } else if (failureProbability >= 40) {
    status = "Warning";
    statusColor = "text-yellow-400";
  }

  // =========================================================
  // RECOMMENDATION
  // =========================================================

  let recommendation =
    "Machine is operating normally. Continue monitoring.";

  if (failureProbability >= 80 || anomaly.anomaly) {
    recommendation =
      "Immediate maintenance inspection recommended.";
  } else if (failureProbability >= 40) {
    recommendation =
      "Machine shows early warning signs. Schedule inspection.";
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-[#121923] p-7">

      {/* HEADER */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-cyan-500/10 p-4">
          <IconBrain
            size={28}
            className="text-cyan-400"
          />
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

      {/* AI METRICS */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        {/* HEALTH */}

        <div className="rounded-2xl bg-[#1A2330] p-4">

          <div className="flex items-center gap-2">

            <IconShieldCheck
              className={
                status === "Healthy"
                  ? "text-green-400"
                  : status === "Warning"
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            />

            <span className="text-sm text-slate-400">
              Health
            </span>

          </div>

          <h3
            className={`mt-3 text-3xl font-bold ${statusColor}`}
          >
            {health}%
          </h3>

        </div>

        {/* FAILURE RISK */}

        <div className="rounded-2xl bg-[#1A2330] p-4">

          <div className="flex items-center gap-2">

            <IconAlertTriangle className="text-red-400" />

            <span className="text-sm text-slate-400">
              Failure Risk
            </span>

          </div>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            {failureProbability.toFixed(2)}%
          </h3>

        </div>

        {/* RUL */}

        <div className="rounded-2xl bg-[#1A2330] p-4">

          <div className="flex items-center gap-2">

            <IconClockHour4 className="text-yellow-400" />

            <span className="text-sm text-slate-400">
              Remaining Life
            </span>

          </div>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            {remainingLife.toFixed(1)} hrs
          </h3>

        </div>

        {/* STATUS */}

        <div className="rounded-2xl bg-[#1A2330] p-4">

          <div className="flex items-center gap-2">

            <IconActivity className="text-cyan-400" />

            <span className="text-sm text-slate-400">
              Status
            </span>

          </div>

          <h3
            className={`mt-3 text-2xl font-bold ${statusColor}`}
          >
            {status}
          </h3>

        </div>

      </div>

      {/* AI RECOMMENDATIONS */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

        <div className="flex items-center gap-2">

          <IconSparkles className="text-cyan-400" />

          <h3 className="font-semibold">
            AI Recommendations
          </h3>

        </div>

        <ul className="mt-4 space-y-3 text-sm text-slate-300">

          <li>
            • Machine status:

            <span
              className={`ml-2 font-semibold ${statusColor}`}
            >
              {status}
            </span>
          </li>

          <li>
            • Failure probability:

            <span className="ml-2 text-red-400">
              {failureProbability.toFixed(2)}%
            </span>
          </li>

          <li>
            • Remaining Useful Life:

            <span className="ml-2 text-yellow-400">
              {remainingLife.toFixed(1)} hrs
            </span>
          </li>

          <li>
            • Tool Wear:

            <span className="ml-2 text-cyan-400">
              {toolWear.toFixed(2)}%
            </span>
          </li>

          <li>
            • Anomaly Score:

            <span
              className={`ml-2 ${
                anomaly.anomaly
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {anomalyScore.toFixed(4)}
            </span>
          </li>

          <li>
            • Anomaly Detection:

            <span
              className={`ml-2 ${
                anomaly.anomaly
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {anomaly.anomaly
                ? "Anomaly Detected"
                : "Normal"}
            </span>
          </li>

        </ul>

        {/* RECOMMENDATION */}

        <div className="mt-5 rounded-xl bg-black/20 p-4">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Recommended Action
          </p>

          <p className="mt-2 text-sm font-medium text-slate-200">
            {recommendation}
          </p>

        </div>

      </div>

    </div>
  );
}