import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import React, {useState} from 'react';
import Cart from "../body/cart";
import { Link, useNavigate } from "react-router-dom";

// redux things import
import { useSelector, useDispatch } from "react-redux";
import { loadSession } from "../../redux/actionCreators";

// imported jwt functionlities
import jwtDecode from "jwt-decode";

// the main Nav or Header component whatever you say!
const TheNav: React.FC<{'cartItems': {'id': number, 'name': string, 'quantity': number}[]}> = (props) => {
    const productCategories = [
        'Mobile',
        'Laptop and Accessories',
        'Mobile Accessories',
    ]

    // for cart control
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // dispatch function defined
    const dispaz = useDispatch();
    const navigate = useNavigate();

    // session related things
    const userSession: {
        access: string,
        refresh: string
    } | undefined = useSelector((state: any) => state.sessionData);

    const accessSession: string | undefined = userSession?.access;
    const accessData: {
        username: string
    } | undefined = accessSession ? jwtDecode(accessSession) : undefined;

    // logoutuser function defined
    let logOutUser = () => {
        dispaz(loadSession(undefined));
        localStorage.removeItem('authTokens');
        navigate("login");
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand><Link to="/">Ecommerce 2.0 {accessSession ? <p>Hello {accessData?.username} !</p> : ""}</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link><Link to="products">Store</Link></Nav.Link>
                        <NavDropdown title="Products" id="navbarScrollingDropdown">
                            {
                                productCategories.map(product => (
                                    <NavDropdown.Item href="#action3">{product}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link><Link to="orders">Orders</Link></Nav.Link>
                        <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                        {
                            accessSession ?
                            <Nav.Link onClick={logOutUser}>Log out</Nav.Link> :
                            <Nav.Link><Link to="login">Log in</Link></Nav.Link>   
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Cart show={show} handleClose={handleClose} cartItems={props.cartItems} />
        </Navbar>
    );
}

export default TheNav;