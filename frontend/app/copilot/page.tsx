"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Copilot from "@/components/Copilot";

export default function CopilotPage() {
  return (
    <main className="flex h-screen overflow-hidden bg-[#090B0F] text-white">

      <Sidebar />

      <section className="flex flex-1 flex-col overflow-hidden">

        <Topbar />

        <div className="flex-1 overflow-y-auto">

          <div className="mx-auto max-w-[1400px] px-10 py-8">

            <div className="mb-8">

              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                AI COMMAND CENTER
              </p>

              <h1 className="mt-2 text-4xl font-semibold">
                Manufacturing Copilot
              </h1>

              <p className="mt-3 max-w-3xl text-slate-400">
                Ask questions about machines, production, maintenance,
                anomalies and factory operations using AI.
              </p>

            </div>

            <Copilot />

          </div>

        </div>

      </section>

    </main>
  );
}