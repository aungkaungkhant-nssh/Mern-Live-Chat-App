
import MainRouter from './routes/MainRouter';
import {colors, createTheme, ThemeProvider} from '@mui/material'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
