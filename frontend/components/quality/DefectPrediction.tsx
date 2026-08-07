const products = [
  {
    id: "PRD-001",
    probability: "2%",
    status: "Pass",
  },
  {
    id: "PRD-002",
    probability: "31%",
    status: "Monitor",
  },
  {
    id: "PRD-003",
    probability: "89%",
    status: "Reject",
  },
];

export default function DefectPrediction() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131922]/90 p-6">

      <h2 className="text-2xl font-semibold">
        Product Quality Prediction
      </h2>

      <table className="mt-8 w-full">

        <thead>

          <tr className="border-b border-white/5 text-left text-sm text-slate-500">

            <th className="pb-4">Product</th>
            <th className="pb-4">Defect Probability</th>
            <th className="pb-4">Prediction</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-b border-white/5"
            >

              <td className="py-5">
                {product.id}
              </td>

              <td>
                {product.probability}
              </td>

              <td>
                {product.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}