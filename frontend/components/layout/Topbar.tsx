"use client";

import {
  IconBell,
  IconSearch,
  IconUserCircle,
  IconMapPin,
  IconClock,
  IconActivityHeartbeat,
} from "@tabler/icons-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#090B0F]/80 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            FactoryOS
          </p>

          <h1 className="mt-1 text-[28px] font-semibold tracking-tight">
            Operations Center
          </h1>

        </div>

        {/* Center */}

        <div className="hidden xl:flex items-center gap-5 rounded-2xl border border-white/5 bg-[#12171F] px-6 py-3">

          <div className="flex items-center gap-2 text-slate-400">

            <IconMapPin size={18} />

            <span className="text-sm">
              Delhi Manufacturing Plant
            </span>

          </div>

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-2 text-slate-400">

            <IconClock size={18} />

            <span className="text-sm">
              Shift A • 08:00–16:00
            </span>

          </div>

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-2">

            <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />

            <span className="text-sm font-medium text-green-400">
              Plant Operational
            </span>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-[#141A22] text-slate-400 transition hover:border-cyan-500/30 hover:text-white">

            <IconSearch size={20} />

          </button>

          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-[#141A22] text-slate-400 transition hover:border-cyan-500/30 hover:text-white">

            <IconBell size={20} />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />

          </button>

          <button className="flex h-11 items-center gap-3 rounded-xl border border-white/5 bg-[#141A22] px-4 transition hover:border-cyan-500/30">

            <IconUserCircle
              size={30}
              className="text-cyan-400"
            />

            <div className="text-left">

              <p className="text-sm font-medium">
                Plant Manager
              </p>

              <p className="text-xs text-slate-500">
                Admin Access
              </p>

            </div>

          </button>

        </div>

      </div>

      {/* Live Status Strip */}

      <div className="flex items-center gap-8 border-t border-white/5 bg-[#0D1218] px-8 py-3 text-sm">

        <div className="flex items-center gap-2">

          <IconActivityHeartbeat
            size={18}
            className="text-cyan-400"
          />

          <span className="text-slate-400">
            System Health
          </span>

          <span className="font-semibold text-white">
            Excellent
          </span>

        </div>

        <div className="text-slate-600">
          |
        </div>

        <div>

          <span className="text-slate-400">
            Active Machines:
          </span>

          <span className="ml-2 font-semibold">
            12 / 13
          </span>

        </div>

        <div className="text-slate-600">
          |
        </div>

        <div>

          <span className="text-slate-400">
            Today's Production:
          </span>

          <span className="ml-2 font-semibold">
            785 Units
          </span>

        </div>

        <div className="text-slate-600">
          |
        </div>

        <div>

          <span className="text-slate-400">
            OEE:
          </span>

          <span className="ml-2 font-semibold text-green-400">
            86.2%
          </span>

        </div>

      </div>

    </header>
  );
}