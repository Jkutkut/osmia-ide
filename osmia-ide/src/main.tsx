import ReactDOM from 'react-dom/client'
import {GoogleOAuthProvider} from '@react-oauth/google'
import {BrowserRouter} from 'react-router-dom'

import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sass/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
    <BrowserRouter basename={"/osmia-ide"}>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
