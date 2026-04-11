import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const { pathname } = useLocation();

  const nav = [
    { name: "Crypto", path: "/crypto" },
    { name: "Gold", path: "/commodity/xauusd" },
    { name: "Forex", path: "/forex" },
    { name: "Users", path: "/users" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 flex justify-around py-3 z-50">

      {nav.map((item) => {
        const active = pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`text-xs flex flex-col items-center ${
              active ? "neon-green" : "text-gray-500"
            }`}
          >
            <span>{item.name}</span>
          </Link>
        );
      })}

    </div>
  );
}