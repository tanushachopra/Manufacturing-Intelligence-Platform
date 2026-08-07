import {
  IconAlertTriangle,
  IconCircleCheck,
  IconClockHour4,
} from "@tabler/icons-react";

const alerts = [
  {
    machine: "MC-104",
    title: "Spindle temperature exceeded threshold",
    severity: "Critical",
    engineer: "Rahul Sharma",
    time: "2 min ago",
    color: "border-l-red-500",
    icon: <IconAlertTriangle size={18} className="text-red-400" />,
  },
  {
    machine: "CNC-03",
    title: "Scheduled maintenance due",
    severity: "Warning",
    engineer: "Ananya Patel",
    time: "18 min ago",
    color: "border-l-amber-400",
    icon: <IconClockHour4 size={18} className="text-amber-400" />,
  },
  {
    machine: "Conveyor-02",
    title: "Recovered after inspection",
    severity: "Resolved",
    engineer: "System",
    time: "42 min ago",
    color: "border-l-green-500",
    icon: <IconCircleCheck size={18} className="text-green-400" />,
  },
];

export default function AndonBoard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 backdrop-blur-xl p-6 h-full">

      <div className="mb-6">

        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Operations
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Live Factory Events
        </h2>

      </div>

      <div className="space-y-4">

        {alerts.map((alert) => (

          <div
            key={alert.machine}
            className={`rounded-xl border border-white/5 ${alert.color} border-l-4 bg-[#181F2A] p-4 transition hover:bg-[#1D2532]`}
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div className="mt-1">
                  {alert.icon}
                </div>

                <div>

                  <p className="font-medium">
                    {alert.machine}
                  </p>

                  <p className="mt-1 text-sm text-slate-400 leading-6">
                    {alert.title}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">

                    <span>
                      {alert.engineer}
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      {alert.time}
                    </span>

                  </div>

                </div>

              </div>

              <span className="rounded-full border border-white/5 bg-[#202938] px-3 py-1 text-xs font-medium text-slate-300">
                {alert.severity}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}