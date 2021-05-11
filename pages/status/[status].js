import React from "react";
import { gql } from "@apollo/client";
import Layout from "../../components/sharedLayout";
import { initializeApollo } from "../../lib/apolloClient";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import styles from "../../styles/layout.module.css";
import { getAllEmotions } from "../../lib/info";

export const CURRENT_EMOTION_QUERY = gql`
  query getCurrentEmotion($status: Status) {
    queryEmotion(filter: { title: { eq: $status } }) {
      id
      title
      desc
    }
  }
`;

export async function getStaticProps(props) {
  const apolloClient = initializeApollo();

  const emotionData = await apolloClient.query({
    query: CURRENT_EMOTION_QUERY,
    variables: {
      status: props.params.status,
    },
  });

  return {
    props: {
      emotionData,
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
      {pageProps.emotionData.data.queryEmotion.map((c) => (
        <Grid style={{ marginTop: "20px" }} container spacing={1} key={c.id}>
          <h1 style={{ textAlign: "center", width: "100%" }}> {c.title} </h1>

          <p style={{ textAlign: "center" }}> {c.desc}</p>

          <div
            className={styles.link}
            style={{ width: "50%", margin: "0 auto", textAlign: "center" }}
          >
            <Link href={`/emostudents/${c.title}`}>
              <a>Show all students with {c.title} emotion</a>
            </Link>
          </div>
        </Grid>
      ))}

      <div className={styles.backToHome}>
        <Link href="/courses/courses">
          <a>← Back to all courses</a>
        </Link>
      </div>
    </Layout>
  );
}
