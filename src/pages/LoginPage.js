import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginImage from "../assets/images/login_image.jpg";

const LoginPage = () => {
    return (
        <Fragment>
            <Container
                className="d-flex flex-column align-items-center"
                style={{ maxWidth: "400px" }}
            >
                <h1 className="mb-4">Sign in</h1>
                <LoginForm></LoginForm>
                <p className="text-muted">
                    Don't have an account yet?{" "}
                    <Link className="text-success" to="/register">Register</Link>
                </p>
            </Container>
            <img className="login-img rounded" src={LoginImage} alt="loginImg"/>
        </Fragment>
    );
};

export default LoginPage;
