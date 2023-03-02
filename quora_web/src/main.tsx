import { createRoot } from 'react-dom/client';
import App from './App';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css';

const root = document.getElementById('app');
const app = createRoot(root!);
app.render(<App />);
