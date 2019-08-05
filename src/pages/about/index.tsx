import React from "react";
import Layout from "../../components/Layout";
import PageHelmet from "../../components/PageHelmet";
import { Content } from "rbx";

export const AboutPage: React.FC = () => (
  <Layout title="about">
    <PageHelmet
      title="blog"
      description="about me"
      url="https://blog.matsukiyo.me/about/"
    />
    <Content>About me</Content>
  </Layout>
);

export default AboutPage;
