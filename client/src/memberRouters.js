import React from 'react';

const Home = React.lazy(() => import('./views/Home/home'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const memberRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Home },
];

export default memberRoutes;
