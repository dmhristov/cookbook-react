import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);

        try {
            await login(
                emailRef.current.value.trim(),
                passwordRef.current.value.trim()
            );
            
        } catch (err) {
            const error = err.message;
            console.log(err);
            console.log(error);

            if (
                error === "Firebase: Error (auth/invalid-email)." ||
                error === "Firebase: Error (auth/wrong-password)."
            ) {
                setError("Invalid email address or password");
            } else {
                setError("Could not login");
            }
        }

        setLoading(false);

        if (error === "") {
            navigate("/");
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="my-2">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    ref={emailRef}
                    type="email"
                    placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
            </Form.Group>
            <Button disabled={loading} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default LoginForm;
