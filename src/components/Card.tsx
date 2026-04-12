
type Props = {
  title: string;
  value: string;
  change?: string;
};

export default function Card({ title, value, change }: Props) {
  const isUp = change?.startsWith("+");

  return (
    <div className="card-dark p-5 hover-glow">

      <h3 className="text-gray-400 text-sm">{title}</h3>

      <p className="text-3xl font-bold mt-2 neon-green">
        {value}
      </p>

      {change && (
        <p className={`text-sm mt-1 ${isUp ? "neon-green" : "neon-red"}`}>
          {change}
        </p>
      )}

    </div>
  );
}