import React, { Fragment, useState } from "react";
import Stack from "react-bootstrap/Stack";
import DashboardNav from "../components/DashboardNav";
import RecipeCard from "../components/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const DashboardPage = () => {
    const [recipes, setRecipes] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    return (
        <Stack gap={4} className="d-flex flex-column">
            {/* <h1>Look at our amazing collection of recipes!</h1> */}
            <DashboardNav></DashboardNav>
            <Container className="flex-grow-1 m-auto">
                <Row className="gap-2">
                    {recipes.map((r) => (
                        <RecipeCard key={r}></RecipeCard>
                    ))}
                </Row>
            </Container>
        </Stack>
    );
};

export default DashboardPage;
