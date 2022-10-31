import React, { Fragment, useState } from "react";

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";
import RegisterImage from "../assets/images/login_image.jpg"

const RegisterPage = () => {
    const { currentUser } = useAuth();

    return (
        <Fragment>
            <img className="register-img" src={RegisterImage} alt="registerImg"/>
            <Container
                className="d-flex flex-column align-items-center h-auto"
                style={{ maxWidth: "400px" }}
            >
                <h1 className="my-4">Sign up</h1>

                <RegisterForm></RegisterForm>
                <p className="text-muted">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
                {/* <p>Signed in as: {currentUser?.email}</p> */}
            </Container>
        </Fragment>
    );
};

export default RegisterPage;
