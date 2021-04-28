import PlayersList, { ALL_STUDENTS_QUERY, ALL_COURSES_QUERY } from "../components/studentList";
import { initializeApollo } from "../lib/apolloClient";
import Link from "next/link";

const IndexPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Students Directory <Link href="/table">(EPL Table)</Link>
      </h1>
      <PlayersList />
    </div>
  )
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_COURSES_QUERY,
  });

  await apolloClient.query({
    query: ALL_STUDENTS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;