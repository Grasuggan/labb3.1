import React from 'react'
  import { gql, useQuery } from "@apollo/client";
  import Card from "@material-ui/core/Card";
  import Grid from "@material-ui/core/Grid";
  import { makeStyles } from "@material-ui/core/styles";
  import CardContent from "@material-ui/core/CardContent";
  import Typography from "@material-ui/core/Typography";
  import styles from '../styles/layout.module.css'
  import Link from 'next/link'

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

export const ALL_STUDENTS_QUERY = gql`
  query allStudents {
    queryStudent {
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
  const classes = useStyles();

  const { loading, error, data } = useQuery(ALL_STUDENTS_QUERY);

    if (error)
    return <div>Error loading students.</div>;
    if (loading)
    return <div>Loading students</div>;

  const { queryStudent: allStudents } = data;

  const dataset = allStudents;

  return (
    <div>
      <div style={{ display: "flex" }}>
      </div>
      <Grid style={{ marginTop: "20px" }} container spacing={2}>
        {dataset.map((student) => (
          <Grid item xs={4} key={student.id}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  {student.firstName}
                  <br />
                  {student.lastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {student.course.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Status - {student.status}               
                </Typography>
                <Typography variant="body2" component="p">
                <div className={styles.black}>
                    <Link href={`/students/${student.lastName}`}>
                      <a>Info</a>
                  </Link>
              </div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

      </Grid>
    </div>
  );
}