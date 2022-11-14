import React from "react";
import Stack from "react-bootstrap/Stack";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = (props) => {
    return (
        <Stack className="flex-grow-1">
            <Navigation />
            <main className="flex-grow-1 d-flex justify-content-center align-items-center">
                {props.children}
            </main>
            <Footer />
        </Stack>
    );
};

export default Layout;