import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import loginImage from "../assets/images/login_image.jpg";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
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
            <Stack gap={2} className="ms-4">
                <div>
                    <h2>{recipe.title}</h2>
                    <p>Author Name: {recipe.authorNames}</p>
                    <p>From: {recipe.date.toDate().toLocaleDateString()}</p>
                    {/* TODO -> refactor db and implement likes */}
                    <div>
                        Likes:
                        {}
                    </div>
                </div>
                <div>
                    <h3>Ingredients:</h3>
                    <span>{recipe.ingredients}</span>
                </div>
                <div>
                    <h3>Description</h3>
                    <span>{recipe.description}</span>
                </div>
            </Stack>
        </Container>
    );
};

export default DetailsPage;
