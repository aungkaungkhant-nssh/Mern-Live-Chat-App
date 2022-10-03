
import MainRouter from './routes/MainRouter';
import {colors, createTheme, ThemeProvider} from '@mui/material'


const theme = createTheme({
  palette:{
    primary:{
      main:colors.teal[500]
    },
    secondary:{
      main:colors.deepPurple[500]
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
