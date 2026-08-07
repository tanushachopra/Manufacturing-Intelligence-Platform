const machines = Array.from({ length: 50 }, (_, i) => {
  const random = Math.random();

  return {
    id: `MC-${String(i + 1).padStart(3, "0")}`,
    status:
      random > 0.85
        ? "critical"
        : random > 0.65
        ? "warning"
        : "healthy",
  };
});

export default function FailureHeatmap() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6">

      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        XGBoost Prediction
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        Failure Probability Heatmap
      </h2>

      <p className="mt-3 text-sm text-slate-500">
        Fleet-wide machine health predicted by the classification model.
      </p>

      <div className="mt-8 grid grid-cols-10 gap-3">

        {machines.map((machine) => (

          <div
            key={machine.id}
            title={machine.id}
            className={`aspect-square rounded-lg border transition hover:scale-105 ${
              machine.status === "healthy"
                ? "border-green-500/20 bg-green-500/20"
                : machine.status === "warning"
                ? "border-yellow-500/20 bg-yellow-500/20"
                : "border-red-500/20 bg-red-500/20"
            }`}
          />

        ))}

      </div>

      <div className="mt-8 flex gap-6 text-sm">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-green-500" />

          Healthy

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-yellow-500" />

          Warning

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-red-500" />

          Critical

        </div>

      </div>

    </div>
  );
}