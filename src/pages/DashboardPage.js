import React, { useEffect, useState, useReducer, useMemo } from "react";
import Stack from "react-bootstrap/Stack";
import DashboardNav from "../components/DashboardNav";
import RecipeCard from "../components/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { CATEGORIES } from "../constants/constants";

const DashboardPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const recipesCollectionRef = useMemo(() => collection(db, "recipes"), []);

    const [filteredRecipes, dispatch] = useReducer((state, action) => {
        setIsFiltering(true);

        switch (action.type) {
            case "FILTER":
                return recipes.filter((r) => r.category === action.payload);
            case "SEARCH":
                return recipes.filter((r) =>
                    r.title.toLowerCase().includes(action.payload.toLowerCase())
                );
            default:
                return state;
        }
    }, []);

    useEffect(() => {
        const getRecipes = async () => {
            const response = await getDocs(recipesCollectionRef);
            const data = response.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setRecipes(data);
        };
        getRecipes();
    }, [recipesCollectionRef]);

    const resetFilter = () => {
        setIsFiltering(false);
    };

    return (
        <Stack gap={4} className="d-flex flex-column">
            <DashboardNav
                categories={CATEGORIES}
                dispatch={dispatch}
                resetFilter={resetFilter}
            ></DashboardNav>
            <Container className="flex-grow-1 m-auto">
                <Row className="gap-2 justify-content-center">
                    {(!isFiltering ? recipes : filteredRecipes).map((r) => (
                        <RecipeCard
                            key={r.id}
                            recipeId={r.id}
                            imageUrl={r.imageUrl}
                            title={r.title}
                            fromDate={r.date.toDate().toLocaleDateString()}
                            authorId={r.authorId}
                        ></RecipeCard>
                    ))}
                </Row>
            </Container>
        </Stack>
    );
};

export default DashboardPage;
