"use client";

import { useEffect, useState } from "react";

import FactoryFloor from "@/components/digitalTwin/FactoryFloor";
import MachineDetails from "@/components/digitalTwin/MachineDetails";
import TelemetryChart from "@/components/digitalTwin/TelemetryChart";
import AIPrediction from "@/components/digitalTwin/AIPrediction";

import { getAIInsights } from "@/services/api";

export default function DigitalTwinPage() {
  const [selectedMachine, setSelectedMachine] = useState("CNC-001");

  const [aiData, setAIData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMachine() {
      setLoading(true);

      try {
        console.log("Loading:", selectedMachine);

        const data = await getAIInsights(selectedMachine);

        console.log("API Response:", data);

        if (data) {
  setAIData(data);
}
      } catch (err) {
        console.error(err);

        setAIData(null);
      } finally {
        setLoading(false);
      }
    }

    loadMachine();

    const interval = setInterval(loadMachine, 3000);

    return () => clearInterval(interval);
  }, [selectedMachine]);

  return (
    <main className="min-h-screen bg-[#090B0F] text-white">
      <div className="mx-auto max-w-[1800px] px-10 py-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            FactoryOS
          </p>

          <h1 className="mt-2 text-5xl font-semibold">
            Digital Twin
          </h1>

          <p className="mt-4 max-w-3xl text-slate-400 leading-7">
            Live digital representation of your manufacturing floor powered by
            Machine Learning.
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-cyan-500/10 p-4">
          <p className="text-sm">
            Selected Machine:
            <span className="ml-2 font-bold text-cyan-400">
              {selectedMachine}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <FactoryFloor
  selectedMachine={selectedMachine}
  onSelectMachine={(machine) => {
    console.log("Clicked:", machine);
    setSelectedMachine(machine);
  }}
  aiData={aiData}
/>
          </div>

          <div className="col-span-4 space-y-6">
            {loading ? (
              <div className="rounded-3xl bg-[#131922] p-6 text-center">
                Loading AI...
              </div>
            ) : aiData ? (
              <>
                <MachineDetails telemetry={aiData?.telemetry} />

                <TelemetryChart telemetry={aiData?.telemetry} />

                <AIPrediction aiData={aiData} />
              </>
            ) : (
              <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6">
                <h2 className="text-xl font-bold text-red-400">
                  Machine Not Available
                </h2>

                <p className="mt-2 text-slate-300">
                  No AI telemetry exists for:
                </p>

                <p className="mt-3 text-2xl font-bold text-cyan-400">
                  {selectedMachine}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}