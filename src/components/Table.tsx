import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { setNewRateForBuy, setNewRateForSale, setChangeCurrency, setGetCurrency } from '../redux/slice/currencySlice';
import { IconButton, TextField, Tooltip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { padding } from '@mui/system';

const TableCurrencies: React.FC = () => {
  const rate = useAppSelector((state) => state.currency.items);
  const {change, get} = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  const [changeBuy, setChangeBuy] = React.useState(rate.map(() => false));
  const [changeSale, setChangeSale] = React.useState(rate.map(() => false));
  const [valueBuy, setNewValueBuy] = React.useState('');
  const [valueSale, setNewValueSale] = React.useState('');

  React.useEffect(() => {
    dispatch(setChangeCurrency(change.activeCur))
    dispatch(setGetCurrency(get.activeCur))
  }, [rate])

  const setNewBuy = ({ valueBuy, i, cur }: any) => {
    setChangeBuy([false, false])
    setChangeSale([false, false])
    const newChange = [...changeBuy];
    newChange[i] = !newChange[i];
    setChangeBuy(newChange);
    dispatch(setNewRateForBuy({ valueBuy, cur }));
  };
  const setNewSale = ({ valueSale, i, cur }: any) => {
    setChangeBuy([false, false])
    setChangeSale([false, false])
    const newChange = [...changeSale];
    newChange[i] = !newChange[i];
    setChangeSale(newChange);
    dispatch(setNewRateForSale({ valueSale, cur }));
  };

  return (
    <TableContainer
      sx={{ maxWidth: 600, justifyContent: 'center', mt: '-100px' }}
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
            <TableRow key={rate.ccy} sx={{ '&:last-child td, &:last-child th': { border: 0 }, margin: "0" }}>
              <TableCell component="th" scope="row">
                {rate.ccy + '/' + rate.base_ccy}
              </TableCell>
              {changeBuy[i] === true ? (
                <TableCell sx={{ display: 'flex', ml: '60px', width: '40%' }} align="center">
                  <TextField
                    defaultValue={rate.buy}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewValueBuy(e.target.value)
                    }
                    sx={{ ml: '20px' }}
                    size="small"
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: '-40px' }}
                    onClick={() => {
                      setNewBuy({ valueBuy:(valueBuy ? valueBuy : rate.buy), cur: rate.ccy, i });
                    }}>
                    <DoneIcon></DoneIcon>
                  </IconButton>
                </TableCell>
              ) : (
                <Tooltip placement="top" arrow={true} title={'Click for change'}>
                  <TableCell
                    onClick={() => {
                      setNewBuy({ valueBuy: rate.buy, cur: rate.ccy, i });
                    }}
                    align="center">
                    {Math.floor(Number(rate.buy) * Math.pow(10, 2)) / Math.pow(10, 2)}
                  </TableCell>
                </Tooltip>
              )}
              {changeSale[i] === true ? (
                <TableCell sx={{ display: 'flex', ml: '60px', width: '40%' }} align="center">
                  <TextField
                    defaultValue={rate.sale}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewValueSale(e.target.value)
                    }
                    sx={{ ml: '0px' }}
                    size="small"
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: '-40px' }}
                    onClick={() => {
                      setNewSale({ valueSale:(valueSale ? valueSale : rate.sale), cur: rate.ccy, i });
                    }}>
                    <DoneIcon></DoneIcon>
                  </IconButton>
                </TableCell>
              ) : (
                <Tooltip placement="top" arrow={true} title={'Click for change'}>
                  <TableCell
                    onClick={() => {
                      setNewSale({ valueSale: rate.sale, cur: rate.ccy, i });
                    }}
                    align="center">
                    {Math.floor(Number(rate.sale) * Math.pow(10, 2)) / Math.pow(10, 2)}
                  </TableCell>
                </Tooltip>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableCurrencies;
