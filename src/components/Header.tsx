import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';

const Header: React.FC = () => {
  return (
    <AppBar position="relative" component={'header'}>
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'center', height: '100px', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" color="white" noWrap sx={{}}>
            Currency Converter
          </Typography>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <CurrencyExchangeSharpIcon fontSize="large" sx={{ color: 'white', fontSize: "40px", marginLeft: "8px" }}>
            {' '}
          </CurrencyExchangeSharpIcon>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
