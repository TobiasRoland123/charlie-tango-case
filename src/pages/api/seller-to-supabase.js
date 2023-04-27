export default async function handler(req, res) {
  // res.status(200).json({ name: "Tobu" });

  const response = await fetch(
    "https://pidnszjfygdazvvfuozh.supabase.co/rest/v1/edc_seller_helper",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: process.env.SUPABASE_KEY,
        Prefer: "return=representation",
      },
      body: JSON.stringify(req.body),
    }
  ).then((res) => res.json());
  // console.log(response);
  // res.redirect(307, "/");
  return res.status(200).json({ response });
}

/*


curl 'https://pidnszjfygdazvvfuozh.supabase.co/rest/v1/edc_seller_helper?select=id' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"


*/

/*



curl 'https://pidnszjfygdazvvfuozh.supabase.co/rest/v1/edc_seller_helper?select=id' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZG5zempmeWdkYXp2dmZ1b3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwNjc1MzAsImV4cCI6MTk5NzY0MzUzMH0.f_ug6tdRihBda0D5e3NLlACsoDW3xdQiEL74zeYFhBo" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZG5zempmeWdkYXp2dmZ1b3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwNjc1MzAsImV4cCI6MTk5NzY0MzUzMH0.f_ug6tdRihBda0D5e3NLlACsoDW3xdQiEL74zeYFhBo"
*/
