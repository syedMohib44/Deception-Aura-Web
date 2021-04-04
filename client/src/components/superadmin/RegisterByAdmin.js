import React from "react";
import { Modal, Button } from "react-bootstrap";
import Register from '../Register';


const RegisterByAdmin = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Register Business
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Register />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterByAdmin;
