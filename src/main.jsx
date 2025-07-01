import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'modern-normalize'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
