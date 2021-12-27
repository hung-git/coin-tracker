import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import { TrendingCoins } from '../../config/api.js'
import { CryptoState } from '../../CryptoContext'

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: '50%',
    display: 'flex',
    alignItems: 'center'
  }
}))

const Carousel = () => {
  const [trending, setTrending] = useState([])

  const classes = useStyles()

  const { currency } = CryptoState()
  
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))

    setTrending(data)
  }

  console.log(trending)

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  return (
    <div className={classes.carousel}>
      carousel
    </div>
  )
}

export default Carousel
