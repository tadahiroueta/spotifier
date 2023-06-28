import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from './components/Layout';
import Redirect from './components/Redirect';
import Search from './components/Search';
import Library from './components/Library';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='' element={<Redirect />} />
          <Route path='search' element={<Search />} />
          <Route path='library' element={<Library />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
