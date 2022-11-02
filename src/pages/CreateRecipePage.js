import React, { Fragment, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import  Button  from "react-bootstrap/Button";

const CreateRecipePage = () => {
    const titleRef = useRef();

    return (
        <Container className="d-flex flex-column align-items-center">
            <h1 className="mb-4">Create Recipe</h1>
            <Form className="my-2">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        ref={titleRef}
                        type="text"
                        placeholder="Recipe Title"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                        required
                        ref={titleRef}
                        as="textarea"
                        rows={5}
                        placeholder="Ingredients"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        ref={titleRef}
                        as="textarea"
                        rows={5}
                        placeholder="Description"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        type="file"
                        placeholder="Upload image"
                        // onChange={handleImageUpload}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
        </Container>
    );
};

export default CreateRecipePage;
