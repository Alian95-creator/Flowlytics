export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.metals.live/v1/spot"
    );

    const data = await response.json();

    // transform
    const result = {
      gold: data.find((i) => i.gold)?.gold,
      silver: data.find((i) => i.silver)?.silver,
      oil: data.find((i) => i.oil)?.oil || 80, // fallback
    };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=30");

    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Failed to fetch commodities" });
  }
}