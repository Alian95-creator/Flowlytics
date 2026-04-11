import { useParams } from "react-router-dom";

export default function Commodity() {
  const { symbol } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Commodity: {symbol?.toUpperCase()}
      </h1>

      <p className="text-gray-500">
        (Hook ke API commodity bisa ditambah nanti)
      </p>
    </div>
  );
}