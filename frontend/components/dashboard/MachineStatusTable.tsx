import {
  IconCircleCheck,
  IconAlertTriangle,
  IconTool,
} from "@tabler/icons-react";

const machines = [
  {
    id: "MC-101",
    status: "Running",
    oee: 92,
    temp: 48,
    vibration: "Normal",
  },
  {
    id: "MC-102",
    status: "Running",
    oee: 88,
    temp: 46,
    vibration: "Normal",
  },
  {
    id: "MC-103",
    status: "Idle",
    oee: 73,
    temp: 34,
    vibration: "Low",
  },
  {
    id: "MC-104",
    status: "Maintenance",
    oee: 0,
    temp: 0,
    vibration: "--",
  },
];

function StatusBadge(status: string) {
  switch (status) {
    case "Running":
      return (
        <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-green-400 text-xs font-medium">
          <IconCircleCheck size={14} />
          Running
        </span>
      );

    case "Idle":
      return (
        <span className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-yellow-400 text-xs font-medium">
          <IconAlertTriangle size={14} />
          Idle
        </span>
      );

    default:
      return (
        <span className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-red-400 text-xs font-medium">
          <IconTool size={14} />
          Maintenance
        </span>
      );
  }
}

export default function MachineStatusTable() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 backdrop-blur-xl p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Live Operations
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Machine Fleet
          </h2>

        </div>

        <input
          placeholder="Search machine..."
          className="rounded-xl border border-white/5 bg-[#1A2230] px-4 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
        />

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b border-white/5 text-left text-xs uppercase tracking-[0.18em] text-slate-500">

            <th className="pb-4">Machine</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">OEE</th>
            <th className="pb-4">Temperature</th>
            <th className="pb-4">Vibration</th>

          </tr>

        </thead>

        <tbody>

          {machines.map((m) => (

            <tr
              key={m.id}
              className="border-b border-white/5 hover:bg-white/[0.02] transition"
            >

              <td className="py-5 font-medium">
                {m.id}
              </td>

              <td>
                {StatusBadge(m.status)}
              </td>

              <td className="w-56">

                <div className="flex items-center gap-4">

                  <div className="h-2 w-32 rounded-full bg-[#232C39]">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"
                      style={{
                        width: `${m.oee}%`,
                      }}
                    />

                  </div>

                  <span className="text-sm text-slate-300">
                    {m.oee}%
                  </span>

                </div>

              </td>

              <td
                className={
                  m.temp >= 48
                    ? "text-red-400"
                    : "text-slate-300"
                }
              >
                {m.temp === 0 ? "--" : `${m.temp}°C`}
              </td>

              <td className="text-slate-300">
                {m.vibration}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}