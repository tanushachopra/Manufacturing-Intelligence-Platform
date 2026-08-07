import { IconSparkles, IconArrowRight } from "@tabler/icons-react";

export default function ManufacturingCopilot() {
  return (
    <div className="rounded-xl border border-[#273142] bg-[#141A22] p-6 h-full">

      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
          <IconSparkles size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Manufacturing Copilot
          </h2>

          <p className="text-sm text-gray-400">
            AI-powered production insights
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <div className="rounded-lg bg-[#1A2230] p-4 border border-[#273142]">
          <p className="text-sm text-gray-300">
            ⚠️ Machine <b>MC-104</b> has been idle for
            <span className="text-yellow-400"> 37 minutes</span>.
            Consider scheduling maintenance.
          </p>
        </div>

        <div className="rounded-lg bg-[#1A2230] p-4 border border-[#273142]">
          <p className="text-sm text-gray-300">
            📈 Production efficiency has increased by
            <span className="text-green-400"> 2.4%</span>
            compared to yesterday.
          </p>
        </div>

        <div className="rounded-lg bg-[#1A2230] p-4 border border-[#273142]">
          <p className="text-sm text-gray-300">
            🔧 Predicted tool replacement recommended within
            <span className="text-blue-400"> 14 operating hours.</span>
          </p>
        </div>

      </div>

      <button className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 hover:bg-blue-500 transition">
        Open Copilot
        <IconArrowRight size={18} />
      </button>

    </div>
  );
}