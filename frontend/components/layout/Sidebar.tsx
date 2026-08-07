"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IconLayoutDashboard,
  IconCpu,
  IconBrain,
  IconShieldCheck,
  IconAlertTriangle,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react";

const menu = [
  {
    title: "Dashboard",
    href: "/",
    icon: IconLayoutDashboard,
  },
  {
    title: "Digital Twin",
    href: "/digital-twin",
    icon: IconCpu,
  },
  {
    title: "Predictive Maintenance",
    href: "/predictive-maintenance",
    icon: IconBrain,
  },
  {
    title: "Quality Prediction",
    href: "/quality-prediction",
    icon: IconShieldCheck,
  },
  {
    title: "Anomaly Detection",
    href: "/anomaly-detection",
    icon: IconAlertTriangle,
  },
  {
  title: "AI Copilot",
  href: "/copilot",
  icon: IconSparkles,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="w-72 bg-[#0B1016] border-r border-white/10 flex flex-col">

      <div className="p-8">

        <h1 className="text-3xl font-bold text-cyan-400">
          FactoryOS
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manufacturing Intelligence Platform
        </p>

      </div>

      <nav className="flex-1 px-4 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >

              <Icon size={22} />

              <span className="font-medium">

                {item.title}

              </span>

            </Link>

          );

        })}

      </nav>

      <div className="border-t border-white/10 p-6">

        <button className="flex w-full items-center gap-3 rounded-xl bg-[#151B23] px-4 py-3 text-slate-300 hover:bg-[#1B2430]">

          <IconSettings size={20} />

          Settings

        </button>

      </div>

    </aside>

  );

}