import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { postCampaing } from "../actions/post";

const Campaing = (props) => {
    const { productId } = props;
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [modelFiles, setModelFiles] = useState([]);
    const [textureFiles, setTextureFiles] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [miscFiles, setMiscFiles] = useState([]);

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeModelFiles = (e) => {
        const file = e.target.files;
        setModelFiles(file);
    }
    const onChangeTextureFiles = (e) => {
        const file = e.target.files;
        setTextureFiles(file);
    }
    const onChangeImageFiles = (e) => {
        const file = e.target.files;
        setImageFiles(file);
    }
    const onChangeMiscFiles = (e) => {
        const file = e.target.files;
        setMiscFiles(file);
    }

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
            const formData = new FormData();
            formData.append("name", name);
            formData.append("productId", productId);
            formData.append("models", modelFiles)
            formData.append("textures", textureFiles)
            formData.append("images", imageFiles)
            formData.append("misc", miscFiles)

            dispatch(postCampaing(formData))
                .then(() => {
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
                    Add Campaing
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
                                        <label htmlFor="Campaing Name">Product Name</label>
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
                                        <Input
                                            type="file"
                                            multiple
                                            name="modelFiles"
                                            onChange={onChangeModelFiles}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Input
                                            type="file"
                                            multiple
                                            name="textureFiles"                                            
                                            onChange={onChangeTextureFiles}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Input
                                            type="file"
                                            multiple
                                            name="imageFiles"
                                            onChange={onChangeImageFiles}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Input
                                            type="file"
                                            multiple
                                            name="miscFiles"
                                            onChange={onChangeMiscFiles}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Add Campaing</button>
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
export default Campaing;
