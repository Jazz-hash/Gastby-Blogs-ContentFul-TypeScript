import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Container, Grid, Button, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import SEO from '../components/seo'
import Hero from '../components/hero'

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

const IndexPage: FC = () => {
  const classes = useStyles()

  return (
    <Container>
      <SEO title="Home" />
      <Hero title="Hi people" description="Welcome to Blogs site. ">
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                component={GatsbyLink}
                to="/blogs/"
                variant="contained"
                color="primary"
              >
                Visit the Blog Page
              </Button>
            </Grid>
          </Grid>
        </div>
      </Hero>
    </Container>
  )
}

export default IndexPage
