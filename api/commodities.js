export default async function handler(req, res) {
  try {
    // base price (mendekati real market)
    const base = {
      gold: 2300,
      silver: 27,
      oil: 80,
    };

    // random movement (simulate realtime)
    const randomize = (price) => {
      const change = (Math.random() - 0.5) * 2;
      return (price + change).toFixed(2);
    };

    const data = {
      gold: randomize(base.gold),
      silver: randomize(base.silver),
      oil: randomize(base.oil),
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "fail" });
  }
}