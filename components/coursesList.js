import React from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/layout.module.css";
import Link from "next/link";

export const ALL_COURSES_QUERY = gql`
  query allCourses {
    queryCourse {
      id
      name
      desc
      students {
        id
      }
    }
  }
`;

export default function CoursesList() {
  const {
    loading: loadingCourses,
    error: errCourses,
    data: courses,
  } = useQuery(ALL_COURSES_QUERY);

  if (errCourses) return <div>Error courses</div>;

  if (loadingCourses) return <div>Loading courses</div>;

  const { queryCourse: allCourses } = courses;

  const dataset = allCourses;

  return (
    <div>
      <div style={{ display: "flex" }}></div>
      <Grid style={{ marginTop: "20px" }} container spacing={2}>
        {dataset.map((course) => (
          <Grid item xs={6} key={course.id}>
            <Card>
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  {course.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ marginBottom: 12, fontSize: 12 }}
                >
                  {course.desc}
                </Typography>
                <Typography variant="body2" component="p">
                  Participants: {course.students.length}
                </Typography>

                <div className={styles.bluecourse}>
                  <Link href={`/courses/${course.name}`}>
                    <a>Read more</a>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
