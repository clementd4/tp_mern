import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

import Product from "./Product";
import Panier from './Panier';
import { useEffect, useState } from 'react';

export default function PageProducts() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    //panier
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchProducts();
      }, []);

      useEffect(() => {
        calculateTotalPrice();
      }, [cart]);
    
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/product/');
          const data = await response.json();
          setProducts(data);
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

            await fetch(`http://localhost:5000/api/product/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: updatedQuantity }),
            });
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

    return (
        <>
            <input className="px-3" value={search} onChange={e => setSearch(e.target.value)} style={{ border: 0, borderRadius: "0 0 10px 10px", outline: 'none', boxShadow: "1px 1px 1px gray" }} placeholder="Rechercher un produit"></input>

            <Container>
            <Row >
                {
                    filteredProducts.map(product => (
                        <Col key={product._id} md="6" sm="5" className='p-3'>
                            <Product product={product} addToCart={addToCart}/>
                        </Col>
                    ))
                }
            </Row>
        </Container>

        <Panier cart={cart} totalPrice={totalPrice} removeFromCart={removeFromCart} confirmCart={confirmCart} />  {/*Mettre l'affichage dans une autre route, navBar */}
        </>

        
    );
}