import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import FleetOverview from "@/components/predictive/FleetOverview";
import RiskRanking from "@/components/predictive/RiskRanking";
import RULDashboard from "@/components/predictive/RULDashboard";
import ModelPerformance from "@/components/predictive/ModelPerformance";
import FailureHeatmap from "@/components/predictive/FailureHeatmap";

export default function PredictiveMaintenancePage() {
  return (
    <main className="flex h-screen overflow-hidden bg-[#090B0F] text-white">

      <Sidebar />

      <section className="flex flex-1 flex-col overflow-hidden">

        <Topbar />

        <div className="flex-1 overflow-y-auto">

          <div className="mx-auto max-w-[1800px] px-10 py-8">

            <div className="mb-8">

              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                FactoryOS
              </p>

              <h1 className="mt-2 text-5xl font-semibold">
                Predictive Maintenance
              </h1>

              <p className="mt-4 max-w-3xl text-slate-400 leading-7">
                AI-powered predictive maintenance using XGBoost,
                Remaining Useful Life estimation, anomaly detection,
                and synthetic industrial telemetry.
              </p>

            </div>

            <FleetOverview />

            <div className="mt-6 grid grid-cols-12 gap-6">

              <div className="col-span-7 space-y-6">

                <RiskRanking />

                <ModelPerformance />

              </div>

              <div className="col-span-5">

                <RULDashboard />

              </div>

            </div>

            <div className="mt-6">

              <FailureHeatmap />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}