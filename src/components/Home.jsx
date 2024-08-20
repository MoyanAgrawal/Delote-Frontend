import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../assets/css/Home.css";
import axios from "axios";

function Home() {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0();
// console.log(user);
  async function saveUserToDatabase() {
    const token = await getAccessTokenSilently();
    console.log(token);
    try {
      const res = await axios.post(
        "https://delotebackend.onrender.com/api/api/users",
        {
          auth0_id: user.sub,
          email: user.email,
          name: user.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ``,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      // Call your backend API to store user in MongoDB
      saveUserToDatabase(user);
    }
  }, [isAuthenticated]);


  if (isLoading) {
    return <>Loading...</>;
  }


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Delote Assignment</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex justify-space-between">
              {isAuthenticated ? (
                <div>
                  {user.nickname}
                  <img className="image" src={user.picture} />
                </div>
              ) : null}
              {isAuthenticated ? (
                <Button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </Button>
              ) : (
                <Button onClick={() => loginWithRedirect()}>Log In</Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mainContent mt">Welcome to the Main Page</div>
      {isAuthenticated ? (
        <div className="mainContent">Click "Log out" to logout</div>
      ) : (
        <div className="mainContent">Click "Log In" to login</div>
      )}
      {/* <button onClick={callApi}>Click me for access token</button> */}
    </>
  );
}

export default Home;
