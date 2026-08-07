import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import QualityOverview from "@/components/quality/QualityOverview";
import DefectPrediction from "@/components/quality/DefectPrediction";

export default function QualityPredictionPage() {
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
                Quality Prediction
              </h1>

              <p className="mt-4 max-w-3xl text-slate-400">
                Logistic Regression model predicting product quality using
                synthetic manufacturing telemetry.
              </p>

            </div>

            <div className="space-y-6">

              <QualityOverview />

              <DefectPrediction />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}