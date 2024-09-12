import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './components/ListingPages/ProfilePage/ProfilePage.css';
import './components/Navbar/Navbar.css';
import './components/DashboardPage/DashboardPage.css';
import './components/AccountPage/AccountPage.css';
import './components/LoginPage/LoginPage.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
