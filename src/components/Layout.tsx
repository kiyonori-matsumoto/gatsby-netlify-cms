import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

import "./all.scss";
import styled from "styled-components";
import { Hero, Container, Title, Section } from "rbx";

const TemplateWrapper: React.FC<{
  title: string;
  subtitle?: string;
  image?: any;
}> = ({ title, subtitle, image, children }) => {
  const body = (
    <Hero.Body>
      <Container>
        <Title>{title}</Title>
        <Title subtitle>{subtitle}</Title>
      </Container>
    </Hero.Body>
  );

  return (
    <>
      <Navbar />
      <Hero
        color={!image ? "primary" : undefined}
        gradient={!image}
        size="medium"
        // style={{ backgroundImage: image ? image.src : undefined }}
        as={
          image
            ? styled.section`
                position: relative;

                &::after {
                  content: "";
                  background: center/cover url(${image.src});
                  filter: blur(3px);
                  opacity: 0.6;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  right: 0;
                  position: absolute;
                  z-index: -1;
                }
              `
            : "section"
        }
      >
        {body}
      </Hero>
      <Section>
        <Container>{children}</Container>
      </Section>
      <Footer />
    </>
  );
};

export default TemplateWrapper;
