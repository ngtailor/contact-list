import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getData = (e) => {
    const { value, name } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputValue.email.trim()) {
      newErrors.email = "Please enter your email.";
      isValid = false;
    } else if (!emailPattern.test(inputValue.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!inputValue.password.trim()) {
      newErrors.password = "Please enter your password.";
      isValid = false;
    }

    // Confirm Password validation
    if (!inputValue.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (inputValue.password !== inputValue.confirmPassword) {
      newErrors.confirmPassword = "Password and Confirm Password do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addData = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Save data to local storage or send to the server
      const existUserData = localStorage.getItem("userData");
      const userData = existUserData ? JSON.parse(existUserData) : [];

      // Ensure that userData is an array before spreading its elements
      const newValue = Array.isArray(userData)
        ? [...userData, inputValue]
        : [inputValue];

      localStorage.setItem("userData", JSON.stringify(newValue));

      console.log("USER SIGNUP");
      history("/signin");
    }
  };

  return (
    <div className="container mt-3">
      <section>
        <div className="left-data">
          <h3 className="text-center col-lg-6">SignUp </h3>
          <Form>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={getData}
                value={inputValue.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={getData}
                value={inputValue.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 col-lg-6"
              controlId="formBasicConfirmPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={getData}
                value={inputValue.confirmPassword}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={addData}>
              Submit
            </Button>
          </Form>
          <Link to="/signin">
            <p className="mt-3">Already have an account? SignIn</p>
          </Link>
        </div>

        <div className="right-data">
          <div className="sign-img">
            <img src="../login.avif" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
