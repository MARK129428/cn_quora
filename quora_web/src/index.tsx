import { createRoot } from 'react-dom/client'
import './index.scss'

const Component = () => {
  return <div>hello, xxxx</div>
}

const root = document.getElementById('app')
const app = createRoot(root!)
app.render(<Component/>)