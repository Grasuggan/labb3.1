import React from "react";
import { gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/sharedLayout";
import { initializeApollo } from "../../lib/apolloClient";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import styles from "../../styles/layout.module.css";
import { getAllCourses } from "../../lib/info";

const useStyles = makeStyles({
  root: {
    minWidth: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
    fontSize: 12,
  },
});

export const CURRENT_COURSE_QUERY = gql`
  query getCurrentCourseStudents($cname: String) {
    queryCourse(filter: { name: { anyofterms: $cname } }) {
      id
      name
      desc
      students {
        firstName
        lastName
        status
      }
    }
  }
`;

export const ALL_EMOTIONS_QUERY = gql`
  query allEmotions {
    queryEmotion {
      title
      desc
    }
  }
`;

export async function getStaticProps(props) {
  const apolloClient = initializeApollo();

  const studentsData = await apolloClient.query({
    query: CURRENT_COURSE_QUERY,
    variables: {
      cname: props.params.course,
    },
  });

  return {
    props: {
      studentsData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllCourses();
  return {
    paths,
    fallback: false,
  };
}

export default function Course(pageProps) {
  const classes = useStyles();
  return (
    <Layout>
      {pageProps.studentsData.data.queryCourse.map((c) => (
        <div key={c.id}>
          <h1 style={{ textAlign: "center" }}> {c.name} </h1>
          <Grid style={{ marginTop: "20px" }} container spacing={2} key={c.id}>
            <p style={{ textAlign: "center" }}> {c.desc}</p>

            {c.students.length > 0 ? (
              c.students.map((student) => (
                <Grid item xs={6} key={student.id}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textPrimary"
                        gutterBottom
                      >
                        {student.firstName} {student.lastName}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Status - {student.status}
                      </Typography>
                      <div className={styles.bluecourse}>
                        <Link href={`/status/${student.status}`}>
                          <a>About {student.status} emotion</a>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={4}>
                <Typography className={classes.pos} color="textSecondary">
                  No students found
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
      ))}

      <div className={styles.backToHome}>
        <Link href="/courses/courses">
          <a>← Back to courses</a>
        </Link>
      </div>
    </Layout>
  );
}
