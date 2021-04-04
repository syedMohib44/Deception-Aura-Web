import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Link } from 'react-router-dom';
import { Button, Table } from "react-bootstrap";
import { JWTDATA } from "../utils/auth";
import RegisterByAdmin from "./superadmin/RegisterByAdmin";

const BoardAdmin = () => {

  const userData = JWTDATA()

  const [content, setContent] = useState("");
  const [Businesses, setBusinesses] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [RegisterPage, setRegisterPage] = useState(false);

  //const { id } = match.params;

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    if (page > 1)
      setPage(page - 1);
  }

  const de_activateBusiness = (id, isActive) => {
    const updateObj = {
      id,
      isActive,
    };
    UserService.deactivateBusiness({ ...updateObj }).then(
      (response) => {
        getBusinesses(limit, page);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        //setCampaings(_content);
      })
  }

  const getBusinesses = (limit, page) => {
    UserService.getBusinesses(limit, page).then(
      (response) => {
        console.log(response.data.result.docs);
        setBusinesses(response.data.result.docs);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }

  useEffect(() => {
    getBusinesses(limit, page)
  }, [limit, page]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Deception Aura
        </h3>
      </header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Activate</th>
          </tr>
        </thead>
        {Array.isArray(Businesses) ?
          Businesses.map((Business, i) =>
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <td>{Business.name}</td>
                <td>
                  {Business.isActive ?
                    <Button variant="primary" onClick={() => de_activateBusiness(Business._id, !Business.isActive)}>
                      Deactivate
                </Button> :
                    <Button variant="primary" onClick={() => de_activateBusiness(Business._id, !Business.isActive)}>
                      {Business.isActive}
                  Activate
                      </Button>
                  }
                </td>
              </tr>
            </tbody>
          ) : <h3>No Business Present Add One</h3>
        }
      </Table>
      <div>
        <div onClick={nextPage}> Previous Page </div>
        <div onClick={previousPage}> Next Page </div>
      </div>

      {userData ? [
        <Button variant="primary" onClick={() => setRegisterPage(true)}>
          Add Business
      </Button>,
        (RegisterPage ?
          <RegisterByAdmin
            show={RegisterPage}
            onHide={() => setRegisterPage(false)}
          />
          : null)
      ] : null}
    </div>
  );
};

export default BoardAdmin;
