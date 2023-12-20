// ContactModal.js
import React, { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../redux/action';

const ContactPopUp = ({ show, handleClose, contact,currentUser }) => {
  const [formData, setFormData] = useState(contact);
  const [imageFile, setImageFile] = useState(null);
  const [userId,setUserId]=useState(currentUser[0].email)
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(contact);
    setUserId(currentUser[0].email)
  }, [contact,currentUser[0].email]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };


  const handleSaveClick = () => {
    const formDataWithImage = {
      ...formData,
      image: imageFile ? URL.createObjectURL(imageFile) : null
    };

    if (contact.id) {
      dispatch(editContact(formDataWithImage));
    } else {
      dispatch(addContact({ ...formDataWithImage, id: new Date().getTime(), createBy:userId }));
    }

    handleClose();
  };

 

 

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{contact.id ? 'Edit Contact' : 'Add Contact'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSaveClick}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default ContactPopUp;
