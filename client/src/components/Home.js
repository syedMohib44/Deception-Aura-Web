/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Table } from "react-bootstrap";
import UserService from "../services/user.service";
import Campaings from './Campaings';
import Product from './ProductButton';
import Ratings from './Ratings';
import { JWTDATA } from '../utils/auth';

const Home = () => {
  const userData = JWTDATA()
  console.log(userData);
  const [products, setProducts] = useState([]);
  const [productPage, setProductPage] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    if (page > 1)
      setPage(page - 1);
  }
  // useEffect(() => {
  // }, [skip, limit])

  // fetchUsers(limit, skip)

  useEffect(() => {
    UserService.getProducts(limit, page, userData.business._id).then(
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
  }, [limit, page, userData.business._id]);
  console.log(process.env);
  return (
    <div className="container">
      <header className="jumbotron">
        <img src={require(`${process.env.REACT_APP_FILES}${userData.profilePic}`)} alt="" />

        {/* <img src={require('./public/qrCode-images/Developers void/605cfbadd83b1c2b1078f09a.png')} /> */}

        <h3>
          {userData.business.name}
        </h3>
      </header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        {Array.isArray(products) ?
          products.map((product, i) =>
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <Link to={`/campaing/${product._id}`}>
                  <td>{product.name}</td>
                </Link>
                <td>Rs: {product.price}</td>
                <td>
                  <div>
                    {product.rating}
                  </div>
                  <div>
                    <Ratings />
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

      {userData ? [
        <Button variant="primary" onClick={() => setProductPage(true)}>
          Add Product
      </Button>,
        (productPage ?
          <Product
            show={productPage}
            onHide={() => setProductPage(false)}
            businessName={userData.business.name}
          />
          : null)
      ] : null}
    </div>

  );
};

export default Home;
/* eslint-disable no-unused-vars */