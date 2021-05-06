import { gql} from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import styles from '../../styles/layout.module.css'
import Link from 'next/link'
import Layout from '../../components/sharedLayout'
import CourseInfo from "../../components/courseInfo";
import { initializeApollo } from "../../lib/apolloClient";
import CoursesInfo, { CURRENT_COURSE_QUERY } from "../../components/courseInfo";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";



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






export async function getStaticProps(props) {
  const apolloClient = initializeApollo();

  const CURRENT_COURSE_QUERY = gql`
  query getCurrentCourseStudents($cname: String)
{
 queryCourse(filter: {name: {anyofterms: $cname}}) 
 {
   id
   name
   desc
   students{
     firstName
     lastName
     status
   }
 }
}
`;


    const studentsData = await apolloClient.query({
      query: CURRENT_COURSE_QUERY,
      variables: {
        // cname: props.params.course,
        cname: "Java",
      }
    });

    console.log(`studentsdata ${studentsData.data.queryCourse.map((c) => c.name)}`)

  return {
    props: {
      studentsData,
    },
  };
}

export async function getStaticPaths(){

  const paths = [
    {
    params: {
      course: "JavaScript",
    },
  },
  {
    params: {
      course: "Java",
    },
  },
  {
    params: {
      course: "React",
    },
  },
];
 
  return{
    paths,
    fallback: false,
  };
}







 export default function Course(pageProps) {
  const classes = useStyles();
    console.log("2")
    return (
      <Layout>
 {pageProps.studentsData.data.queryCourse.map((c) => (
   <div>
      <h1 style={{ textAlign: "center" }}> {c.name} </h1> 
            <Grid style={{ marginTop: "20px" }} container spacing={2}>
       
          <p style={{ textAlign: "center" }}> {c.desc}</p>
            
                    {c.students.length > 0 ? 
                     c.students.map((student) => (
                      <Grid item xs={4} key={student.id}>
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
              </CardContent>
            </Card>
          </Grid>
          )) : 
          <Grid item xs={4} key={student.id}>
                <Typography className={classes.pos} color="textSecondary">
                    No students found
                </Typography>
            </Grid>
            }
        </Grid>
        </div>
          ))}
     
     </Layout>
    )
  };
  
  // export async function getStaticProps(props) {
  //   const apolloClient = initializeApollo();
  // console.log("1")

  //   const studentsData = await apolloClient.query({
  //     query: CURRENT_COURSE_QUERY,
  //     variables: {
  //       cname: props.params.course,
  //     }
  //   });
  // console.log(`in getprops ${props.params.course}`)
  
  //   return {
  //     props: {
  //       initialApolloState: apolloClient.cache.extract(),
  //     },
  //     revalidate: 1,
  //   };
  // }
  
  // export default Course;

