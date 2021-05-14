import React from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/layout.module.css";
import Link from "next/link";

export const ALL_STUDENTS_QUERY = gql`
  query allStudents {
    queryStudent {
      id
      firstName
      lastName
      status
      course {
        id
        name
        desc
      }
      id
    }
  }
`;

export default function StudentList() {
  const { loading, error, data } = useQuery(ALL_STUDENTS_QUERY);

  if (error) return <div>Error loading students.</div>;
  if (loading) return <div>Loading students</div>;

  const { queryStudent: allStudents } = data;

  const dataset = allStudents;

  return (
    <Grid style={{ marginTop: "20px" }} container spacing={2}>
      {dataset.map((student) => (
        <Grid item xs={4} key={student.id}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                {student.firstName}
                <br />
                {student.lastName}
              </Typography>
              <Typography color="textSecondary">
                {student.course.name}
              </Typography>
              <Typography variant="body2" component="p">
                Status - {student.status}
              </Typography>

              <div className={styles.black}>
                <Link href={`/students/${student.lastName}`}>
                  <a>Info</a>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
