"use client";

import {
  IconTemperature,
  IconActivity,
  IconGauge,
  IconBolt,
  IconTool,
  IconWind,
  IconClock,
  IconDroplet,
} from "@tabler/icons-react";

interface Props {
  telemetry: any;
}

export default function MachineDetails({ telemetry }: Props) {
  if (!telemetry) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#121923] p-6">
        Loading machine telemetry...
      </div>
    );
  }

  const metrics = [
    {
      label: "Temperature",
      value: `${Number(telemetry.temperature).toFixed(1)} °C`,
      icon: IconTemperature,
    },
    {
      label: "Vibration",
      value: `${Number(telemetry.vibration).toFixed(3)} mm/s`,
      icon: IconActivity,
    },
    {
      label: "Spindle Speed",
      value: `${Math.round(Number(telemetry.spindle_speed))} RPM`,
      icon: IconGauge,
    },
    {
      label: "Power",
      value: `${Number(telemetry.power_consumption).toFixed(2)} kW`,
      icon: IconBolt,
    },
    {
      label: "Tool Wear",
      value: `${Number(telemetry.tool_wear).toFixed(1)} %`,
      icon: IconTool,
    },
    {
      label: "Coolant Flow",
      value: `${Number(telemetry.coolant_flow).toFixed(2)}`,
      icon: IconDroplet,
    },
    {
      label: "Cycle Time",
      value: `${Number(telemetry.cycle_time).toFixed(1)} s`,
      icon: IconClock,
    },
    {
      label: "Air Pressure",
      value: `${Number(telemetry.air_pressure).toFixed(2)} bar`,
      icon: IconWind,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121923] p-7">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Live Telemetry
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {telemetry.machine_id}
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">
            LIVE
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">

        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-2xl bg-[#1A2330] p-4"
            >
              <div className="flex items-center gap-2">
                <Icon
                  size={18}
                  className="text-cyan-400"
                />

                <span className="text-xs text-slate-400">
                  {metric.label}
                </span>
              </div>

              <p className="mt-3 text-lg font-bold">
                {metric.value}
              </p>
            </div>
          );
        })}

      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-2xl bg-[#1A2330] p-4">
          <p className="text-xs text-slate-500">
            Material
          </p>

          <p className="mt-2 font-semibold text-slate-200">
            {telemetry.material_type}
          </p>
        </div>

        <div className="rounded-2xl bg-[#1A2330] p-4">
          <p className="text-xs text-slate-500">
            Operator Shift
          </p>

          <p className="mt-2 font-semibold text-slate-200">
            Shift {telemetry.operator_shift}
          </p>
        </div>

      </div>

    </div>
  );
}