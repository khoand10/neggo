import React from 'react';

const Home = React.lazy(() => import('./views/Managers/Home/home'));
const Member = React.lazy(() => import('./views/Managers/Member/member'));
const Course = React.lazy(() => import('./views/Managers/CourseDetail/CourseDetail'));

const memberRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Home },
  { path: '/members', name: 'Dashboard', component: Member },
  { path: '/course/:courseID', name: 'Course Detail', component: Course },
];

export default memberRoutes;
