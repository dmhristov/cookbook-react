import React, { Fragment, useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import DashboardNav from "../components/DashboardNav";
import RecipeCard from "../components/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const DashboardPage = () => {
    const [recipes, setRecipes] = useState([]);
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
    }, []);

    return (
        <Stack gap={4} className="d-flex flex-column">
            {/* <h1>Look at our amazing collection of recipes!</h1> */}
            <DashboardNav></DashboardNav>
            <Container className="flex-grow-1 m-auto">
                <Row className="gap-2">
                    {recipes.map((r) => (
                        <RecipeCard
                            key={r.id}
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
