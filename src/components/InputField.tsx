import React from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

type InputFieldProps = {
  activeCur: (value: string) => void;
  onChange: (starg0: number) => void;
  cur: string;
  value: number;
  label: string;
}

function InputField({activeCur, cur, onChange, value, label}: InputFieldProps) {
  
  return (
    <>
      <TextField
        id="outlined-number"
        type="number"
        value={value !== 0 && Number(value.toFixed(3))}
        placeholder="0"
        onChange={(e) => onChange(Number(e.target.value))}
        label={label}
        sx={{backgroundColor: "#fff"}}
        disabled={label ==="Get"}
      />
      
      <FormControl size='medium'>
        <InputLabel id="demo-simple-select-label">{cur}</InputLabel>
        <Select
          sx={{backgroundColor: "#fff"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select" 
          label={cur}
          value={cur}
          onChange={(e) => activeCur(e.target.value)}>          
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"UAH"}>UAH</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
export default InputField;
