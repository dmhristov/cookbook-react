import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// dark color #1971c2

const Navigation = () => {
    const { currentUser, logout } = useAuth();
    // console.log(currentUser?.uid);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Navbar className="" bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand
                    href="/"
                    className="main-brand fw-bold fs-4"
                    style={{ color: "#f8f9fa" }}
                >
                    Cookbook
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    {currentUser ? (
                        <Nav className="">
                            <Nav.Link href="/demo" className="">
                                Demo
                            </Nav.Link>
                            <Nav.Link href="/recipe/create" className="">
                                Create recipe
                            </Nav.Link>
                            <Nav.Link href="/dashboard">Recipes</Nav.Link>
                            <NavDropdown
                                title="Profile"
                                id="basic-nav-dropdown"
                            >
                                <p className="text-center">{currentUser?.email}</p>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <Button
                                    onClick={handleLogout}
                                    className="logout-btn w-100 fw-bold"
                                    variant="danger"
                                >
                                    Logout
                                </Button>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;


