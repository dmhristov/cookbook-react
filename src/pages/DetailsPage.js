import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Comments from "../components/Comments";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const DetailsPage = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecipeById = async () => {
            const recipeRef = doc(db, "recipes", recipeId);
            const recipeData = await getDoc(recipeRef);

            if (!recipeData.exists()) {
                setLoading(false);
                return setPageNotFound(true);
            }

            const authorRef = doc(db, "users", recipeData.data().authorId);
            const authorData = await getDoc(authorRef);

            setRecipe({
                authorNames: `${authorData.data().firstName} ${
                    authorData.data().lastName
                }`,
                ...recipeData.data(),
            });
            setLoading(false);
        };
        getRecipeById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                           
                        </div>
                         {/* TODO -> implement likes */}
                        <p>
                            Likes:
                            {}
                        </p>
                    </Container>
                    <hr className="my-2 border-3 border-top border-success"></hr>
                    <Container className="d-flex justify-content-between">
                        
                        <div className="" style={{maxWidth: "48rem"}}>
                            <h3 className="me-3 mb-3">Description:</h3>
                            <p className="mb-5" style={{ whiteSpace: "pre-wrap" }}>
                                {recipe.description}
                            </p>
                            
                            <Comments />
                        </div>
                        <div className="justify-self-end">
                            <h3 className="mb-3">Ingredients:</h3>
                            <p style={{ whiteSpace: "pre-wrap" }}>
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
