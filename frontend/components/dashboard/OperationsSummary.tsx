import {
  IconBuildingFactory2,
  IconActivityHeartbeat,
  IconTargetArrow,
  IconClock,
} from "@tabler/icons-react";

export default function OperationsSummary() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#121822]/90 backdrop-blur-xl">

      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative p-8">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Manufacturing Command Center
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              FactoryOS
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400 leading-7">
              Monitor production, machine health, operational efficiency,
              maintenance events and factory intelligence from a single
              enterprise platform.
            </p>

          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">

            <div className="flex items-center gap-2">

              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

              <span className="text-green-400 font-medium">
                Plant Operational
              </span>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-10 grid grid-cols-4 gap-5">

          <div className="rounded-xl border border-white/5 bg-[#171F2A] p-5">

            <div className="flex items-center gap-3">

              <IconBuildingFactory2
                size={22}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Active Plant
              </span>

            </div>

            <h3 className="mt-4 text-2xl font-semibold">
              Delhi Unit
            </h3>

          </div>

          <div className="rounded-xl border border-white/5 bg-[#171F2A] p-5">

            <div className="flex items-center gap-3">

              <IconActivityHeartbeat
                size={22}
                className="text-green-400"
              />

              <span className="text-sm text-slate-400">
                OEE
              </span>

            </div>

            <h3 className="mt-4 text-2xl font-semibold">
              86.2%
            </h3>

          </div>

          <div className="rounded-xl border border-white/5 bg-[#171F2A] p-5">

            <div className="flex items-center gap-3">

              <IconTargetArrow
                size={22}
                className="text-amber-400"
              />

              <span className="text-sm text-slate-400">
                Target
              </span>

            </div>

            <h3 className="mt-4 text-2xl font-semibold">
              800 Units
            </h3>

          </div>

          <div className="rounded-xl border border-white/5 bg-[#171F2A] p-5">

            <div className="flex items-center gap-3">

              <IconClock
                size={22}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Shift
              </span>

            </div>

            <h3 className="mt-4 text-2xl font-semibold">
              A (08–16)
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}