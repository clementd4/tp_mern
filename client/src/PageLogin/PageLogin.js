import { useState } from "react";
import { Image, Button } from "react-bootstrap";

export default function PageLogin({ inscription }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [userName, setUsername] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    function login() {
        // bcrypt()
    }

    // TODO verification

    function signup() {

        window.location = "/"
    }
    
    return (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#C2D9B8", borderRadius: 10, boxShadow: "1px 1px 1px gray" }} className="p-3">
            <Image className="pb-3" rounded src="https://upload.wikimedia.org/wikipedia/fr/3/32/LAF_%28logo%29.svg" width={300} />

            <input value={mail} onChange={e => setMail(e.target.value)} className="px-2" style={{ border: 0, borderRadius: "10px 10px 0 0 ", outline: 'none', boxShadow: "1px 1px 1px gray" }} type="text" placeholder="Email"></input>

            {
                inscription &&
                <>
                    <input value={userName} onChange={e => setUsername(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="password" placeholder="Prénom"></input>
                    <input value={familyName} onChange={e => setFamilyName(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="password" placeholder="Nom de famille"></input>
                    <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="password" placeholder="Numéro de téléphone"></input>
                </>
            }

            <input value={password} onChange={e => setPassword(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="password" placeholder="Mot de passe"></input>

            {
                inscription &&
                <input value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} className="px-2" style={{ border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }} type="password" placeholder="Verification mot de passe"></input>
            }

            <Button onClick={() => inscription ? signup() : login()} variant="primary" style={{ borderRadius: "0 0 10px 10px", boxShadow: "1px 1px 1px gray" }}>Connexion</Button>
        </div>
    );
}