import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const RecipeCard = (props) => {
    return (
        <Card style={{ width: "20rem", height: "23rem" }}>
            <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/cookbook-ac1d9.appspot.com/o/profile-images%2Flogin_image.jpg?alt=media&token=8a9f8ce7-3cbb-47e7-9c91-14cc4a67961f"
            />
            <Card.Body>
                <Card.Title>Recipe title</Card.Title>
                <div>
                    <div>
                        <p>Author: Author Name</p>
                        <p>From: 28/10/2022</p>
                    </div>
                </div>
                <Button variant="primary">Recipe details</Button>
            </Card.Body>
        </Card>
    );
};

export default RecipeCard;
