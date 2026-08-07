import {
  IconBuildingFactory2,
  IconActivityHeartbeat,
  IconCpu,
  IconAlertTriangle,
  IconBolt,
  IconClock,
} from "@tabler/icons-react";

const stats = [
  {
    title: "Machine Availability",
    value: "92%",
    icon: <IconCpu size={18} />,
    color: "text-cyan-400",
  },
  {
    title: "Overall Health",
    value: "Excellent",
    icon: <IconActivityHeartbeat size={18} />,
    color: "text-green-400",
  },
  {
    title: "Critical Alerts",
    value: "01",
    icon: <IconAlertTriangle size={18} />,
    color: "text-amber-400",
  },
];

export default function FactoryStatus() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#131922]/80 backdrop-blur-xl p-6 h-full">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
          <IconBuildingFactory2 size={24} />
        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Factory
          </p>

          <h2 className="text-xl font-semibold">
            Operational Health
          </h2>

        </div>

      </div>

      {/* Plant Status */}

      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 mb-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Current Status
            </p>

            <h3 className="mt-2 text-xl font-semibold text-green-400">
              Operational
            </h3>

          </div>

          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

        </div>

      </div>

      {/* Stats */}

      <div className="space-y-5">

        {stats.map((item) => (

          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-[#171F2A] px-4 py-4"
          >

            <div className="flex items-center gap-3">

              <div className={item.color}>
                {item.icon}
              </div>

              <span className="text-sm text-slate-400">
                {item.title}
              </span>

            </div>

            <span className={`font-semibold ${item.color}`}>
              {item.value}
            </span>

          </div>

        ))}

      </div>

      {/* Bottom */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-xl border border-white/5 bg-[#171F2A] p-4">

          <div className="flex items-center gap-2 text-cyan-400">

            <IconBolt size={18} />

            <span className="text-sm">
              Power
            </span>

          </div>

          <h3 className="mt-3 text-2xl font-semibold">
            Stable
          </h3>

        </div>

        <div className="rounded-xl border border-white/5 bg-[#171F2A] p-4">

          <div className="flex items-center gap-2 text-amber-400">

            <IconClock size={18} />

            <span className="text-sm">
              Uptime
            </span>

          </div>

          <h3 className="mt-3 text-2xl font-semibold">
            99.3%
          </h3>

        </div>

      </div>

    </div>
  );
}