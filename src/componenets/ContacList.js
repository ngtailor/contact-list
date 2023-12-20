// ContactList.js
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ContactModal from "./ContactPopUp";
import { deleteContact } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ContactList = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = useSelector((state) => state.contacts);
  const [currentUserContacts, setCurrentUserContacts] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();

  const location = useLocation();
  const { userLogin } = location.state;

  // console.log(contacts);

  function getCurrentData() {
    let list=[]
    contacts.find((ele) => {
      if (ele.createBy === userLogin[0].email) {
        list.push(ele);
      }
    });

    setCurrentUserContacts(list)
  }

  useEffect(() => {
    getCurrentData();
  }, [userLogin,contacts]);

  const handleAddContact = () => {
    setSelectedContact(null);
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleLogout = () => {
    history("/");
  };

  return (
    <div>
      <Button variant="outline-success" onClick={handleAddContact}>
        Add Contact
      </Button>
      <Button   variant="outline-primary" onClick={handleLogout}>
        Logout
      </Button>
      <h4>Hey, {userLogin[0].email} your contact list </h4>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUserContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>
                {" "}
                {contact.image && (
                  <img
                    src={contact.image}
                    alt={`${contact.name}'s avatar`}
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleEditContact(contact)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteContact(contact.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ContactModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        contact={selectedContact || {}}
        currentUser={userLogin}
      />
    </div>
  );
};

export default ContactList;
