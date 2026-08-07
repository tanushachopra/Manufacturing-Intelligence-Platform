const cards = [
  {
    title: "Products Today",
    value: "4,821",
    color: "text-cyan-400",
  },
  {
    title: "Predicted Defects",
    value: "87",
    color: "text-red-400",
  },
  {
    title: "Quality Rate",
    value: "98.2%",
    color: "text-green-400",
  },
  {
    title: "Model",
    value: "Logistic Regression",
    color: "text-purple-400",
  },
];

export default function QualityOverview() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6"
        >

          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${card.color}`}>
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}