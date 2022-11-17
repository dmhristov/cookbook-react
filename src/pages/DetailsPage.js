import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import loginImage from "../assets/images/login_image.jpg";
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
                authorNames: `${authorData.data().firstName} ${authorData.data().lastName}`,
                ...recipeData.data(),
            });
            setLoading(false);
        };
        getRecipeById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // TODO -> add page not found
    return ( !loading &&
        <Container className="d-flex align-items-center align-self-start mt-5">
            
            <Stack
                gap={2}
                className="d-flex flex-column align-self-start justify-content-center"
                style={{ maxWidth: "52rem" }}
            >
                <img
                    className="rounded mb-2"
                    style={{ width: "48rem", height: "28rem" }}
                    src={recipe.imageUrl}
                    alt="recipe"
                ></img>
                <Comments />
            </Stack>
            <Stack gap={2} className="ms-2" style={{ maxWidth: "26rem" }}>
                <div>
                    <h2 className="mb-3">{recipe.title}</h2>
                    <p>Author Name: <Link className="fw-bold text-decoration-none text-primary" to="/">{recipe.authorNames}</Link></p>
                    <p>From: {recipe.date.toDate().toLocaleDateString()}</p>
                    {/* TODO -> refactor db and implement likes */}
                    <p>
                        Likes:
                        {}
                    </p>
                </div>
                <div>
                    <h3 className="mb-3">Ingredients:</h3>
                    <p style={{whiteSpace: "pre-wrap"}}>{recipe.ingredients}</p>
                </div>
                <div>
                    <h3 className="mb-3">Description</h3>
                    <p style={{whiteSpace: "pre-wrap"}}>{recipe.description}</p>
                </div>
            </Stack>
        </Container>
    );
};

export default DetailsPage;
