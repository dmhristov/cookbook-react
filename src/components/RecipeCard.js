import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { db } from "../firebase";

const RecipeCard = ({ title, fromDate, imageUrl, authorId, recipeId }) => {
    const [authorNames, setAuthorNames] = useState("");

    useEffect(() => {
        const getAuthorNames = async () => {
            const response = await getDoc(doc(db, "users", authorId));
            const authorData = response.data();
            setAuthorNames(`${authorData.firstName} ${authorData.lastName}`);
        };
        getAuthorNames();
    }, []);

    return (
        <Card style={{ width: "20rem", height: "23rem" }}>
            <Card.Img
                variant="top"
                src={imageUrl}
                style={{ height: "11.5rem" }}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div>
                    <div>
                        <p>Author: {authorNames}</p>
                        <p>From: {fromDate}</p>
                    </div>
                </div>
                <Button as="a" href={`/details/${recipeId}`} variant="primary">Recipe details</Button>
            </Card.Body>
        </Card>
    );
};

export default RecipeCard;
