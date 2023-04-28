import Head from "next/head";

export default function SellerCase({ data }) {
  const { content } = data;
  return (
    <>
      <Head>
        <title>Seller Case</title>
      </Head>
      <h1>{content.name}</h1>
    </>
  );
}

export async function getStaticProps(context) {
  console.log(context.params.slug);
  const slug = context.params.slug;
  const api = "https://bucolic-bombolone-857476.netlify.app/api/dogs/" + slug;
  const res = await fetch(api);
  if (res.status != 200) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();
  console.log(data);

  return {
    props: {
      data: data,
    },
  };
}

export async function getStaticPaths() {
  const api = "https://bucolic-bombolone-857476.netlify.app/api/dogs/";
  const res = await fetch(api);
  const data = await res.json();
  const paths = data.map((object) => {
    console.log(object.slug);
    return { params: { slug: object.slug } };
  });

  console.log(data);
  return {
    paths,
    fallback: false,
  };
}
