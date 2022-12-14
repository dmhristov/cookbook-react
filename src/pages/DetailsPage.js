import React, { useState, useEffect, useCallback, useMemo } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Comments from "../components/Comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import { deleteObject, ref } from "firebase/storage";

const DetailsPage = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const currentUserId = currentUser.uid;
    const recipeRef = useMemo(() => doc(db, "recipes", recipeId), [recipeId]);

    const getRecipeData = useCallback(async () => {
        const response = await getDoc(recipeRef);
        const recipeData = response.data();

        if (!response.exists()) {
            setLoading(false);
            return setPageNotFound(true);
        }

        try {
            const authorRef = doc(db, "users", recipeData.authorId);
            const authorResponse = await getDoc(authorRef);
            const authorData = authorResponse.data();
            setRecipe({
                authorNames: `${authorData.firstName} ${authorData.lastName}`,
                ...recipeData,
            });
        } catch (er) {
            console.log(`${er}\nTODO -> handle exceptions`);
        }

        setLoading(false);
    }, [recipeRef]);

    useEffect(() => {
        getRecipeData();
    }, [getRecipeData]);

    const handleLike = async () => {
        if (recipe.likes.includes(currentUserId)) return;

        await updateDoc(recipeRef, {
            likes: arrayUnion(currentUserId),
        });
        getRecipeData();
    };

    const handleModalClose = () => {
        setIsDeleting(false);
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(recipeRef);

            navigate("/dashboard");
        } catch (err) {
            alert("Could not delete recipe.");
        }

        const imgRef = ref(storage, recipe.imageUrl);
        await deleteObject(imgRef);
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
                            {currentUserId === recipe.authorId && (
                                <Container className="d-flex ps-0">
                                    <Button
                                        as="a"
                                        href={`/recipe/edit/${recipeId}`}
                                        className="RecipeDetails__button me-1"
                                        variant="success"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="RecipeDetails__button"
                                        variant="danger"
                                        onClick={() => setIsDeleting(true)}
                                    >
                                        Delete
                                    </Button>
                                </Container>
                            )}
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
                        <div
                            className="flex-grow-1 me-3"
                            style={{ maxWidth: "48rem" }}
                        >
                            <h3 className="mb-3">Description:</h3>
                            <p
                                className="mb-5"
                                style={{ whiteSpace: "pre-wrap" }}
                            >
                                {recipe.description}
                            </p>

                            <Comments />
                        </div>
                        <div className="justify-self-end me-1">
                            <h3 className="mb-3">Ingredients:</h3>
                            <p className="" style={{ whiteSpace: "pre-wrap" }}>
                                {recipe.ingredients}
                            </p>
                        </div>
                    </Container>
                </Stack>
                {isDeleting && (
                    <Modal
                        show={isDeleting}
                        onClose={handleModalClose}
                        recipeTitle={recipe.title}
                        onDelete={handleDelete}
                    ></Modal>
                )}
            </Container>
        )
    );
};

export default DetailsPage;
