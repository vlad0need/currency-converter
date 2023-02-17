import React, { useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { IconButton, TextField, Tooltip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const TableCurrencies: React.FC = () => {
  const rate = useAppSelector((state) => state.currency.items);
  const [change, setChange] = React.useState(rate.map(() => false));
  const dispatch = useAppDispatch();

  console.log(change);
  return (
    <TableContainer
      sx={{ maxWidth: 500, justifyContent: 'center', mt: '-100px' }}
      component={Paper}>
      <Table size={'medium'} sx={{ justifyContent: 'center' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currencies</TableCell>
            <TableCell align="center">Buy</TableCell>
            <TableCell align="center">Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rate.map((rate, i) => (
            <TableRow key={rate.ccy} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {rate.ccy + '/' + rate.base_ccy}
              </TableCell>

              <Tooltip placement="top" arrow={true} title={'Click for change'}>
                {change[i] === true ? (
                  <TableCell sx={{ display: 'flex', ml: '60px', width: '40%' }} align="center">
                    <TextField value={rate.buy} sx={{ ml: '20px' }} size="small" />
                    <IconButton
                      size="small"
                      sx={{ ml: '-40px' }}
                      onClick={() => {
                        const newChange = [...change];
                        newChange[i] = false;
                        setChange(newChange);
                      }}>
                      <DoneIcon></DoneIcon>
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell
                    onClick={() => {
                      const newChange = [...change];
                      newChange[i] = true;
                      setChange(newChange);
                    }}
                    align="center">
                    {Math.floor(Number(rate.buy) * Math.pow(10, 2)) / Math.pow(10, 2)}
                  </TableCell>
                )}
              </Tooltip>
              <TableCell align="center">
                {Math.floor(Number(rate.sale) * Math.pow(10, 2)) / Math.pow(10, 2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableCurrencies;
