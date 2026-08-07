const anomalies = [
  {
    machine: "CNC-02",
    anomaly: "High Vibration",
    score: "-0.81",
    status: "Critical",
  },
  {
    machine: "Robot Arm",
    anomaly: "Motor Temperature Spike",
    score: "-0.63",
    status: "Warning",
  },
  {
    machine: "CNC-05",
    anomaly: "Power Consumption",
    score: "-0.52",
    status: "Warning",
  },
];

export default function LiveAnomalies() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6">

      <h2 className="text-2xl font-semibold">
        Live Anomaly Feed
      </h2>

      <table className="mt-8 w-full">

        <thead>

          <tr className="border-b border-white/5 text-left text-sm text-slate-500">

            <th className="pb-4">Machine</th>
            <th className="pb-4">Detected Anomaly</th>
            <th className="pb-4">Isolation Score</th>
            <th className="pb-4">Status</th>

          </tr>

        </thead>

        <tbody>

          {anomalies.map((item) => (

            <tr
              key={item.machine}
              className="border-b border-white/5"
            >

              <td className="py-5">
                {item.machine}
              </td>

              <td>
                {item.anomaly}
              </td>

              <td>
                {item.score}
              </td>

              <td className="text-red-400">
                {item.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}