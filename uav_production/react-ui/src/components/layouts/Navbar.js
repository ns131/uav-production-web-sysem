import React, {useContext} from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import RoutePaths from "../../routes/RoutePaths";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


const MyNavbar = () => {
    let {logoutUser} = useContext(AuthContext)

    /*const handleLogout = () => {
        // Kullanıcıyı çıkış yapmaya yönlendir
        console.log("Çıkış yapıldı");
        window.location.href = "/login";  // Veya kullanıcıyı oturum açma sayfasına yönlendirebilirsiniz
    };*/

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={RoutePaths.HOME}>
                    Logo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={RoutePaths.HOME}>
                            Anasayfa
                        </Nav.Link>
                        <Nav.Link as={Link} to={RoutePaths.EMPLOYEES}>
                            Personel
                        </Nav.Link>
                        <Nav.Link as={Link} to={RoutePaths.TEAMS}>
                            Takım
                        </Nav.Link>
                        <Nav.Link as={Link} to={RoutePaths.PARTS}>
                            Parça
                        </Nav.Link>
                        <Nav.Link as={Link} to={RoutePaths.PRODUCTION}>
                            Üretim
                        </Nav.Link>
                        <Nav.Link as={Link} to={RoutePaths.ASSEMBLY}>
                            Montaj
                        </Nav.Link>
                    </Nav>
                    <Button variant="outline-dark" onClick={logoutUser}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;