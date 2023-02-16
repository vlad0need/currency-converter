import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import React from 'react';
import Header from './components/Header';
import { Box } from '@mui/material';

import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useAppDispatch} from "./redux/store"
import { fetchCurrentCur } from './redux/slice/currencySlice';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Footer from './components/Footer';

const App: React.FC = () => {
  const status = useSelector((state: any) => state.currency.status);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentCur());
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: blue,
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh"}}>
        <Header />
        {status === 'rejected' ? (
          <NotFound />
        ) : (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
        <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
