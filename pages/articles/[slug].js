import { useRouter } from 'next/router';

const ArticleDetails = ({ article }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='container mt-5'>
      <h1>Article Details</h1>
      <p>Article ID: {article.id}</p>
      <p>Title: {article.title}</p>
      <p>Body: {article.description}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Fetch article details using the `id` from the route parameter
  const response = await fetch(`https://www.textiletoday.com.bd/api/article-details/${id}`);
  const article = await response.json();
  return {
    props: {
      article,
    },
  };
}

export default ArticleDetails;
