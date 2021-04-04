import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong></strong> Profile
        </h3>
      </header>
      <p>
        {/* <strong>Token:</strong> {currentUser} */}

      </p>
    </div>
  );
};

export default Profile;
