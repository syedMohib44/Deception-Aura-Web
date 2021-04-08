import React, { useState, useEffect } from "react";
import { JWTDATA } from '../utils/auth';
import { Button, Table } from "react-bootstrap";
import Campaing from './CampaingButton';
import UserService from "../services/user.service";
import { Redirect } from "react-router";

const Campaings = ({ match }) => {

  const userData = JWTDATA()
  const [campaings, setCampaings] = useState([]);
  const [campaingPage, setCampaingPage] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { id } = match.params;

  const nextPage = () => {
    setPage(page + 1)
  }

  const activateCampaing = (campaingObj, isActive) => {
    const updateObj = {
      _id: campaingObj._id,
      isActive: isActive,
      product: campaingObj.product,
      name: campaingObj.name
    };
    UserService.putCampaing(updateObj).then(
      (response) => {
        getCampaings(limit, page, id);
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

  const previousPage = () => {
    if (page > 1)
      setPage(page - 1);
  }

  const getCampaings = (limit, page, id) => {
    UserService.getCampaings(limit, page, id).then(
      (response) => {
        console.log(response.data.result);
        setCampaings(response.data.result.docs);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setCampaings(_content);
      }
    );
  }

  useEffect(() => {
    getCampaings(limit, page, id);
  }, [limit, page, id]);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          {userData.business.name}
        </h3>
      </header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Qr Code</th>
            <th>Active</th>
          </tr>
        </thead>
        {Array.isArray(campaings) ?
          campaings.map((campaing, i) =>
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <td>{campaing.name}</td>
                <td>
                  <img src={require(`../${campaing.qrCode}`)} alt='' />
                </td>
                <td>
                  {campaing.isActive ?
                    <Button variant="primary" onClick={() => activateCampaing(campaing, !campaing.isActive)}>
                      Deactivate
                </Button> :
                    <Button variant="primary" onClick={() => activateCampaing(campaing, !campaing.isActive)}>
                      {campaing.isActive}
                  Activate
                      </Button>
                  }
                </td>
              </tr>
            </tbody>
          ) : <h3>No campaing Present Add One</h3>
        }
      </Table>
      <div>
        <div onClick={nextPage}> Previous Page </div>
        <div onClick={previousPage}> Next Page </div>
      </div>

      {userData ? [
        <Button variant="primary" onClick={() => setCampaingPage(true)}>
          Add campaing
      </Button>,
        (campaingPage ?
          <Campaing
            show={campaingPage}
            productId={id}
            onHide={() => setCampaingPage(false)}
          />
          : null)
      ] : null}
    </div>

  );
};

export default Campaings;
