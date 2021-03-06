import React from 'react';

const Home = React.lazy(() => import('./views/Managers/Home/home'));
const Member = React.lazy(() => import('./views/Managers/Member/member'));
const Course = React.lazy(() => import('./views/Managers/CourseDetail/CourseDetail'));

const memberRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Home },
  // { path: '/members', name: 'Members', component: Member },
  { path: '/members/:userID', name: 'Members', component: Member },
  { path: '/course/:courseID', name: 'Course Creator', component: Course },
];

export default memberRoutes;
