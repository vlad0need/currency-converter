import TableCurrencies from '../components/Table';
import Converter from '../components/Converter';
import { Box } from '@mui/material';

const Main: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px, 10px',
        flex: "1 1 auto",
        backgroundColor: "#f9f2ed"
      }}>
      <TableCurrencies />
      <Converter />
    </Box>
  );
}
export default Main;
