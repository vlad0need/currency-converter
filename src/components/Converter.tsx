import React from 'react';
import InputField from './InputField';
import { Box, IconButton } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { setGetCurrency, setChangeCurrency, onChangeFrom, swapValues } from '../redux/slice/currencySlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const Converter: React.FC = () => {
    const {get, change} = useAppSelector(state => state.currency)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
      dispatch(onChangeFrom(change.value))
    }, [get.activeCur, change.activeCur, dispatch])

  return (
    <Box sx={{ mt: '50px', ml: "10px" }}>
      <InputField label={"Change"} 
      onChange={(value: number) => dispatch(onChangeFrom(value))} 
      activeCur={(value: string) => dispatch(setChangeCurrency(value))}
      cur={change.activeCur}
      value={change.value} 
      />
      <IconButton onClick={() => dispatch(swapValues())} size='large' sx={{m: "0 8px"}}>
        <SwapHorizIcon />
      </IconButton>
      <InputField label={"Get"} 
      onChange={(value: number) => dispatch(onChangeFrom(value))}
      activeCur={(value: string) => dispatch(setGetCurrency(value))}
      cur={get.activeCur} 
      value={get.value} 
      />
    </Box>
  );
}
export default Converter;
