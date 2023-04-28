export default async function handler(req, res) {
  const response = await fetch(
    "https://pidnszjfygdazvvfuozh.supabase.co/rest/v1/edc_seller_helper",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: process.env.SUPABASE_KEY,
        Prefer: "return=representation",
      },
    }
  ).then((res) => res.json());

  return res.status(200).json({ response });
}
