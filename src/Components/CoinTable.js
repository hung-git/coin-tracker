import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { priceWithCommas } from './banner/Carousel'

// export function priceWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// }

const CoinTable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const history = useHistory()

  const { currency, symbol } = CryptoState()

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  }))
  
  const classes = useStyles();

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))

    setCoins(data)
    setLoading(false)
  }

  // console.log(coins)

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

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
   <ThemeProvider theme={darkTheme}>
     <Container style={{ textAlign: "center" }}>
       <Typography variant="h4" style={{margin: 18, fontFamily: "Montserrat"}}>
         Coins Listed by Market Cap
       </Typography>
       <TextField label="Search For a Coin..." variant="outlined" style={{marginBottom: 20, width: "100%"}} onChange={(e) => setSearch(e.target.value)} />
       <TableContainer>
         {loading ? 
          (<LinearProgress style={{ backgroundColor: "gold" }} />) 
         : 
          (<Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell 
                    style={{ 
                      color: "black", 
                      fontWeight: "700", 
                      fontFamily: "Montserrat" }} 
                    key={head} 
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Body goes here */}
              {handleSearch().map((coin) => {
                const profit = coin.price_change_percentage_24h > 0

                return (
                  <TableRow 
                    onClick={() => history.push(`/coins/${coin.id}`)}
                    className={classes.row} 
                    key={coin.name}
                  >
                    <TableCell component='th' scope='coin' style={{ display: "flex", gap: 15 }}>
                      <img src={coin?.image} alt={coin.name} height="40" style={{ marginBottom: 10 }} />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ textTransform: "uppercase", fontSize: 20 }}>{coin.symbol}</span>
                        <span style={{ color: "darkgrey" }}>{coin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {priceWithCommas(coin.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell align="right" style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
                      {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {priceWithCommas(coin.market_cap.toFixed(2))}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table> )
         }
       </TableContainer>
     </Container>
   </ThemeProvider>
  )
}

export default CoinTable
