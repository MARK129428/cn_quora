import { createRoot } from 'react-dom/client'
import { HashRouter as Router, NavLink} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router/route'
import './index.scss'


const APP = () => {
  return (
    <div>
      <Router>
        <NavLink exact activeStyle={{color:'red'}} to="/">home</NavLink> |
        <NavLink activeStyle={{color:'red'}} to="/about">about</NavLink>
        {renderRoutes(routes)}
      </Router>
    </div>
  )
}

const root = document.getElementById('app')
const app = createRoot(root!)
app.render(<APP/>)