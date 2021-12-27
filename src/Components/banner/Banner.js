import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    // flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-between',
  },
  bannerTitle: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    // textAlign: 'center',
  },
}))

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.bannerTitle}>
          <Typography 
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            Coin Tracker
          </Typography>
          <Typography 
            variant='subtitle2'
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat'
            }}>
            Track All Of Your Favorite Coins
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
