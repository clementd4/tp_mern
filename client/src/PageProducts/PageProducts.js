import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

import Product from "./Product";
import { useEffect, useState } from 'react';

export default function PageProducts() {
    const dummy_product = [
        {
            id: 1,
            name: "Running Shoes",
            price: 99.99,
            quantity: 10,
            description: "High-performance running shoes with excellent cushioning and support.",
        },
        {
            id: 2,
            name: "Tennis Racket",
            price: 79.99,
            quantity: 5,
            description: "A lightweight and durable tennis racket for players of all levels.",
        },
        {
            id: 3,
            name: "Basketball",
            price: 29.99,
            quantity: 15,
            description: "Official size basketball made from high-quality materials for optimal grip and performance.",
        },
        {
            id: 4,
            name: "Yoga Mat",
            price: 24.99,
            quantity: 20,
            description: "A non-slip yoga mat with extra thickness for enhanced comfort during yoga and fitness exercises.",
        },
        {
            id: 5,
            name: "Cycling Helmet",
            price: 49.99,
            quantity: 8,
            description: "A lightweight and aerodynamic helmet designed to provide maximum protection for cyclists.",
        }
    ];
    // TODO jwt documentaion

    const [products, setProducts] = useState(dummy_product);

    const [search, setSearch] = useState('');

    useEffect(() => {
        setProducts(dummy_product.filter((p) => p.name.toLowerCase().search(search.toLowerCase()) !== -1))
    }, [search]);

    return (
        <>
            <input className="px-3" value={search} onChange={e => setSearch(e.target.value)} style={{ border: 0, borderRadius: "0 0 10px 10px", outline: 'none', boxShadow: "1px 1px 1px gray" }}></input>

            <Container>
            <Row >
                {
                    products.map(product => {
                        return (
                        <Col key={product.id} md="6" sm="5" className='p-3'>
                            <Product product={product} />
                        </Col>
                        )
                    })
                }
            </Row>
        </Container>
        </>

        
    );
}