"use client";

import {
  IconTemperature,
  IconActivity,
  IconBolt,
  IconCpu,
  IconTool,
} from "@tabler/icons-react";

interface Props {
  telemetry: any;
}

export default function MachineDetails({
  telemetry,
}: Props) {

  if (!telemetry) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#121923] p-6">
        Loading Machine...
      </div>
    );
  }

  const stats = [
    {
      icon: IconTemperature,
      label: "Temperature",
      value: `${telemetry.temperature.toFixed(2)} °C`,
      color: "text-red-400",
    },
    {
      icon: IconActivity,
      label: "Vibration",
      value: `${telemetry.vibration.toFixed(3)} g`,
      color: "text-green-400",
    },
    {
      icon: IconBolt,
      label: "Power",
      value: `${telemetry.power_consumption.toFixed(2)} kW`,
      color: "text-yellow-400",
    },
    {
      icon: IconCpu,
      label: "RPM",
      value: Math.round(
        telemetry.spindle_speed
      ),
      color: "text-cyan-400",
    },
    {
      icon: IconTool,
      label: "Tool Wear",
      value: `${telemetry.tool_wear.toFixed(
        2
      )}%`,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121923] p-7">

      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
        Live Telemetry
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {telemetry.machine_id}
      </h2>

      <div className="mt-8 space-y-6">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.label}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <Icon
                  size={22}
                  className={item.color}
                />

                <span className="text-slate-300">
                  {item.label}
                </span>

              </div>

              <span className="font-semibold text-lg">
                {item.value}
              </span>

            </div>

          );

        })}

      </div>

    </div>
  );
}