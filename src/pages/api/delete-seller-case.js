export default async function handler(req, res) {
  //   res.status(200).json({ req });
  //   console.log(req.body);
  const response = await fetch(
    `https://pidnszjfygdazvvfuozh.supabase.co/rest/v1/edc_seller_helper?id=eq.${req.body}`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
        apikey: process.env.SUPABASE_KEY,
      },
    }
  ).then((res) => res.json());
  // .then((data) => console.log(data));
}
