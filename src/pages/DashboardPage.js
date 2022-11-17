import React, { Fragment, useEffect, useState } from "react";
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
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const recipesCollectionRef = collection(db, "recipes");

    useEffect(() => {
        const getRecipes = async () => {
            const response = await getDocs(recipesCollectionRef);
            const data = response.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setRecipes(data);
        };
        getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterByCategory = (currentCategory) => {
        setFilteredRecipes(
            recipes.filter((r) => r.category === currentCategory)
        );
        setIsFiltering(true);
    };

    const resetFilter = () => {
        setIsFiltering(false);
    };

    const handleSearch = (data) => {
        setFilteredRecipes(
            recipes.filter((r) =>
                r.title.toLowerCase().includes(data.toLowerCase())
            )
        );
        setIsFiltering(true);
    };

    return (
        <Stack gap={4} className="d-flex flex-column">
            <DashboardNav
                categories={CATEGORIES}
                filterCategory={filterByCategory}
                onSearch={handleSearch}
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
