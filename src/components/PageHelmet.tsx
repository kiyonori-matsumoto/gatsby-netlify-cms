import * as React from "react";
import Helmet from "react-helmet";

interface Props {
  title: string;
  url: string;
  image?: string;
  description?: string;
}

const PageHelmet: React.SFC<Props> = ({
  title,
  url,
  image,
  description = ""
}) => (
  <Helmet title={title}>
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <meta name="description" content={description} />

    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:creator" content="matsukiyo" />
    <meta name="twitter:site" content="@matsukiyo" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:type" content="blog" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="実践pineスクリプト" />
    {image && <meta property="og:image" content={image} />}
    <meta property="og:title" title={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
  </Helmet>
);

export default PageHelmet;
