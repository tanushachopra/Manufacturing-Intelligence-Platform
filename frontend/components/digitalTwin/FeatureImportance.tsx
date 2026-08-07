interface Props {
  selectedMachine: string;
}

const importance = {
  "CNC-01": [
    { feature: "Tool Wear", value: 92 },
    { feature: "Vibration", value: 81 },
    { feature: "Temperature", value: 74 },
    { feature: "Power", value: 52 },
    { feature: "RPM", value: 38 },
  ],

  "CNC-02": [
    { feature: "Temperature", value: 95 },
    { feature: "Vibration", value: 88 },
    { feature: "Tool Wear", value: 76 },
    { feature: "Power", value: 60 },
    { feature: "RPM", value: 42 },
  ],

  "Robot Arm": [
    { feature: "Motor Load", value: 97 },
    { feature: "Temperature", value: 91 },
    { feature: "Current", value: 82 },
    { feature: "Vibration", value: 65 },
    { feature: "Cycle Count", value: 51 },
  ],

  Inspection: [
    { feature: "No Active Data", value: 0 },
  ],
};

export default function FeatureImportance({
  selectedMachine,
}: Props) {

  const features =
    importance[
      selectedMachine as keyof typeof importance
    ];

  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6">

      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        Explainable AI
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        Feature Importance
      </h2>

      <div className="mt-8 space-y-5">

        {features.map((feature) => (

          <div key={feature.feature}>

            <div className="mb-2 flex justify-between">

              <span className="text-sm text-slate-400">
                {feature.feature}
              </span>

              <span className="text-sm font-medium">
                {feature.value}%
              </span>

            </div>

            <div className="h-2 rounded-full bg-[#222D3A]">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{
                  width: `${feature.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4">

        <p className="text-sm text-slate-300 leading-6">
          These values represent the relative contribution of each feature
          towards the ML model's prediction for the selected machine.
        </p>

      </div>

    </div>
  );
}