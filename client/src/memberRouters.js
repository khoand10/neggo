import React from 'react';

const Home = React.lazy(() => import('./views/Home/home'));
const Course = React.lazy(() => import('./views/Course/course'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const memberRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Home },
  { path: '/course/:id', exact: true, name: 'Course Details', component: Course },
];

export default memberRoutes;
