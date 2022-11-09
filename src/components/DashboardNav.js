import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const DashboardNav = ({ categories, filterCategory, resetFilter }) => {
    const handleCategoryChange = (ev) => {
        const category = ev.target.value;
        filterCategory(category);
    };

    return (
        <Navbar className="" bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <NavDropdown
                            title="Categories"
                            id="navbarScrollingDropdown"
                        >
                            <NavDropdown.Item as="button" onClick={resetFilter}>
                                All
                            </NavDropdown.Item>
                            {categories.map((category, idx) => {
                                return (
                                    <NavDropdown.Item
                                        key={idx}
                                        as="button"
                                        onClick={handleCategoryChange}
                                        value={category}
                                    >
                                        {category}
                                    </NavDropdown.Item>
                                );
                            })}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNav;
