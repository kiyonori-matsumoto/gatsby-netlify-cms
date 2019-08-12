import * as React from "react";
import { Level, Heading } from "rbx";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon
} from "react-share";

const Share: React.FC<{ url: string; title: string }> = ({ url, title }) => (
  <>
    <Heading>share</Heading>
    <Level breakpoint="mobile">
      <Level.Item align="left">
        <Level.Item>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} />
          </TwitterShareButton>
        </Level.Item>
        <Level.Item>
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
        </Level.Item>
      </Level.Item>
    </Level>
  </>
);

export default Share;
