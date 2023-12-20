import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

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

    setErrors(newErrors);
    return isValid;
  };
  const addData = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const storedUserData = localStorage.getItem("userData");
      const userData = storedUserData ? JSON.parse(storedUserData) : [];

      const { email, password } = inputValue;

      console.log(userData);

      const userLogin = userData.filter(
        (user) => user.email === email && user.password === password
      );

      if (userLogin.length > 0) {
        console.log("User logged in successfully");

        // Assuming you want to generate a new random ID for the logged-in user
        const randomId = Math.floor(Math.random() * 1000000);

        // Set the random ID on the first user found in the array
        userLogin[0].id = randomId;

        // Store the modified user data back in local storage
        localStorage.setItem("userData", JSON.stringify(userData));

        console.log("Random ID saved successfully");
        history("/list", {
          state: {
            userLogin,
          },
        }); // Redirect to dashboard or any authenticated page
      } else {
        setErrors({
          email: "Invalid credentials",
          password: "",
        });
      }
    }
  };

  return (
    <div className="container mt-3">
      <section>
        <div className="left-data">
          <h3 className="text-center col-lg-6">SignIn </h3>
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

            <Button variant="primary" type="submit" onClick={addData}>
              Submit
            </Button>
          </Form>
          <Link to="/">
            {" "}
            <p className="mt-3"> have not acount? SignUp</p>
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

export default SignIn;
