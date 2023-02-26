import React, { useState } from "react";

import { loadSession } from "../../redux/actionCreators";
import { useDispatch } from "react-redux";

import { Row, Col } from "react-bootstrap";
import "./loginPage.css";

import SignUpModal from "./signUpModal";

import { BACK_URL } from "../../Data/productData";

const LoginPage: React.FC<{message: string}> = props => {
    const dispaz: Function = useDispatch();
    
    const [show, setShow] = useState<boolean>(false);

    const loginUser = async (e: any) => {
        e.preventDefault();
        console.log('form submitted!');
        let response = await fetch(`${BACK_URL}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        });
        let data = await response.json();

        if (response.status === 200) {
            dispaz(loadSession(data));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            alert('something went wrong!')
        }
    }

    const onHide = () => {
        setShow(!show);
    }

    return (
        <div style={{padding: "2%"}}>
            <Row>
                <Col md={6} className="heading">
                    <h1 className="display-3 font-weight-bold mb-4">E-Commerce 2.0</h1>
                    <p className="display-6 lead">Order your desired commodities and get it delivered!</p>
                </Col>

                <Col md={6} className="formDiv">
                    <form style={{borderRadius: '20px', padding:"1rem", boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)'}} onSubmit={loginUser}>
                        <h3 style={{textAlign: "center", margin: "1rem"}}>{props.message}</h3>
                        <div className="mb-3">
                            <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                            <input type="text" className="form-control" id="exampleInputUsername1" name="username" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
                        </div>
                        <div className="d-grid" style={{padding: "2rem"}}>
                            <button type="submit" className="btn btn-outline-primary">Log In</button>
                            <br />
                            <button onClick={e => {e.preventDefault(); onHide();}} className="btn btn-outline-success">Don't have an account ?</button>
                        </div>
                    </form>
                </Col>
            </Row>
            <SignUpModal show={show} onHide={onHide} />
        </div>
    );
}

export default LoginPage;