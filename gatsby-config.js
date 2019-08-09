module.exports = {
  siteMetadata: {
    title: "blog",
    description: "blog",
    siteUrl: "https://blog.matsukiyo.me"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-typescript",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            setup: locals => {
              return {
                ...locals,
                ...locals.query.site.siteMetadata,
                site_url: "https://blog.matsukiyo.me/",
                feed_url: "https://blog.matsukiyo.me/feed.xml"
              };
            },
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const articleUrl = `${site.siteMetadata.siteUrl}${edge.node.fields.slug}`;

                return {
                  ...edge.node.frontmatter,
                  url: articleUrl,
                  guid: articleUrl
                };
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-styled-components",
      options: {}
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    // {
    //   resolve: "gatsby-transformer-remark",
    //   options: {
    //     plugins: [{
    //       resolve: "gatsby-remark-prismjs"
    //     }]
    //   }
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        // defaultLayouts: {
        //   pages: require.resolve("./src/templates/blog-post2.tsx"),
        //   defalut: require.resolve("./src/templates/blog-post2.tsx")
        // },
        gatsbyRemarkPlugins: [
          { resolve: `gatsby-remark-prismjs` },
          { resolve: `gatsby-remark-images` }
        ],
        plugins: [`gatsby-remark-images`]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-80739523-5",
        respectDNT: true,
        exclude: ["/public/**", "/admin/**"]
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
