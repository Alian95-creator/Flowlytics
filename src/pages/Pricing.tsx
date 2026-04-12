export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      features: ["Basic Dashboard", "Crypto Data", "Limited Forex"],
    },
    {
      name: "Pro",
      price: "$19/mo",
      features: ["Realtime Data", "AI Insights", "Heatmaps"],
    },
    {
      name: "Elite",
      price: "$49/mo",
      features: ["Full Analytics", "User Presence", "Advanced Charts"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold text-center mb-10">
        Pricing
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className="card-dark p-6 rounded-2xl hover-glow"
          >
            <h2 className="text-xl font-bold mb-2">{p.name}</h2>
            <p className="text-3xl font-bold mb-4 neon-green">
              {p.price}
            </p>

            <ul className="space-y-2 text-gray-400 text-sm">
              {p.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>

            <button className="mt-6 w-full py-2 bg-green-500 text-black rounded-lg font-bold">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}