import { RouteConfig } from 'react-router-config';
import Home from '@page/Home';
import Answer from '@page/Answer';
import { useLocation } from 'react-router';

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
    path: '*',
    component: NoMatch,
  },
];
export default routes;
