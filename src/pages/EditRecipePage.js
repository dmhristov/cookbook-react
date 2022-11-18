import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { CATEGORIES } from "../constants/constants";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const EditRecipePage = () => {
    const [image, setImage] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef();
    const ingredientsRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const recipeRef = doc(db, "recipes", recipeId);

    const getRecipeData = async () => {
        const response = await getDoc(recipeRef);
        const recipeData = response.data();

        if (!response.exists()) {
            setLoading(false);
            return setPageNotFound(true);
        }

        setRecipe(recipeData);
        setLoading(false);
    };

    useEffect(() => {
        getRecipeData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //TODO -> add functionality to edit recipe and delete old image if changed
    const handleSubmit = async (ev) => {

        // ev.preventDefault();
        // const imgRef = ref(storage, recipe.imageUrl);
        // const response = await deleteObject(imgRef);
    };

    const handleImageChange = (ev) => {
        setImage(ev.target.files[0]);
    };

    return (
        <Container className="d-flex flex-column align-items-center">
            <h1 className="mb-4 mt-2">Edit Recipe</h1>
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
                            <option className="category-options" value={recipe.category}>
                                {recipe.category}
                            </option>
                            {CATEGORIES.filter(c => c !== recipe.category).map((category, idx) => {
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
