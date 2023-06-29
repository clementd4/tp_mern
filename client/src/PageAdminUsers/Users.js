import axios from "axios";
import { useState } from "react";
import { ToggleButton, Button, Col, Container, Row } from "react-bootstrap";

export default function User({ user, removeUserUi, ajoutUserUi }) {
    const [firstname, setFirstname] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const [modeModification, setModeModification] = useState(ajoutUserUi !== undefined);

    function removeUser() {
        removeUserUi(user._id);
        axios.delete(`http://localhost:5000/api/users/${user._id}`)
            .catch(err => alert("erreur suppression utilisateur"))
    }

    function saveUser() {
        const body = {
            firstName: firstname,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
        }

        if (ajoutUserUi !== undefined) {
            axios.post(`http://localhost:5000/api/users`, body)
                .then(u => {
                    ajoutUserUi(u.data);
                    setFirstname('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setPassword('');
                })
                .catch(err => alert("erreur modification utilisateur"))
        } else {
            axios.put(`http://localhost:5000/api/users/${user._id}`, body)
                .then(_ => setModeModification(false))
                .catch(err => alert("erreur modification utilisateur"))
        }
    }

    const inputStyleTop = { border: 0, borderRadius: "10px 10px 0 0 ", outline: 'none', boxShadow: "1px 1px 1px gray" }
    const inputStyleMiddle = { border: 0, outline: 'none', boxShadow: "1px 1px 1px gray" }
    const inputStyleBottom = { border: 0, outline: 'none', borderRadius: "0 0 10px 10px", boxShadow: "1px 1px 1px gray" }
    if (modeModification) {
        return (
            <div className='p-3' style={{ backgroundColor: '#C2D9B8', borderRadius: 10, height: "100%" }}>
                {/* input style from login TODO */}
                <Container>
                    <Col>
                        <Row>
                            <input style={inputStyleTop} type="text" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            <input style={inputStyleMiddle} type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <input style={inputStyleMiddle} type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input style={inputStyleMiddle} type="text" placeholder="Telephone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input style={inputStyleBottom} type="text" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <ToggleButton
                                className="mt-2"
                                id="toggle-check"
                                type="checkbox"
                                variant="outline-primary"
                                checked={isAdmin}
                                value={isAdmin}
                                onChange={(e) => setIsAdmin(!isAdmin)}
                            >
                                {isAdmin ? "Administrateur" : "Utilisateur"}
                            </ToggleButton>
                        </Row>
                    </Col>
                </Container>

                {
                    !(ajoutUserUi !== undefined) &&
                    <Button className="mt-3" onClick={() => setModeModification(false)} style={{ borderRadius: "10px 0 0 10px" }}>Annuler</Button>
                }

                <Button className="mt-3" onClick={() => saveUser()} style={ajoutUserUi === undefined ? { borderRadius: "0 10px 10px 0 " } : {}}>{ajoutUserUi !== undefined ? "Ajouter" : "Modifier"}</Button>
            </div>
        )
    }
    return (
        <div className='p-3' style={{ backgroundColor: '#C2D9B8', borderRadius: 10, height: "100%" }}>
            <h3>{user.firstName} {user.lastName}</h3>
            <h4>{user.email}</h4>
            <h5>{user.phone}</h5>
            <Button onClick={() => removeUser()} style={{ borderRadius: "10px 0 0 10px" }}>Supprimer</Button>
            <Button onClick={() => setModeModification(true)} style={{ borderRadius: "0 10px 10px 0 " }}>Modifier</Button>
        </div>
    )
}
