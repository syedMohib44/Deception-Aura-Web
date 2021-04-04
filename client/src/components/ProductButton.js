import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { JWTDATA } from '../utils/auth';
import { postProduct } from "../actions/post";

// const required = (value) => {
//     if (!value) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 This field is required!
//             </div>
//         );
//     }
// };

const Product = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangePrice = (e) => {
        const price = e.target.value;
        setPrice(price);
    };

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const handleProduct = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(postProduct(name, price, JWTDATA().business._id))
                .then(() => {
                    console.log(name, price, JWTDATA().business._id);
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Product
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12">
                    <div className="card card-container">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <Form onSubmit={handleProduct} ref={form}>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="Product Name">Product Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={name}
                                            onChange={onChangeName}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Product Price">Product Price</label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={price}
                                            onChange={onChangePrice}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Add Product</button>
                                    </div>
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default Product;
