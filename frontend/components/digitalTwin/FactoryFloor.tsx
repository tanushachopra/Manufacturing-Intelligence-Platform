"use client";

import {
  IconCpu,
  IconRobot,
  IconBuildingFactory2,
  IconTemperature,
} from "@tabler/icons-react";

interface Props {
  selectedMachine: string;
  onSelectMachine: (machine: string) => void;
}

const machines = [
  {
    id: "CNC-001",
    name: "CNC-001",
    type: "CNC",
    icon: IconCpu,
    top: "12%",
    left: "8%",
    temp: 46,
    health: 96,
  },
  {
    id: "CNC-002",
    name: "CNC-002",
    type: "CNC",
    icon: IconCpu,
    top: "12%",
    left: "48%",
    temp: 49,
    health: 88,
  },
  {
    id: "CNC-003",
    name: "CNC-003",
    type: "CNC",
    icon: IconCpu,
    top: "48%",
    left: "20%",
    temp: 45,
    health: 91,
  },
  {
    id: "CNC-004",
    name: "CNC-004",
    type: "CNC",
    icon: IconCpu,
    top: "48%",
    left: "62%",
    temp: 43,
    health: 94,
  },
];

export default function FactoryFloor({
  selectedMachine,
  onSelectMachine,
}: Props) {
  return (
    <div className="relative h-[700px] rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0E141B] to-[#101827] overflow-hidden">

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Glow */}

      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Pipes */}

      <div className="absolute left-[27%] top-[20%] h-1 w-[25%] rounded-full bg-cyan-500/40" />

      <div className="absolute left-[52%] top-[20%] h-[28%] w-1 rounded-full bg-cyan-500/40" />

      <div className="absolute left-[32%] top-[48%] h-1 w-[32%] rounded-full bg-cyan-500/40" />

      {/* Title */}

      <div className="absolute left-8 top-8">

        <p className="text-xs tracking-[0.3em] uppercase text-cyan-400">

          DIGITAL TWIN

        </p>

        <h2 className="mt-2 text-3xl font-bold">

          Factory Layout

        </h2>

        <p className="mt-2 text-slate-400">

          AI Powered Smart Manufacturing

        </p>

      </div>

      {machines.map((machine) => {

        const Icon = machine.icon;

        const selected =
          machine.id === selectedMachine;

        const healthy =
          machine.health >= 90;

        const warning =
          machine.health >= 75 &&
          machine.health < 90;

        return (

          <button
            key={machine.id}
            onClick={() => onSelectMachine(machine.id)}
            className="absolute transition-all duration-300 hover:scale-105"
            style={{
              top: machine.top,
              left: machine.left,
            }}
          >

            <div
              className={`w-60 rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 ${
                selected
                  ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_35px_rgba(34,211,238,.35)]"
                  : "border-white/10 bg-white/5"
              }`}
            >

              <div className="flex items-center justify-between">

                <Icon
                  className="text-cyan-400"
                  size={28}
                />

                <div
                  className={`h-3 w-3 rounded-full animate-pulse ${
                    healthy
                      ? "bg-green-400"
                      : warning
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                />

              </div>

              <h3 className="mt-6 text-2xl font-semibold">

                {machine.name}

              </h3>

              <div className="mt-5 flex justify-between">

                <div className="flex items-center gap-2 text-slate-400">

                  <IconTemperature size={16} />

                  {machine.temp}°C

                </div>

                <div className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300">

                  {machine.health}%

                </div>

              </div>

              <div className="mt-5 h-2 rounded-full bg-white/10">

                <div
                  className={`h-2 rounded-full ${
                    healthy
                      ? "bg-green-400"
                      : warning
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${machine.health}%`,
                  }}
                />

              </div>

              <p
                className={`mt-5 text-center font-semibold ${
                  healthy
                    ? "text-green-400"
                    : warning
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {healthy
                  ? "Healthy"
                  : warning
                  ? "Maintenance Soon"
                  : "Critical"}
              </p>

            </div>

          </button>

        );

      })}
    </div>
  );
}