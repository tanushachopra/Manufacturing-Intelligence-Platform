import {
  IconChartHistogram,
  IconTargetArrow,
} from "@tabler/icons-react";

const metrics = [
  {
    title: "Accuracy",
    value: "96.8%",
    color: "text-cyan-400",
  },
  {
    title: "Precision",
    value: "95.4%",
    color: "text-green-400",
  },
  {
    title: "Recall",
    value: "94.1%",
    color: "text-yellow-400",
  },
  {
    title: "F1 Score",
    value: "94.7%",
    color: "text-purple-400",
  },
];

export default function ModelPerformance() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/10 p-3">

          <IconChartHistogram
            size={24}
            className="text-cyan-400"
          />

        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            XGBoost Classifier
          </p>

          <h2 className="text-xl font-semibold">
            Model Performance
          </h2>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-5">

        {metrics.map((metric) => (

          <div
            key={metric.title}
            className="rounded-xl border border-white/5 bg-[#1A2230] p-5"
          >

            <p className="text-sm text-slate-500">
              {metric.title}
            </p>

            <h3
              className={`mt-2 text-3xl font-bold ${metric.color}`}
            >
              {metric.value}
            </h3>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-5">

        <div className="flex items-start gap-3">

          <IconTargetArrow
            className="mt-1 text-cyan-400"
            size={20}
          />

          <p className="text-sm leading-6 text-slate-300">
            The XGBoost classifier predicts machine failures using synthetic
            industrial telemetry including temperature, vibration, spindle
            speed, tool wear, power consumption, and motor current.
          </p>

        </div>

      </div>

    </div>
  );
}