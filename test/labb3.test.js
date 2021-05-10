import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import CoursesList, { ALL_COURSES_QUERY } from "../components/coursesList";
import Course, {CURRENT_COURSE_QUERY} from "../pages/courses/[course]"
import Home from '../pages/index'
import Head from 'next/head'
import Layout from '../components/sharedLayout'
import StudentList, { ALL_STUDENTS_QUERY } from "../components/studentList";


it('gets student firstname', async () => {
  const studentmock = {
        request: {
          query: ALL_STUDENTS_QUERY
        },
        error: new Error(),
    };
  const component = TestRenderer.create(
    <MockedProvider mocks={[studentmock]} addTypename={false}>
      <StudentList />
    </MockedProvider>,
  );

  await new Promise(resolve => setTimeout(resolve, 0));

  const tree = component.toJSON();
  expect(tree.children).toContain('Error loading students.');

});

it('loding students list', () => {
  const studentmock = [
    {
        request: {
          query: ALL_STUDENTS_QUERY
        },
        result: {      
          data: {
            queryStudent: [
              {
                firstName: "Bonny",
                lastName: "Winter"
              }
            ],
          }
      },
    }
];
  const component = TestRenderer.create(
    <MockedProvider mocks={studentmock} addTypename={false}>
      <StudentList />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading students');

});





it('loads the courses', () => {
  const mocks = [
    {
        request: {
          query: ALL_COURSES_QUERY
        },
        result: {      
          data: {
            queryCourse: [
              {
                name: "React"
              },
              {
                name: "JavaScript"
              },
              {
                name: "Java"
              }
            ]
          },
      },
    }
];
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CoursesList />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading courses');
});


it('Should render home components', () => {
  const home = TestRenderer.create(<Home/>);
  
  expect(home.root.findAllByType(Head));
  expect(home.root.findAllByType(Layout));
})


