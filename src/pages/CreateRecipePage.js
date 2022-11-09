import React, { Fragment, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "../firebase";
import { addDoc, Timestamp, collection } from "firebase/firestore";
import { CATEGORIES } from "../constants/constants";

const CreateRecipePage = () => {
    const titleRef = useRef();
    const ingredientsRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const [image, setImage] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const imageRef = ref(storage, `recipe-images/${v4() + image?.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);

        await addDoc(collection(db, "recipes"), {
            authorId: currentUser.uid,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            ingredients: ingredientsRef.current.value,
            category: categoryRef.current.value,
            imageUrl: imageUrl,
            likes: 0,
            date: Timestamp.now(),
        });

        navigate("/");
    };

    const handleImageUpload = (ev) => {
        setImage(ev.target.files[0]);
    };

    return (
        <Container className="d-flex flex-column align-items-center">
            <h1 className="mb-4 mt-2">Create Recipe</h1>
            <Form onSubmit={handleSubmit} className="my-2">
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
                        ref={ingredientsRef}
                        as="textarea"
                        rows={5}
                        placeholder="Ingredients"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        ref={descriptionRef}
                        as="textarea"
                        rows={5}
                        placeholder="Description"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        aria-label="Select category"
                        required
                        ref={categoryRef}
                    >
                        <option value="">Select category</option>
                        {CATEGORIES.map((category, idx) => {
                            return <option key={idx} value={category}>{category}</option>;
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        type="file"
                        placeholder="Upload image"
                        onChange={handleImageUpload}
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
