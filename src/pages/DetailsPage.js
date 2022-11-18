import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Comments from "../components/Comments";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const DetailsPage = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const currentUserId = currentUser.uid;
    const recipeRef = doc(db, "recipes", recipeId);

    const getRecipeData = async () => {
        const response = await getDoc(recipeRef);
        const recipeData = response.data();

        if (!response.exists()) {
            setLoading(false);
            return setPageNotFound(true);
        }

        const authorRef = doc(db, "users", recipeData.authorId);
        const authorResponse = await getDoc(authorRef);
        const authorData = authorResponse.data();

        setRecipe({
            authorNames: `${authorData.firstName} ${
                authorData.lastName
            }`,
            ...recipeData,
        });
        
        setLoading(false);
    };

    useEffect(() => {
        getRecipeData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = async () => {
        if (recipe.likes.includes(currentUserId)) return;

        await updateDoc(recipeRef, {
            likes: arrayUnion(currentUserId),
        });
        getRecipeData();
    };

    // TODO -> add page not found
    return (
        !loading && (
            <Container className="d-flex align-items-center align-self-start mt-3 flex-column">
                <Stack
                    gap={2}
                    className="d-flex flex-column align-self-center justify-content-center"
                >
                    <img
                        className="rounded mb-2"
                        src={recipe.imageUrl}
                        alt="recipe"
                    ></img>
                    <Container className="d-flex justify-content-between">
                        <div>
                            <h2 className="mb-3">{recipe.title}</h2>
                            <p>
                                Author Name:{" "}
                                <Link
                                    className="fw-bold text-decoration-none text-success"
                                    to="/"
                                >
                                    {recipe.authorNames}
                                </Link>
                            </p>
                            <p className="text-muted">
                                From:{" "}
                                {recipe.date.toDate().toLocaleDateString()}
                            </p>
                            <Container className="d-flex ps-0">
                                <Button
                                    as="a"
                                    href={`/recipe/edit/${recipeId}`}
                                    className="RecipeDetails__button me-1"
                                    variant="success"
                                    
                                >
                                    Edit
                                </Button>
                                <Button className="RecipeDetails__button" variant="danger">
                                    Delete
                                </Button>
                            </Container>
                        </div>
                        <p className="mt-1">
                            {recipe.likes.length}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#f03e3e"
                                className="DetailsPage__like-icon bi bi-heart-fill ms-1"
                                viewBox="0 0 16 16"
                                onClick={handleLike}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                />
                            </svg>
                        </p>
                    </Container>
                    <hr className="my-2 border-3 border-top border-success"></hr>
                    <Container className="d-flex justify-content-between">
                        <div className="" style={{ maxWidth: "48rem" }}>
                            <h3 className="me-3 mb-3">Description:</h3>
                            <p
                                className="mb-5"
                                style={{ whiteSpace: "pre-wrap" }}
                            >
                                {recipe.description}
                            </p>

                            <Comments />
                        </div>
                        <div className="justify-self-end">
                            <h3 className="mb-3">Ingredients:</h3>
                            <p className="" style={{ whiteSpace: "pre-wrap" }}>
                                {recipe.ingredients}
                            </p>
                        </div>
                    </Container>
                </Stack>
            </Container>
        )
    );
};

export default DetailsPage;
