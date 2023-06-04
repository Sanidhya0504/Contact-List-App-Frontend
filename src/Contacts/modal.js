import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ContactModal(props) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contact, email } = userDetails;
    if (!name || !contact || !email) {
      return alert("Some Fields Are Empty!");
    } else {
      const res = await fetch(
        `https://contact-list-app-backend-production.up.railway.app/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(userDetails),
        }
      );
      const result = await res.json();
      if (!result.error) {
        setUserDetails({ name: "", email: "", contact: "" });

        props.getcontacts();
      } else {
        console.log(result.error);
      }
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="d-flex justify-content-center align-items-center"
          >
            <Modal.Header closeButton>
              <Modal.Title>Enter Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInput}
                    placeholder="Enter Name"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="contact"
                    value={userDetails.contact}
                    onChange={handleInput}
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInput}
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    variant="secondary"
                    onClick={handleClose}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        <Button variant="info" onClick={handleShow}>
          Create Contact
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ContactModal);
