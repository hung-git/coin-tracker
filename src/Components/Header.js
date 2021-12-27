import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'gold',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
}))

const Header = () => {
    const classes = useStyles()

    const history = useHistory()

    const darkTheme = createTheme({
      palette: { 
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

    return (
        <ThemeProvider theme={darkTheme}>
          <AppBar color='transparent' position='static'>
              {/* container is used to make the component responsive when changing screen size */}
          <Container>
              <Toolbar>
                  {/* typography is imported from MUI and used for formatting text */}
              <Typography 
                  onClick={() => history.push('/')} 
                  className={classes.title}
                  variant='h6'
              >
                  Coin Tracker
              </Typography>
              <Select 
                  variant='outlined' 
                  style={{
                  width: 100, 
                  height: 40, 
                  marginRight: 15,
                  }}
              >
                  <MenuItem value={'USD'}>USD</MenuItem>
                  <MenuItem value={'CAD'}>CAD</MenuItem>
              </Select>
              </Toolbar>
          </Container>
          </AppBar>
        </ThemeProvider>
    )
}

export default Header
