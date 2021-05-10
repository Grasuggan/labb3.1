import React from 'react'
import StudentList, { ALL_STUDENTS_QUERY } from "../../components/studentList";
import { initializeApollo } from "../../lib/apolloClient";
import Layout from '../../components/sharedLayout'

const AllStudents = () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>
        List of students
      </h1>
      <StudentList />
    </Layout>
  )
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

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

export default AllStudents;