const siteUrl = "https://pine-script.netlify.com";

module.exports = {
  siteMetadata: {
    title: "Pine script Info",
    description: "blog",
    siteUrl: siteUrl
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
        feeds: [{
          setup: locals => {
            return {
              ...locals,
              ...locals.query.site.siteMetadata,
              site_url: siteUrl,
              feed_url: `${siteUrl}/feed.xml`
            };
          },
          serialize: ({
            query: {
              site,
              allMdx
            }
          }) => {
            return allMdx.edges.map(edge => {
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
        }]
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],

        tableOfContents: {
          heading: null,
          maxDepth: 6,
        },
        // defaultLayouts: {
        //   pages: require.resolve("./src/templates/blog-post2.tsx"),
        //   defalut: require.resolve("./src/templates/blog-post2.tsx")
        // },
        gatsbyRemarkPlugins: [{
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '20',
              removeAccents: true,
            }
          }, {
            resolve: `gatsby-remark-prismjs`,
            options: {
              languageExtensions: [{
                language: 'pine',
                extend: 'javascript',
                definition: {}
              }, ]
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
              withWebp: true,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          }
        ],
        plugins: [`gatsby-remark-images`]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
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
