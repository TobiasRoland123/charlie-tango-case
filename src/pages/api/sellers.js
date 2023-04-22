//JONAS: Lidt forvirret over hvordan man skal benytte API routing gennem next.js, har læst på det i to timer nu og jeg fatter det stadig ikke helt. 😅

// export async function GET() {
//   const res = await fetch(
//     "https://ponkzfmbqesqbziteamo.supabase.co/rest/v1/wines",
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "API-Key":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbmt6Zm1icWVzcWJ6aXRlYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNTUsImV4cCI6MTk5NTQ5NTM1NX0.RSWdmnxCnrTGNGgdaILP3EqzoTOL3DaKz45hlaXqYq4",
//       },
//     }
//   );
//   const data = await res.json();

//   return new Response.json({ data });
// }

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }
