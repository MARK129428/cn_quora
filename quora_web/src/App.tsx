import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './router/route';
import './index.scss';

export default function APP() {
  return (
    <div>
      <Router>
        {renderRoutes(routes)}
      </Router>
    </div>
  );
}
