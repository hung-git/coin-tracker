import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import CoinDetails from '../components/CoinDetails'

const CoinPage = () => {
    const { id } = useParams()
    const [coin, setCoin] = useState()

    const { currency, symbol } = CryptoState()

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))

        setCoin(data)
    }

    console.log(coin)

    useEffect(() => {
        fetchCoin()
    }, [])

    const useStyles = makeStyles((theme) => ({
      container: {
        display: "flex",
        
        // theme.breakpoints.down("md") kicks in at medium or smaller screen size for responsiveness
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: "Montserrat",
      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddintTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      }
    }))

    const classes = useStyles()

    if (!coin) return <LinearProgress style ={{ backgroundColor: "gold" }} />

    return (
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />  
            <Typography variant="h3" className={classes.heading}>
              {coin?.name}
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                {(coin?.description.en.split(". ")[0])}.
            </Typography>
            <div className={classes.marketData}>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.heading}>
                  Rank: &nbsp;
                </Typography>
                <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                  {coin?.market_cap_rank}
                </Typography>
              </span>

              <span style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.heading}>
                  Current Price: &nbsp;
                </Typography>
                <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                  {symbol} {coin?.market_data.current_price[currency.toLowerCase()].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
              </span>
              
              <span style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.heading}>
                  Market Cap: &nbsp;
                </Typography>
                <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {symbol} {coin?.market_data.market_cap[currency.toLowerCase()].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
              </span>
            </div>
          </div>

            {/* chart */}
          <CoinDetails coin={coin} />
        </div>
    )
}

export default CoinPage
