import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, createTheme, ThemeProvider, Typography } from '@material-ui/core'

const CoinTable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)

  const currency = CryptoState()

  const fetchCoins = async () => {
    setLoading(true)
    const data = await axios.get(CoinList(currency.currency))

    setCoins(data.data)
    setLoading(false)
  }

  console.log(coins)

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const darkTheme = createTheme({
    palette: { 
        primary: {
          main: "#fff",
        },
        type: "dark",
      },
    });

  return (
   <ThemeProvider>
     <Container style={{ textAlign: "center" }}>
       <Typography variant="h4" style={{margin: 18, fontFamily: "Montserrat"}}>
         Coins Listed by Market Cap
       </Typography>
     </Container>
   </ThemeProvider>
  )
}

export default CoinTable
