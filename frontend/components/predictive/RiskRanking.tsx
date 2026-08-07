const machines = [
  {
    id: "CNC-02",
    probability: "91%",
    rul: "18 hrs",
    status: "Critical",
  },
  {
    id: "Robot Arm",
    probability: "72%",
    rul: "42 hrs",
    status: "Warning",
  },
  {
    id: "CNC-01",
    probability: "8%",
    rul: "142 hrs",
    status: "Healthy",
  },
];

export default function RiskRanking() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6">

      <h2 className="text-2xl font-semibold">
        Machine Risk Ranking
      </h2>

      <table className="mt-8 w-full">

        <thead>

          <tr className="border-b border-white/5 text-left text-sm text-slate-500">

            <th className="pb-4">Machine</th>

            <th className="pb-4">
              Failure Probability
            </th>

            <th className="pb-4">
              Remaining Useful Life
            </th>

            <th className="pb-4">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {machines.map((machine) => (

            <tr
              key={machine.id}
              className="border-b border-white/5"
            >

              <td className="py-5 font-medium">
                {machine.id}
              </td>

              <td>
                {machine.probability}
              </td>

              <td>
                {machine.rul}
              </td>

              <td>
                {machine.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}