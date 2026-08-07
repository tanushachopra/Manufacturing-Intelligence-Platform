const machines = [
  {
    id: "CNC-01",
    rul: 142,
    color: "bg-green-500",
  },
  {
    id: "CNC-02",
    rul: 81,
    color: "bg-yellow-500",
  },
  {
    id: "Robot Arm",
    rul: 18,
    color: "bg-red-500",
  },
];

export default function RULDashboard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6">

      <h2 className="text-2xl font-semibold">
        Remaining Useful Life
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Predicted by the XGBoost Regression model.
      </p>

      <div className="mt-8 space-y-6">

        {machines.map((machine) => (

          <div key={machine.id}>

            <div className="mb-2 flex justify-between">

              <span>{machine.id}</span>

              <span>{machine.rul} hrs</span>

            </div>

            <div className="h-3 rounded-full bg-[#202938]">

              <div
                className={`h-full rounded-full ${machine.color}`}
                style={{
                  width: `${(machine.rul / 150) * 100}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}