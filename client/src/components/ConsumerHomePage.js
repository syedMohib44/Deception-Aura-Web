/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table } from "react-bootstrap";
import UserService from "../services/user.service";
//import Business from './BusinessButton';
import Ratings from './Ratings';
import { JWTDATA } from '../utils/auth';

const ConsumerHome = () => {
  const userData = JWTDATA()
  const [Businesses, setBusinesses] = useState([]);
  const [BusinessPage, setBusinessPage] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    if (page > 1)
      setPage(page - 1);
  }

  useEffect(() => {
    UserService.getBusinesses(limit, page).then(
      (response) => {
        setBusinesses(response.data.result.docs);
      },
      (error) => {
        console.log(error);
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setBusinesses(_content);
      }
    );
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
            <th>Price</th>
            <th>Ratings</th>
          </tr>
        </thead>
        {Array.isArray(Businesses) ?
          Businesses.map((Business, i) =>
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <Link to={`/business/${Business.name}/${Business._id}`}>
                  <td>{Business.name}</td>
                </Link>
                <td>Rs: {Business.price}</td>
                <td>
                  <div>
                    {Business.rating}
                  </div>
                  <div>
                    <Ratings />
                  </div>
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

      {/* {userData ? [
        <Button variant="primary" onClick={() => setBusinessPage(true)}>
          Add Business
      </Button>,
        (BusinessPage ?
          <Business
            show={BusinessPage}
            onHide={() => setBusinessPage(false)}
          />
          : null)
      ] : null} */}
    </div>

  );
};

export default ConsumerHome;
/* eslint-disable no-unused-vars */