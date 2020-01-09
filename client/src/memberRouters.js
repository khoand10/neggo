import React from 'react';

const Home = React.lazy(() => import('./views/Home/home'));
const Course = React.lazy(() => import('./views/Course/course'));
const Lession = React.lazy(() => import('./views/Lession/lession'));
const Codes = React.lazy(() => import('./views/Codes/codes'));
const CourseList = React.lazy(() => import('./views/CourseList/course_list'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const memberRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Home },
  { path: '/courses', name: 'Course', component: CourseList },
  { path: '/course/:id', exact: true, name: 'Course Details', component: Course },
  { path: '/lession/:courseID/:moduleID/:lessionID', exact: true, name: 'Lession Details', component: Lession },
  { path: '/codes', exact: true, name: 'Code Playground', component: Codes}
];

export default memberRoutes;
