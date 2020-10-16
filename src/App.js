import 'react-perfect-scrollbar/dist/css/styles.css'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from 'src/theme/GlobalStyles'
import theme from 'src/theme'
import AppRoutes from 'src/routes'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
