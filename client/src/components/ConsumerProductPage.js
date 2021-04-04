/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Table } from "react-bootstrap";
import UserService from "../services/user.service";
//import Product from './ProductButton';
import Ratings from './Ratings';
import { JWTDATA } from '../utils/auth';

const ConsumerProduct = ({ match }) => {
  const userData = JWTDATA()
  const [Products, setProducts] = useState([]);
  const [ProductPage, setProductPage] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    if (page > 1)
      setPage(page - 1);
  }
  const { id, name } = match.params;
  useEffect(() => {
    UserService.getProductsConsumer(limit, page, id).then(
      (response) => {
        setProducts(response.data.result.docs);
      },
      (error) => {
        console.log(error);
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setProducts(_content);
      }
    );
  }, [limit, page, id]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          {name}
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
        {Array.isArray(Products) ?
          Products.map((Product, i) =>
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <Link to={`/product/${Product._id}`}>
                  <td>{Product.name}</td>
                </Link>
                <td>Rs: {Product.price}</td>
                <td>
                  <div>
                    {Product.rating}
                  </div>
                  <div>
                    <Ratings productObj={Product} businessId={id} businessName={name} />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : <h3>No Product Present Add One</h3>
        }
      </Table>
      <div>
        <div onClick={nextPage}> Previous Page </div>
        <div onClick={previousPage}> Next Page </div>
      </div>

      {/* {userData ? [
        <Button variant="primary" onClick={() => setProductPage(true)}>
          Add Product
      </Button>,
        (ProductPage ?
          <Product
            show={ProductPage}
            onHide={() => setProductPage(false)}
          />
          : null)
      ] : null} */}
    </div>

  );
};

export default ConsumerProduct;
/* eslint-disable no-unused-vars */