import React, { Fragment, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const DEFAULT_PROFILE_IMAGE_URL =
    "https://firebasestorage.googleapis.com/v0/b/cookbook-ac1d9.appspot.com/o/profile-default.png?alt=media&token=1ebc7234-5bb1-4d61-b792-df8aa18a373a";

const RegisterForm = () => {
    const { register } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const nameValidationPattern = /^[a-zA-Z]{2,20}$/;

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            setLoading(false);
            return setError("Passwords do not match!");
        }

        if (
            !nameValidationPattern.test(firstNameRef.current.value) ||
            !nameValidationPattern.test(lastNameRef.current.value)
        ) {
            setLoading(false);
            return setError(
                "Names should be 2-20 characters long and contain only letters"
            );
        }

        try {
            const response = await register(
                emailRef.current.value,
                passwordRef.current.value
            );
            const user = response.user;

            await setDoc(doc(db, "users", user.uid), {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                image_url: DEFAULT_PROFILE_IMAGE_URL,
            });
        } catch (err) {
            const error = err.message;
            
            if (error === "Firebase: Error (auth/invalid-email).") {
                setError("Invalid email address");
            } else if (
                error === "Firebase: Error (auth/email-already-in-use)."
            ) {
                setError("Email already exists");
            } else if (
                error ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
            )
                setError("Password should be at least 6 characters");
            else {
                setError("Failed to create an account");
            }
        }

        setLoading(false);
    };

    return (
        <Fragment>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="my-2">
                <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        ref={emailRef}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        ref={firstNameRef}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        ref={lastNameRef}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="registerConfirmPassword"
                >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        ref={passwordConfirmRef}
                    />
                </Form.Group>
                <Button disabled={loading} variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment>
    );
};

export default RegisterForm;
