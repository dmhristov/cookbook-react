import React, { useEffect, useRef, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { CATEGORIES } from "../constants/constants";
import {
    ref,
    deleteObject,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

const EditRecipePage = () => {
    const [image, setImage] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const titleRef = useRef();
    const ingredientsRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const recipeRef = useMemo(() => doc(db, "recipes", recipeId), [recipeId]);

    useEffect(() => {
        const getRecipeData = async () => {
            const response = await getDoc(recipeRef);
            const recipeData = response.data();

            if (!response.exists()) {
                setLoading(false);
                // TODO -> implement pageNotFound
                return setPageNotFound(true);
            }

            setRecipe(recipeData);
            setLoading(false);
        };
        getRecipeData();
    }, [recipeRef]);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (currentUser.uid !== recipe.authorId) return;

        const updatedRecipeFields = {
            title: titleRef.current.value,
            ingredients: ingredientsRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };

        if (image) {
            const imageRef = ref(storage, `recipe-images/${v4() + image.name}`);
            try {
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                updatedRecipeFields["imageUrl"] = imageUrl;

                // Delete old image
                const imgRef = ref(storage, recipe.imageUrl);
                await deleteObject(imgRef);
            } catch (err) {
                return setError("Could not upload image. Please try again.");
            }
        }

        try {
            await updateDoc(recipeRef, updatedRecipeFields);
            navigate(`/recipe/details/${recipeId}`);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleImageChange = (ev) => {
        setImage(ev.target.files[0]);
    };

    return (
        <Container className="d-flex flex-column align-items-center">
            <h1 className="mb-4 mt-2">Edit Recipe</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && (
                <Form onSubmit={handleSubmit} className="my-2">
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            ref={titleRef}
                            type="text"
                            placeholder="Recipe Title"
                            defaultValue={recipe.title}
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
                            defaultValue={recipe.ingredients}
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
                            defaultValue={recipe.description}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            aria-label="Select category"
                            required
                            ref={categoryRef}
                        >
                            <option
                                className="category-options"
                                value={recipe.category}
                            >
                                {recipe.category}
                            </option>
                            {CATEGORIES.filter(
                                (c) => c !== recipe.category
                            ).map((category, idx) => {
                                return (
                                    <option key={idx} value={category}>
                                        {category}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Change image"
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Edit recipe
                    </Button>
                </Form>
            )}
        </Container>
    );
};

export default EditRecipePage;
