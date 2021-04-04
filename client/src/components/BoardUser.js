import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardUser = () => {
  const [products, setProducts] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setProducts(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
      {products ?
          products.map(product => {
            return <h3>{product}</h3>;
          }) :
          <h3>No Product available please add one.</h3>
        }
      </header>
    </div>
  );
};

export default BoardUser;
