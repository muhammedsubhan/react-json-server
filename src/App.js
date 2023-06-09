import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Navbar,
} from "react-bootstrap";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const api = "http://localhost:8000/users";

const App = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const { name, email, contact, address } = state;

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/users");
    const resData = await response.json();
    setData(resData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !address) {
      toast.error("Please Fill All The Fields");
    } else {
      await fetch("http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          address: address,
          contact: contact,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // axios.post("http://localhost:8000/users", state);
      toast.success("Added in Json Server");
      setState({
        name: "",
        email: "",
        address: "",
        contact: "",
      });
      setTimeout(() => {
        fetchData();
      }, 500);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    toast.success("Successfully Deleted");
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  return (
    <>
      <ToastContainer />
      <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand>React App With JSON Server</Navbar.Brand>
      </Navbar>

      <Container style={{ marginTop: "70px" }}>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email..."
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact No."
                  name="contact"
                  value={contact}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address..."
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-2">
                <Button type="submit" variant="primary" size="lg">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data &&
                data.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.address}</td>
                        <td>
                          <ButtonGroup>
                            <Button
                              style={{ marginTop: "5px", marginRight: "5px" }}
                              variant="secondary"
                            >
                              Update
                            </Button>

                            <Button
                              style={{ marginTop: "5px" }}
                              variant="danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
