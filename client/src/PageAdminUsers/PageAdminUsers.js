import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import User from './Users';

export default function PageAdminUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((users) => { setUsers(users.data) })
            .catch(err => alert(err));
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
            <Container>
                <Row>
                    <Col>
                        <input type="text" placeholder="Rechercher un utilisateur" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    {
                        filteredUsers.map(user => {
                            return (
                                <Col key={user._id} md="6" sm="5" className='p-3'>
                                    <User user={user} removeUserUi={removeUserUi} />
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
