import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";
import ContactModal from "./modal";
import EditModal from "./edit";

function Display() {
  const [contacts, setContacts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchInput, setSearchInput] = useState("");

  const getcontacts = async () => {
    try {
      const res = fetch(`http://localhost:5000/api/mycontacts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setContacts(result.contacts);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getcontacts();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("are you sure you want to delete this contact ?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);

          setShowModal(false);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setContacts(newSearchUser);
  };

  return (
    // <div>
    //   <Contactlist contacts={contacts} />
    // </div>
    <>
      <ContactModal getcontacts={getcontacts} />
      <div className="d-sm-flex flex-column justify-content-center align-items-center">
        <div className="d-sm-w-100 w-75">
          <hr className="my-4" />
          {loading ? (
            <Spinner splash="Loading Contacts..." />
          ) : (
            <>
              {contacts.length == 0 ? (
                <h3>No contacts created yet</h3>
              ) : (
                <>
                  <form className="d-flex" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      name="searchInput"
                      id="searchInput"
                      className="form-control my-2"
                      placeholder="Search Contact"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-info mx-2">
                      Search
                    </button>
                  </form>

                  <p>
                    Your Total Contacts: <strong>{contacts.length}</strong>
                  </p>
                  <table className="table table-hover">
                    <thead>
                      <tr className="table-dark">
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr
                          key={contact._id}
                          onClick={() => {
                            setModalData({});
                            setModalData(contact);
                            setShowModal(true);
                          }}
                        >
                          <th scope="row">{contact.name}</th>
                          <td>{contact.email}</td>
                          <td>{contact.contact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="px-2 d-flex justify-content-center align-items-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.contact}
          </p>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <EditModal id={modalData} getcontacts={getcontacts} />
          <button
            className="btn btn-info"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button className="btn btn-info" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Display;
