import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";

const Modal = (props) => {
    const [show, setShow] = useState(props.show);

    const handleClose = () => {
        props.onClose();
        setShow(false);
    };

    const handleDelete = () => {
        props.onDelete();
    };

    return (
        <BootstrapModal show={show} onHide={handleClose} centered>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>Delete recipe</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                Are you sure you want to delete recipe {props.recipeTitle}?
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;
