import {
  IconActivity,
  IconTargetArrow,
  IconCpu,
  IconClockHour4,
} from "@tabler/icons-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";


import OperationsSummary from "@/components/dashboard/OperationsSummary";
import KPICard from "@/components/dashboard/KPICard";
import ProductionChart from "@/components/dashboard/ProductionChart";
import FactoryStatus from "@/components/dashboard/FactoryStatus";
import MachineStatusTable from "@/components/dashboard/MachineStatusTable";
import AndonBoard from "@/components/dashboard/AndonBoard";


export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-[#090B0F] text-white">

      <Sidebar />

      <section className="flex flex-1 flex-col overflow-hidden">

        <Topbar />

        <div className="flex-1 overflow-y-auto">

          <div className="mx-auto max-w-[1750px] px-10 py-8">

            {/* Hero */}
            <OperationsSummary />

            {/* KPI */}
            <div className="mt-8 grid grid-cols-4 gap-6">

              <KPICard
                title="Overall Equipment Effectiveness"
                value="86%"
                change="+2.4%"
                icon={<IconActivity size={22} />}
              />

              <KPICard
                title="Production Output"
                value="785"
                change="Target 800"
                icon={<IconTargetArrow size={22} />}
              />

              <KPICard
                title="Machine Health"
                value="94%"
                change="Excellent"
                icon={<IconCpu size={22} />}
              />

              <KPICard
                title="Downtime"
                value="18 min"
                change="-12%"
                icon={<IconClockHour4 size={22} />}
              />

            </div>

            {/* Analytics */}

            <div className="mt-8 grid grid-cols-12 gap-6">

              <div className="col-span-8">

                <ProductionChart />

              </div>

              <div className="col-span-4">

                <FactoryStatus />

              </div>

            </div>

            {/* Operations */}

            <div className="mt-8 grid grid-cols-12 gap-6">

              <div className="col-span-8">

                <MachineStatusTable />

              </div>

              <div className="col-span-4">

                <AndonBoard />

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}