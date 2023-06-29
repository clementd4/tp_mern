import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import User from './Users';
import getToken from '../auth';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

axios.defaults.headers.common['x-auth-token'] = getToken();

export default function PageAdminUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((users) => { setUsers(users.data) })
            .catch(err => console.log(err));
    }, []);

    function removeUserUi(id) {
        setUsers(users.filter(user => user._id !== id));
    }

    function ajoutUser(user) {
        let new_users = [...users];
        new_users.push(user);
        setUsers(new_users);
    }

    const emptyUser = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    }

    const filteredUsers = users.filter((user) => {
        const fullName = user.firstName + " " + user.lastName;
        return fullName.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
        <Container className="d-flex" style={{ justifyContent: "space-between" }}>
        <div >
            {
                (new Cookies().get("isAdmin") === "true") && 
                <Link to="/products" className="p-3" style={{ textDecoration: 'none', color: "black" }}><Button>Produits</Button></Link>
            }
          <Link to="/" style={{ textDecoration: 'none', color: "black" }} onClick={() => {
            const allCookies = new Cookies().getAll();
            Object.keys(allCookies).forEach((cookieName) => {
              new Cookies().remove(cookieName);
            });
          }}><Button>Déconnection</Button></Link>
        </div>
        <input className="px-3" value={search} onChange={(e) => setSearch(e.target.value)} style={{ border: 0, borderRadius: "0 0 10px 10px", outline: 'none', boxShadow: "1px 1px 1px gray" }} placeholder="Rechercher un utilisateur"></input>
      </Container>

            <Container>
             
                <Row>
                    {
                        filteredUsers.map(user => {
                            return (
                                <Col key={user._id} md="6" sm="5" className='p-3'>
                                    <User user={user} removeUserUi={removeUserUi} admin={user.isAdmin}/>
                                </Col>
                            )
                        })
                    }
                    <Col key={"ajout"} md="6" sm="5" className='p-3'>
                        <User user={emptyUser} ajoutUserUi={ajoutUser} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
