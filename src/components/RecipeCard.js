import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card style={{ width: "20rem", height: "24rem" }}>
            <Card.Img
                variant="top"
                src={imageUrl}
                style={{ height: "11rem" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="flex-grow-1">{title}</Card.Title>
                <div className="">
                    <div>
                        <p className="mb-0">Author: <Link className="fw-bold text-decoration-none text-primary" to="/">{authorNames}</Link></p>
                        <p className="text-muted">From: {fromDate}</p>
                    </div>
                </div>
                <Button
                    as="a"
                    href={`/details/${recipeId}`}
                    variant="primary"
                    style={{ maxWidth: "16rem" }}
                >
                    Recipe details
                </Button>
            </Card.Body>
        </Card>
    );
};

export default RecipeCard;
