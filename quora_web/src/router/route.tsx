import { RouteConfig } from 'react-router-config';
import { useLocation } from 'react-router';
import { lazy } from 'react';

function NoMatch() {
  const location = useLocation();

  return (
    <div>
      <h3>
        No match for
        <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: lazy(() => { return import('@page/Home'); }),
  },
  {
    path: '/answer',
    exact: true,
    component: lazy(() => { return import('@page/Answer'); }),
  },
  {
    path: '/signin',
    component: lazy(() => { return import('@page/SignIn'); }),
  },
  {
    path: '/signup',
    component: lazy(() => { return import('@page/SignUp'); }),
  },
  {
    path: '/article',
    component: lazy(() => { return import('@page/Article'); }),
  },
  {
    path: '/user',
    component: lazy(() => { return import('@page/User'); }),
  },
  {
    path: '*',
    component: NoMatch,
  },
];
export default routes;
