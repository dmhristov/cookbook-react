import React from "react";
import HomeImage from "../assets/images/Culinary-Hero.jpg";
import Stack from "react-bootstrap/Stack";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    

    return (
        <Stack gap={3}
            className="d-flex flex-column align-items-center justify-content-center"
        >
            <h1 className="text-center">Welcome to COOKBOOK!</h1>
            <h2 className="text-center">Are you ready to get into your culinary dream?</h2>
            <a href="/login" className="btn btn-success">
                Get Started
            </a>
            <img
                src={HomeImage}
                className="HomePage__hero-image rounded"
                alt=""
                // style={{ maxWidth: "1200px" }}
            />
        </Stack>
    );
};

export default HomePage;
