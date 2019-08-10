import React from "react";
import { Link } from "gatsby";
import { Navbar as N, Container } from "rbx";

const Navbar = () => (
  <Container>
    <N>
      <N.Brand>
        <N.Item
          as={Link}
          to="/"
          style={{ fontWeight: "bold" }}
          activeClassName="nav-active"
        >
          Pine script Info
        </N.Item>
      </N.Brand>
      <N.Item as={Link} to="/about" activeClassName="nav-active">
        about
      </N.Item>
    </N>
  </Container>
);

export default Navbar;
