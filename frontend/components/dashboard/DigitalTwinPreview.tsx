import {
  IconCpu,
  IconRobot,
  IconBuildingFactory2,
} from "@tabler/icons-react";

const machines = [
  {
    name: "CNC-01",
    status: "online",
    x: "left-10 top-12",
    icon: <IconCpu size={20} />,
  },
  {
    name: "CNC-02",
    status: "online",
    x: "left-48 top-12",
    icon: <IconCpu size={20} />,
  },
  {
    name: "Robot Arm",
    status: "warning",
    x: "left-28 top-40",
    icon: <IconRobot size={20} />,
  },
  {
    name: "Inspection",
    status: "offline",
    x: "right-12 top-28",
    icon: <IconBuildingFactory2 size={20} />,
  },
];

function statusColor(status: string) {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "warning":
      return "bg-amber-400";
    default:
      return "bg-red-500";
  }
}

export default function DigitalTwinPreview() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 backdrop-blur-xl p-6">

      <div className="mb-6">

        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Digital Twin
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Factory Floor Preview
        </h2>

      </div>

      <div className="relative h-[380px] overflow-hidden rounded-xl border border-white/5 bg-[#0F141C]">

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Machines */}

        {machines.map((m) => (

          <div
            key={m.name}
            className={`absolute ${m.x}`}
          >

            <div className="rounded-xl border border-white/10 bg-[#19212D] px-5 py-4 shadow-xl">

              <div className="flex items-center gap-3">

                <div className="text-cyan-400">
                  {m.icon}
                </div>

                <div>

                  <p className="text-sm font-medium">
                    {m.name}
                  </p>

                  <div className="mt-2 flex items-center gap-2">

                    <div
                      className={`h-2.5 w-2.5 rounded-full ${statusColor(
                        m.status
                      )}`}
                    />

                    <span className="text-xs text-slate-500">
                      {m.status}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}