import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../redux/store';

const TableCurrencies: React.FC = () => {
  const rate = useAppSelector((state) => state.currency.items);

  return (
    <TableContainer sx={{ maxWidth: 600, justifyContent: 'center', mt: "-100px" }} component={Paper}>
      <Table size={'medium'} sx={{ justifyContent: 'center' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currencies</TableCell>
            <TableCell align="center">Buy</TableCell>
            <TableCell align="center">Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rate.map((rate) => (
            <TableRow key={rate.ccy} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {rate.ccy + '/' + rate.base_ccy}
              </TableCell>
              <TableCell align="center">{Math.floor(Number(rate.buy) * Math.pow(10, 2)) / Math.pow(10, 2)}</TableCell>
              <TableCell align="center">{Math.floor(Number(rate.sale) * Math.pow(10, 2)) / Math.pow(10, 2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TableCurrencies;
