import { useState } from "react";
import { Image, Button } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'universal-cookie';
import getToken from '../auth'

import { Link, Navigate } from "react-router-dom";

export default function PageLogin({ inscription }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [userName, setUsername] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    try {
        const token = getToken();
        if (token) {
            return <Navigate replace to="/products" />;
        }
    } catch {

    }
    
    function setCookie(name, token) {
        const cookies = new Cookies();
        cookies.set(name, token, { path: '/', maxAge: 3600 * 24 * 10 })
    }

    function login() {
        axios.post('http://localhost:5000/login', { email: mail, password: password })
            .then(t => {
                setCookie('token', t.data.access_token); 
                setCookie('isAdmin', t.data.isAdmin);
                window.location = "/products";
            })
            .catch(err => { alert(err); window.location = "/" });
    }

    // TODO validation

    function signup() {
        if (password !== verifyPassword) {
            alert("Les mots de passe ne sont pas identiques");
            return;
        }

        const body = {
            firstName: userName,
            lastName: familyName,
            phone: phoneNumber,
            email: mail,
            password: password,
        }

        axios.post('http://localhost:5000/signup', body)
            .then(token => { 
                setCookie('token', token.data.access_token); 
                setCookie('isAdmin', token.data.isAdmin);
                window.location = "/products" 
            })
            .catch(_ => { alert("erreur inscription"); window.location = "/" });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#C2D9B8", borderRadius: 10, boxShadow: "1px 1px 1px gray" }} className="p-3">
            <Image className="pb-3" rounded src="https://upload.wikimedia.org/wikipedia/fr/3/32/LAF_%28logo%29.svg" width={300} />

            <input value={mail} onChange={e => setMail(e.target.value)} className="px-2" style={{ border: 0, borderRadius: "10px 10px 0 0 ", outline: 'none', boxShadow: "1px 1px 1px gray" }} type="text" placeholder="Email"></input>

            {
                inscription &&
                <>
                    <input value={userName} onChange={e => setUsername(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="text" placeholder="Prénom"></input>
                    <input value={familyName} onChange={e => setFamilyName(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="text" placeholder="Nom"></input>
                    <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="text" placeholder="Numéro de téléphone"></input>
                </>
            }

            <input value={password} onChange={e => setPassword(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="password" placeholder="Mot de passe"></input>

            {
                inscription &&
                <input value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="password" placeholder="Verification mot de passe"></input>
            }

            <Button onClick={() => inscription ? signup() : login()} variant="primary" style={{ borderRadius: "0 0 10px 10px", boxShadow: "1px 1px 1px gray" }}>{inscription ? "Créer le compte" : "Connexion"} </Button>

            {
                !inscription && <Link to="/signup" className="mt-3"><h6>Créer un compte</h6></Link>
            }
        </div>
    );
}