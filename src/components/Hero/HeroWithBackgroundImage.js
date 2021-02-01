import React from 'react';
import clsx from 'clsx';

import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#FFF',
    height: '95vh',
    position: 'relative',
    overflow: 'hidden'
  },
  boxOverlay: {
    background:
      'linear-gradient(180deg, rgba(135,133,133,0.53) 0%, rgba(208,205,205,0.13) 3%, rgba(208,205,205,0.13) 97%, rgba(135,133,133,0.5298494397759104) 100%)',
    width: '100vw',
    height: '400px',
    left: '0px'
  },
  container: {
    height: '95vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    left: '0px',
    position: 'absolute'
  }
}));

function Hero({
  title,
  title2,
  subtitle,
  firstComponent,
  secondComponent,
  className,
  ...rest
}) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item className={classes.container}>
            <Box class={classes.boxOverlay}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="100%"
                style={{ marginLeft: '150px' }}
              >
                <Grid item xs={12} md={5}>
                  <Box>
                    <Typography
                      align="left"
                      variant="h1"
                      gutterBottom
                      style={{ letterSpacing: '2px' }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="h1"> {title2}</Typography>
                    <Box mt={5}>{firstComponent}</Box>
                    <Box mt={2}>
                      <Grid container xs={12} md={12}>
                        <Grid item xs={12} md={12}>
                          {secondComponent}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Hero;
