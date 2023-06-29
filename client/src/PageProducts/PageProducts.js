import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Product from "./Product";
import Panier from './Panier';
import { useEffect, useState } from 'react';
import getToken from '../auth'
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

axios.defaults.headers.common['x-auth-token'] = getToken();

export default function PageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  //panier
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isAdmin, setIsAdmin] = useState(new Cookies().get("isAdmin") == "true");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const data = await axios.get('http://localhost:5000/api/product/');
      setProducts(data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  //Panier
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  };

  const confirmCart = async () => {
    try {
      for (const product of cart) {
        const updatedQuantity = product.quantity - 1;

        await axios.put(`http://localhost:5000/api/product/${product._id}`, { quantity: updatedQuantity });
      }

      setCart([]);
      setTotalPrice(0);
      alert('Le panier a été confirmé avec succès!');
    } catch (error) {
      console.error('Erreur lors de la confirmation du panier:', error);
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce((sum, product) => sum + product.prix, 0);
    setTotalPrice(totalPrice);
  };

  function ajoutProduct(product) {
    let new_products = [...products];
    new_products.push(product);
    setProducts(new_products);
  }

  function removeProductUi(id) {
    setProducts(products.filter(product => product._id !== id));
  }

  const emptyProduct = {
    name: "",
    prix: "",
    quantity: "",
    description: "",
  }

  return (
    <>
      <Container className="d-flex" style={{ justifyContent: "space-between" }}>
        <div >
          {
            isAdmin && 
            <Link to="/users" className="p-3" style={{ textDecoration: 'none', color: "black" }}><Button>Utilisateur</Button></Link>

          }
          <Link to="/" style={{ textDecoration: 'none', color: "black" }} onClick={() => {
            const allCookies = new Cookies().getAll();
            Object.keys(allCookies).forEach((cookieName) => {
              new Cookies().remove(cookieName);
            });
          }}><Button>Déconnection</Button></Link>
        </div>
        <input className="px-3" value={search} onChange={e => setSearch(e.target.value)} style={{ border: 0, borderRadius: "0 0 10px 10px", outline: 'none', boxShadow: "1px 1px 1px gray" }} placeholder="Rechercher un produit"></input>
      </Container>


      <Container>
        <Row >
          {
            filteredProducts.map(product => (
              <Col key={product._id} md="6" sm="5" className='p-3'>
                <Product product={product} addToCart={addToCart} canModify={isAdmin} removeProductUi={removeProductUi} />
              </Col>
            ))
          }
        </Row>
      </Container>
      {
        isAdmin &&
        <Col key={"modif"} md="6" sm="5" className='p-3'>
          <Product product={emptyProduct} addToCart={addToCart} ajoutProductUi={isAdmin ? ajoutProduct : undefined} canModify={isAdmin} />
        </Col>
      }

      <Panier cart={cart} totalPrice={totalPrice} removeFromCart={removeFromCart} confirmCart={confirmCart} />  {/*Mettre l'affichage dans une autre route, navBar */}
    </>


  );
}