import React from "react";
import { Link } from "gatsby";
import { Navbar as N, Container } from "rbx";

const Navbar = () => (
  <N color="dark" fixed="top">
    <N.Brand>
      <N.Item
        as={Link}
        to="/"
        style={{ fontWeight: "bold" }}
        activeClassName="nav-active"
      >
        Pine script Info
      </N.Item>
      <N.Burger />
    </N.Brand>
    <N.Menu>
      <N.Segment align="start">
        <N.Item as={Link} to="/about" activeClassName="is-active">
          about
        </N.Item>
      </N.Segment>
    </N.Menu>
  </N>
);

export default Navbar;
