import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

import "./all.scss";
import { Hero, Container, Title, Section } from "rbx";

const TemplateWrapper: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
  children
}) => (
  <>
    <Navbar />
    <Hero color="primary">
      <Hero.Body>
        <Container>
          <Title>{title}</Title>
          <Title subtitle>{subtitle}</Title>
        </Container>
      </Hero.Body>
    </Hero>
    <Section>
      <Container>{children}</Container>
    </Section>
    <Footer />
  </>
);

export default TemplateWrapper;
