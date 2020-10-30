import React, { FC } from 'react'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'

import Img from 'gatsby-image'
import SEO from '../components/seo'
import { Typography, Link, Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}))

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedData(formatString: "Do MMMM, YYYY")
      featuredImage {
        file {
          url
        }
      }
      excerpt {
        excerpt
        json
      }
    }
  }
`
type Props = {
  data: {
    contentfulBlogPost: {
      title: string
      publishedData: string
      featuredImage: {
        file: {
          url: any
        }
      }
      excerpt: {
        excerpt: string
        json: any
      }
    }
  }
}

const BlogPost: FC<Props> = ({ data }: Props) => {
  const classes = useStyles()
  const excerpt = JSON.parse(
    JSON.stringify(data.contentfulBlogPost.excerpt.json),
  )
  return (
    <Container maxWidth="md" className={classes.root}>
      <SEO title={data.contentfulBlogPost.title} />
      <GatsbyLink to="/blogs/">Visit the Blog Page</GatsbyLink>
      <div className="content">
        <h1 style={{ textAlign: 'center' }}>{data.contentfulBlogPost.title}</h1>
        <p className="meta" style={{ textAlign: 'center' }}>
          Posted on {data.contentfulBlogPost.publishedData}
        </p>

        {data.contentfulBlogPost.featuredImage && (
          <img
            style={{ width: '100%', padding: 10 }}
            src={'https:' + data.contentfulBlogPost.featuredImage.file.url}
            alt={data.contentfulBlogPost.title}
          />
        )}
        {documentToReactComponents(excerpt)}
      </div>
    </Container>
  )
}

export default BlogPost
