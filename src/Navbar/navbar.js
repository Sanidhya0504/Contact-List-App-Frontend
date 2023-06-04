import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
function HomeNav() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Contacts App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {localStorage.getItem("user") ? (
                <>
                  <Button
                    className="btn btn-danger"
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/sign-in";
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/sign-in">Sign-in</Nav.Link>
                  <Nav.Link href="/sign-up">Sign-up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomeNav;
