import { useState } from "react"
import { Col, Container, Button, Row } from "react-bootstrap";
import axios from "axios";
import getToken from "../auth";

axios.defaults.headers.common['x-auth-token'] = getToken();

export default function Product({ product, addToCart, ajoutProductUi, canModify, removeProductUi }) {
    const [p, setProduct] = useState(product);
    const [modifyMode, setModifyMode] = useState(ajoutProductUi !== undefined);

    function saveProduct() {
        if (ajoutProductUi !== undefined) {
            axios.post(`http://localhost:5000/api/product`, p)
                .then(u => {
                    console.log(u.data);
                    ajoutProductUi(u.data);
                    setProduct({
                        name: "",
                        prix: "",
                        quantity: "",
                        description: ""
                    })
                })
                .catch(err => alert("erreur ajout produit"))
        } else {
            axios.put(`http://localhost:5000/api/product/${product._id}`, p)
                .then(_ => setModifyMode(false))
                .catch(err => alert("erreur modification produit"))
        }
    }

    const inputStyleTop = { border: 0, borderRadius: "10px 10px 0 0 ", outline: 'none', boxShadow: "1px 1px 1px gray" }
    const inputStyleMiddle = { border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }
    const inputStyleBottom = { border: 0, outline: 'none', borderRadius: "0 0 10px 10px", boxShadow: "1px 1px 1px gray" }

    function removeProduct() {
        removeProductUi(product._id);
        axios.delete(`http://localhost:5000/api/product/${product._id}`)
            .catch(err => alert("erreur suppression produit"))
    }


    if (modifyMode) {
        return (
            <div className='p-3' style={{ backgroundColor: '#C2D9B8', borderRadius: 10, height: "100%" }}>
                <Container>
                    <Col>
                        <Row>
                            <input style={inputStyleTop} type="text" placeholder="Nom" value={p.name} onChange={(e) => {
                                const copyProduct = Object.assign({}, p);
                                copyProduct.name = e.target.value;
                                setProduct(copyProduct)
                            }} />
                            <input style={inputStyleMiddle} type="text" placeholder="Prix" value={p.prix} onChange={(e) => {
                                const copyProduct = Object.assign({}, p);
                                copyProduct.prix = e.target.value;
                                setProduct(copyProduct)
                            }} />
                            <input style={inputStyleMiddle} type="text" placeholder="Quantité" value={p.quantity} onChange={(e) => {
                                const copyProduct = Object.assign({}, p);
                                copyProduct.quantity = e.target.value;
                                setProduct(copyProduct)
                            }} />
                            <input style={inputStyleBottom} type="text" placeholder="Description" value={p.description} onChange={(e) => {
                                const copyProduct = Object.assign({}, p);
                                copyProduct.description = e.target.value;
                                setProduct(copyProduct)
                            }} />
                            <button onClick={() => saveProduct(true)}>{ajoutProductUi !== undefined ? "Ajouter" : "Modifier"}</button>
                        </Row>
                    </Col>
                </Container>
            </div>
        )
    }

    return (
        <div className='p-3' style={{ backgroundColor: '#C2D9B8', borderRadius: 10, height: "100%" }}>
            <h3>{p.name}</h3>
            <h4>Pour {p.prix} €</h4>
            <h5>Il en reste {p.quantity}</h5>
            <p>{p.description}</p>
            <button disabled={p.quantity === 0} onClick={() => addToCart(p)}>Ajouter au panier</button>
            {
                canModify &&
                    <button onClick={() => setModifyMode(true)}>Modifier</button>                
            }
            {
                (canModify && removeProductUi !== undefined) &&
                    <button onClick={() => removeProduct()}>Supprimer</button>
            }
        </div>
    )
}
