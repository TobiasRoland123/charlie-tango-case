// pages/posts/[id].js

import { useRouter } from "next/router";

export default function Post({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  // Fetch post data from API using the ID parameter
  const res = await fetch(
    `http://localhost:3000/api/supabase-to-broker-single?id=${id}`
  );
  const data = await res.json();

  // Pass the post data as props to the page
  return {
    props: {
      data,
    },
  };
}
