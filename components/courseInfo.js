  import { gql, useQuery, useLazyQuery } from "@apollo/client";
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



// export const ALL_COURSES_QUERY = gql`
//   query allCourses {
//     queryCourse {
//       id
//       name
//       desc
//       students {
//         id
//       }
//     }
//   }
// `;

export const CURRENT_COURSE_QUERY = gql`
query getCurrentCourseStudents($cname: String)
{
 queryCourse(filter: {name: {anyofterms: $cname}}) 
 {
   id
   name
   students{
     firstName
     lastName
     status
   }
 }
}
`;

console.log("3")

 
export default function CourseInfo(props) {

  const classes = useStyles();
  // const {
  //   loading: loadingCourses,
  //   error: errCourses,
  //   data: courses,
  // } = useQuery(ALL_COURSES_QUERY);

  const variab = "Java";

   const {loading: infoLoading, error: infoErr, data: studentsData} = useQuery(
      CURRENT_COURSE_QUERY,
      {
        variables: {
          cname: variab,
        }
      }
      );
    console.log(`4 ${studentsData.queryCourse.name}`)

    // const studentsData = await apolloClient.query({
    //   query: CURRENT_COURSE_QUERY,
    //   variables: {
    //     cname: props.params.course,
    //   }
    // })
   if (infoLoading)
   return <div>Loading info</div>;

    if (infoErr)
    return <div>Err</div>;


  const { queryCourse: getCurrentCourseStudents} = studentsData;

  const dataset = getCurrentCourseStudents;
  

  return (
    <div>
      <div style={{ display: "flex" }}>
       
      </div>
      <Grid style={{ marginTop: "20px" }} container spacing={2}>
      
          <Grid item xs={4} key={dataset.id}>
            <Card className={classes.root}>
              <CardContent>
               
                <Typography className={classes.pos} color="textSecondary">
                  {dataset.name}
                </Typography>

                {/* {dataset.students.length > 0 ? 
                
              
                    dataset.students.map((student) => (
                      <Grid item xs={4} key={student.id}>
                         <Card className={classes.root}>
                    <CardContent>
               
                <Typography className={classes.pos} color="textSecondary">
                  {student.firstName}
                </Typography>
                </CardContent>
            </Card>
              </Grid>
                    )) : 
                    <Typography className={classes.pos} color="textSecondary">
                    No students found
                  </Typography>
              
              } */}
            
              </CardContent>
            </Card>
          </Grid>
        
      </Grid>
    </div>
  );
}