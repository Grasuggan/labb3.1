import React from "react";
import { gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/SharedLayout";
import { initializeApollo } from "../../lib/apolloClient";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import styles from "../../styles/layout.module.css";
import { getAllEmotions } from "../../lib/info";

export const STUDENT_CURRENT_EMOTION_QUERY = gql`
  query getStudentCurrentEmotion($status: Status) {
    queryStudent(filter: { status: { eq: $status } }) {
      id
      firstName
      lastName
      course {
        id
        name
      }
    }
  }
`;

export async function getStaticProps(props) {
  const apolloClient = initializeApollo();

  const studentsData = await apolloClient.query({
    query: STUDENT_CURRENT_EMOTION_QUERY,
    variables: {
      status: props.params.status,
    },
  });

  const statusTitle = props.params.status;

  return {
    props: {
      studentsData,
      statusTitle,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllEmotions();
  return {
    paths,
    fallback: false,
  };
}

export default function Emotion(pageProps) {
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>
        {" "}
        Students with {pageProps.statusTitle} emotion
      </h1>
      <Grid style={{ marginTop: "20px" }} container spacing={2}>
        {pageProps.studentsData.data.queryStudent.length > 0 ? (
          pageProps.studentsData.data.queryStudent.map((student) => (
            <Grid item xs={6} key={student.id}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary" gutterBottom>
                    {student.firstName} {student.lastName}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {student.course.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={4}>
            <Typography color="textSecondary">No students found</Typography>
          </Grid>
        )}
      </Grid>

      <div className={styles.container}>
        <div className={styles.backContainer}>
          <div className={styles.buttonColumn}>
            <div className={styles.backToHome}>
              <Link href={`/status/${pageProps.statusTitle}`}>
                <a>??? Go to meaning of {pageProps.statusTitle} emotion</a>
              </Link>
            </div>
          </div>

          <div className={styles.buttonColumn}>
            <div className={styles.backToHomeRight}>
              <Link href="/courses/Courses">
                <a>Go to courses ???</a>
              </Link>
            </div>

            <div className={styles.backToHomeRight}>
              <Link href="/students/AllStudents">
                <a>Go to students ???</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
