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
    path: '/answer/:questionId',
    exact: true,
    component: lazy(() => { return import('@page/AnswerDetail'); }),
  },
  {
    path: '/answerview/:answerId',
    exact: true,
    component: lazy(() => { return import('@page/AnswerView'); }),
  },
  {
    path: '/postanswer/:questionId',
    component: lazy(() => { return import('@page/AnswerPost'); }),
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
    exact: true,
    component: lazy(() => { return import('@page/Article'); }),
  },
  {
    path: '/question/:id',
    exact: true,
    component: lazy(() => { return import('@page/Question'); }),
  },
  {
    path: '/articleview/:id',
    exact: true,
    component: lazy(() => { return import('@page/ArticleView'); }),
  },
  {
    path: '/article/:id',
    component: lazy(() => { return import('@page/Article'); }),
  },
  {
    path: '/user',
    component: lazy(() => { return import('@page/User'); }),
    exact: false,
    routes: [
      {
        path: '/user/info',
        exact: true,
        component: lazy(() => { return import('@page/User/Info'); }),
      },
      {
        path: '/user/answer',
        exact: true,
        component: lazy(() => { return import('@page/User/Answer'); }),
      },
      {
        path: '/user/question',
        exact: true,
        component: lazy(() => { return import('@page/User/Question'); }),
      },
      {
        path: '/user/article',
        exact: true,
        component: lazy(() => { return import('@page/User/Article'); }),
      },
    ],
  },
  {
    path: '*',
    component: NoMatch,
  },
];
export default routes;
