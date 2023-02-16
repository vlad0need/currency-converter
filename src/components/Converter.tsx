import React from 'react';
import InputField from './InputField';
import { Box, IconButton } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { setGetCurrency, setChangeCurrency, onChangeFrom, onChangeTo, swapValues } from '../redux/slice/currencySlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const Converter: React.FC = () => {
    const {get, change} = useAppSelector(state => state.currency)
    const dispatch = useAppDispatch()
    
    // const setFromCurrency = ({value, currency}: {value: string, currency: string}) => {
    //   dispatch(setChangeCurrency(currency))
    //   dispatch(onChangeFrom(value))
    // }

  return (
    <Box sx={{ mt: '50px' }}>
      <InputField label={"Change"} 
      onChange={(value: string) => dispatch(onChangeFrom(value))} 
      activeCur={(value: string) => dispatch(setChangeCurrency(value))}
      cur={change.activeCur}
      value={change.value} 
      />
      <IconButton onClick={() => dispatch(swapValues())} size='large' sx={{m: "0 8px"}}>
        <SwapHorizIcon />
      </IconButton>
      <InputField label={"Get"} 
      onChange={(value: string) => dispatch(onChangeTo(value))}
      activeCur={(value: string) => dispatch(setGetCurrency(value))}
      cur={get.activeCur} 
      value={get.value} 
      />
    </Box>
  );
}
export default Converter;
