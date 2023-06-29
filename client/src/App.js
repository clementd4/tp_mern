import './App.css';

import PageProducts from './PageProducts/PageProducts';
import PageLogin from './PageLogin/PageLogin';
import PageAdminUsers from './PageAdminUsers/PageAdminUsers';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/signup" element={<PageLogin inscription={true} />} />
          <Route path="/products" element={<PageProducts />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
