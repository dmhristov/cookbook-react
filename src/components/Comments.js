import React from "react";
import loginImage from "../assets/images/login_image.jpg";

const Comments = () => {
    return (
        <div style={{ maxWidth: "48rem" }} >
            <div
                className="d-flex flex-column comment-section"
                
            >
                <div className="p-2">
                    <form>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <img
                                className="rounded-circle"
                                src={loginImage}
                                width="40"
                                height="40"
                                alt="comments profile"
                            />
                            <input
                                className="form-control ms-1 shadow-none textarea"
                                style={{ height: "60px" }}
                                placeholder="Enter your comment here..."
                            ></input>
                        </div>
                        <div className="mt-2 text-right">
                            <button
                                className="btn btn-primary btn-sm shadow-none"
                                type="submit"
                            >
                                Add comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-white p-2" >
                <hr />
                <div className="d-flex flex-row user-info">
                    <img
                        className="rounded-circle me-1"
                        src={loginImage}
                        width="40"
                        height="40"
                        alt=""
                    />
                    <div className="d-flex flex-column justify-content-start ml-2">
                        <a
                            href="/"
                            className="fw-bold text-xl-left text-decoration-none"
                            style={{ color: "#343a40" }}
                        >
                            Denislav Hristov
                        </a>
                        <span className="date text-black-50">11/10/2022</span>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="comment-text">This is random comment text</p>
                </div>

                <ul style={{ listStyle: "none" }}>
                    <hr />
                    <li>
                        <div className="d-flex flex-row user-info ">
                            <img
                                className="rounded-circle me-1"
                                src={loginImage}
                                width="40"
                                height="40"
                                alt=""
                            />
                            <div className="d-flex flex-column justify-content-start ml-2">
                                <a
                                    href="/"
                                    className="fs-6 fw-bold text-xl-left text-decoration-none"
                                    style={{ color: "#343a40" }}
                                >
                                    Denislav Hristov
                                </a>
                                <span className="date text-black-50">
                                    11/10/2022
                                </span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="comment-text">
                                This is some reply text
                            </p>
                        </div>
                    </li>
                </ul>

                <ul style={{ listStyle: "none" }}>
                    <li>
                        <div className="p-2">
                            <form>
                                <div className="d-flex flex-row justify-content-center align-items-center">
                                    <img
                                        className="rounded-circle"
                                        src={loginImage}
                                        width="40"
                                        height="40"
                                        alt=""
                                    />
                                    <input
                                        className="form-control ms-1 shadow-none textarea"
                                        style={{ height: "60px" }}
                                        placeholder="Enter your reply here..."
                                    ></input>
                                </div>
                                <div className="mt-2 text-right">
                                    <button
                                        className="btn btn-primary btn-sm shadow-none"
                                        type="submit"
                                    >
                                        Add reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Comments;
