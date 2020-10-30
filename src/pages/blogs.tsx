import React, { FC } from 'react'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import { makeStyles } from '@material-ui/styles'
import { Typography, Link, Container, Theme, Button } from '@material-ui/core'
import Img from 'gatsby-image'

import SEO from '../components/seo'
import Hero from '../components/hero'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}))

const Blogs: FC = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost(sort: { fields: publishedData, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              publishedData(formatString: "Do MMMM, YYYY")
              featuredImage {
                file {
                  url
                }
              }
              excerpt {
                excerpt
              }
            }
          }
        }
      }
    `,
  )
  const classes = useStyles()
  return (
    <Container maxWidth="md" className={classes.root}>
      <p>
        <GatsbyLink to="/">Go back to the homepage</GatsbyLink>
      </p>
      <SEO title="Blogs" />

      <ul className="posts" style={{ listStyle: 'none' }}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className="post" key={edge.node.id}>
              <h1 style={{ textAlign: 'center' }}>
                <GatsbyLink to={`/blog/${edge.node.slug}/`}>
                  {edge.node.title}
                </GatsbyLink>
              </h1>
              <div className="meta" style={{ textAlign: 'center' }}>
                <span>Posted on {edge.node.publishedData}</span>
              </div>
              {edge.node.featuredImage && (
                <img
                  style={{ width: '100%', padding: 10 }}
                  src={'https:' + edge.node.featuredImage.file.url}
                  alt={edge.node.title}
                />
              )}
              <p
                className="excerpt"
                dangerouslySetInnerHTML={{
                  __html: edge.node.excerpt.excerpt.excerpt,
                }}
              ></p>
              <div className="button" style={{ textAlign: 'center' }}>
                <GatsbyLink
                  to={`/blog/${edge.node.slug}/`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="outlined" color="primary">
                    Read More
                  </Button>
                </GatsbyLink>
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default Blogs
