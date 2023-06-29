import './App.css';

import PageProducts from './PageProducts/PageProducts';
import PageLogin from './PageLogin/PageLogin';
import PageAdminUsers from './PageAdminUsers/PageAdminUsers';
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import Panier from './PageProducts/Panier';

function App() {
  const isAdmin = new Cookies().get("isAdmin") == "true"

  return (
    <div className="App">
      

      <header className="App-header">      
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/signup" element={<PageLogin inscription={true} />} />
          <Route path="/products" element={<PageProducts />} />
          <Route path="/users" element={<PageAdminUsers />} />
          <Route path="/cart" element={<Panier />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
