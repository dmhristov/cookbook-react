import React, { Fragment, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DemoPage = () => {
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");
    const [image, setImage] = useState(null);
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const response = await getDocs(userCollectionRef);
            const data = response.docs[0].data();

            setUsers((prev) => [...prev, data]);

            setLoading(false);
        };
        getUsers();
    }, [userCollectionRef]);

    const handleImageUpload = (ev) => {
        setImage(ev.target.files[0]);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        // Create a reference to the storage --> upload the image --> get an image Url
        const imageRef = ref(storage, `profile-images/${v4() + image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        // setImageUrl(imageUrl);

        // Get the user by id --> update image_url field with the new image url
        const userDoc = doc(db, "users", currentUser.uid);
        const updatedImageUrlField = { image_url: imageUrl };
        await updateDoc(userDoc, updatedImageUrlField);
        
        navigate("/")
    };

    return (
        <Container
            className="d-flex flex-column align-items-center"
            style={{ maxWidth: "400px" }}
        >
            <Fragment>
                <Form onSubmit={handleSubmit} className="my-2">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Upload image</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            placeholder="upload"
                            onChange={handleImageUpload}
                        />
                    </Form.Group>
                    <Button disabled="" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {!loading && (
                    <div>
                        <p>
                            Current user: {users[0].firstName}{" "}
                            {users[0].lastName}
                        </p>
                        <img src={users[0].image_url} alt="someImg" />
                    </div>
                )}
            </Fragment>
        </Container>
    );
};

export default DemoPage;
