import React from 'react'
import CoursesList, { ALL_COURSES_QUERY } from "../../components/coursesList";
import { initializeApollo } from "../../lib/apolloClient";
import Layout from '../../components/sharedLayout'

const AllCourses = () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>
        Courses Directory
      </h1>
      <CoursesList />
    </Layout>
  )
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_COURSES_QUERY,
  });


  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default AllCourses;