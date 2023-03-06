import { RouteConfig } from 'react-router-config';
import { useLocation } from 'react-router';
import Home from '@page/Home';
import Answer from '@page/Answer';
import SignUp from '@page/SignUp';
import SignIn from '@page/SignIn';

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
    component: Home,
  },
  {
    path: '/answer',
    exact: true,
    component: Answer,
  },
  {
    path: '/signin',
    component: SignIn,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '*',
    component: NoMatch,
  },
];
export default routes;
