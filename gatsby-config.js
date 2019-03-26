module.exports = {
  siteMetadata: {
    title: "Weston Selleck"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    'gatsby-plugin-less',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            classPrefix: "language-",
          }
        ]
      }
    }
  ]
};
