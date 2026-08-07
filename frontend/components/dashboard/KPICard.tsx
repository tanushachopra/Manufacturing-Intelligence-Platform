import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { IconTrendingUp } from "@tabler/icons-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
}

export default function KPICard({
  title,
  value,
  change,
  icon,
}: KPICardProps) {
  return (
    <Card className="group overflow-hidden rounded-xl border border-white/5 bg-[#131922]/80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(0,184,217,0.08)]">

      <div className="relative p-6">

        {/* Accent */}

        <div className="absolute left-0 top-0 h-full w-[3px] bg-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {title}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              {value}
            </h2>

          </div>

          <div className="rounded-xl border border-white/5 bg-[#1B2330] p-3 text-cyan-400">

            {icon}

          </div>

        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-white/5" />

        {/* Footer */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-green-400">

            <IconTrendingUp size={16} />

            <span className="text-sm font-medium">
              {change}
            </span>

          </div>

          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
            LIVE
          </div>

        </div>

        {/* Progress */}

        <div className="mt-5">

          <div className="h-1.5 overflow-hidden rounded-full bg-[#242D3A]">

            <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300" />

          </div>

        </div>

      </div>

    </Card>
  );
}