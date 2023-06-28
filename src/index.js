import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Redirect from './components/Redirect';
import Search from './components/Search';
import Library from './components/Library';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='' element={<Redirect />} />
      <Route path='search' element={<Search />} />
      <Route path='library' element={<Library />} />
    </Routes>
  </BrowserRouter>
);
