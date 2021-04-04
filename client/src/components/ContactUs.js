/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const ContactUs = () => {
  return (
    <div className="container">
       <form id="contact-form" >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp"/>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" rows="5"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
}

export default ContactUs;
/* eslint-disable no-unused-vars */