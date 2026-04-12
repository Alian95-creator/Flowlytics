let prev = {
  gold: 2300,
  silver: 27,
  oil: 80,
};

export default function handler(req, res) {
  const update = (price) => {
    const change = (Math.random() - 0.5) * 2;
    const newPrice = price + change;
    const percent = ((change / price) * 100).toFixed(2);

    return {
      price: newPrice.toFixed(2),
      change: percent,
    };
  };

  const gold = update(prev.gold);
  const silver = update(prev.silver);
  const oil = update(prev.oil);

  prev = {
    gold: parseFloat(gold.price),
    silver: parseFloat(silver.price),
    oil: parseFloat(oil.price),
  };

  res.status(200).json({
    gold,
    silver,
    oil,
  });
}