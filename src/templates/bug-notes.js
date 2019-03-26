import * as React from 'react';
import { graphql } from 'gatsby';
import PostLayout from '../layouts/post-layout';
import { Header } from '../components/typography';

export const BugNote = ({ data }) => {
  let post = data.markdownRemark;
  let { title } = post.frontmatter
  let { html } = post;

  return (
    <PostLayout
      title={title}
      html={html}
    >
    </PostLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BugNote;
