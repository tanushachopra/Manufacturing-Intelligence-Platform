import {
  IconCpu,
  IconAlertTriangle,
  IconTool,
  IconShieldCheck,
} from "@tabler/icons-react";

const cards = [
  {
    title: "Healthy Machines",
    value: "42",
    icon: IconShieldCheck,
    color: "text-green-400",
  },
  {
    title: "At Risk",
    value: "6",
    icon: IconAlertTriangle,
    color: "text-yellow-400",
  },
  {
    title: "Critical",
    value: "2",
    icon: IconTool,
    color: "text-red-400",
  },
  {
    title: "Monitored Assets",
    value: "50",
    icon: IconCpu,
    color: "text-cyan-400",
  },
];

export default function FleetOverview() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6"
          >

            <Icon
              className={card.color}
              size={28}
            />

            <p className="mt-6 text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {card.value}
            </h2>

          </div>

        );

      })}

    </div>
  );
}