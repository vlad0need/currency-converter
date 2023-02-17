import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type CurrencyItem = {
  ccy: string;
  base_ccy: string;
  buy: number;
  sale: number;
};
type ActiveItem = {
  rate: number;
  value: number;
  activeCur: string;
};
enum Status {
  LOADING = 'pending',
  SUCCESS = 'success',
  ERROR = 'rejected',
}
interface CurrencySliceState {
  status: Status;
  items: CurrencyItem[];
  get: ActiveItem;
  change: ActiveItem;
}

export const fetchCurrentCur = createAsyncThunk('currency/fetchByCurrency', async () => {
  if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter', '0');
  }
  let counter = parseInt(localStorage.getItem('counter') || '0', 10);

  counter++;
  if (counter === 5) {
    // Imitate server error
    throw new Error('Server error');
  }
  // Make a successful request
  const response = await axios.get('http://localhost:3001/exchange-rates');

  if (counter !== 5) {
    localStorage.setItem('counter', counter.toString());
  }
  return response.data as CurrencyItem[];
});

const initialState: CurrencySliceState = {
  status: Status.LOADING,
  items: [],
  change: {
    rate: 1,
    activeCur: 'USD',
    value: 0,
  },
  get: {
    rate: 1,
    activeCur: 'UAH',
    value: 0,
  },
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setNewRateForBuy(state, action){
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].ccy === action.payload.cur) {
            state.items[i].buy = action.payload.valueBuy;
          }
        }
    },
    setNewRateForSale(state, action){
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].ccy === action.payload.cur) {
          state.items[i].sale = action.payload.valueSale;
        }
      }
  },
    setChangeCurrency(state, action: PayloadAction<string>) {
      state.change.activeCur = action.payload;
      if (state.change.activeCur === 'UAH') {
        state.change.rate = 1;
      } else {
        const findItem: CurrencyItem | undefined = state.items.find(
          (cur) => cur.ccy === state.change.activeCur,
        );
        if (findItem) {
          state.change.rate = findItem.sale;
        }
      }
    },
    setGetCurrency(state, action: PayloadAction<string>) {
      state.get.activeCur = action.payload;
      if (state.get.activeCur === 'UAH') {
        state.get.rate = 1;
      } else {
        const findItem: CurrencyItem | undefined = state.items.find(
          (cur) => cur.ccy === state.get.activeCur,
        );
        if (findItem) {
          state.get.rate = findItem.buy;
        }
      }
    },
    onChangeFrom(state, action: PayloadAction<number>) {
      state.change.value = action.payload;
      let calculate: number;
      if (state.change.activeCur === state.get.activeCur) {
        state.get.value = state.change.value;
      } else {
        calculate = (state.change.value / state.get.rate) * state.change.rate;
        state.get.value = calculate;
      }
    },
    swapValues(state) {
      [ state.change.activeCur, 
        state.get.activeCur, 
        state.change.rate, 
        state.get.rate
      ] = [
        state.get.activeCur,
        state.change.activeCur,
        state.get.rate,
        state.change.rate,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCur.fulfilled, (state, action) => {
      state.items = action.payload;
      const findItem: CurrencyItem | undefined = action.payload.find(
        (cur: CurrencyItem) => cur.ccy === state.change.activeCur,
      );
      if (findItem) {
        state.change.rate = findItem.sale;
        state.status = Status.SUCCESS;
      }
    });
    builder.addCase(fetchCurrentCur.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCurrentCur.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
      localStorage.clear();
    });
  },
});

export const { setGetCurrency, setChangeCurrency, onChangeFrom, swapValues, setNewRateForBuy, setNewRateForSale } =
  currencySlice.actions;

export default currencySlice.reducer;
