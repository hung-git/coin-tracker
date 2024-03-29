import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import { TrendingCoins } from '../../config/api.js'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: "50%",
    display: "flex",
    alignItems: "center"
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white"
  }
}))

export function priceWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const Carousel = () => {
  const [trending, setTrending] = useState([])

  const classes = useStyles()

  const { currency, symbol } = CryptoState()
  
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))

    setTrending(data)
  }

  console.log(trending)

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}% 
          </span> 
        </span>
        <br/> 
        <span style={{fontSize: 22, fontWeight: 500 }}>
          {symbol} {priceWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    800: {
      items: 3,
    },
  }

  return (
    <div className={classes.carousel}>
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel
