import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type CurrencyItem = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};
type ActiveItem = {
  rate: string;
  value: string;
  activeCur: string;
};
enum Status {
  LOADING = "pending",ß
  SUCCESS = "success",
  ERROR = "rejected"
}
interface CurrencySliceState {
  status: Status
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
    rate: "1",
    activeCur: 'USD',
    value: '',
  },
  get: {
    rate: "1",
    activeCur: 'UAH',
    value: '',
  },
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setChangeCurrency(state, action: PayloadAction<string>) {
      state.change.activeCur = action.payload;
      if (state.change.activeCur === 'UAH') {
        state.change.rate = "1";
      } else {
        const findItem: CurrencyItem | undefined = state.items.find(
          (cur) => cur.ccy === state.change.activeCur,
        );
        if (findItem) {
          state.change.rate = findItem.sale;
        }
      }
      onChangeFrom(state.change.value)
    },
    setGetCurrency(state, action: PayloadAction<string>) {
      state.get.activeCur = action.payload;
      if (state.get.activeCur === 'UAH') {
        state.get.rate = "1";
      } else {
        const findItem: CurrencyItem | undefined = state.items.find(
          (cur) => cur.ccy === state.get.activeCur,
        );
        if (findItem) {
          state.get.rate = findItem.buy;
        }
      }
    },
    onChangeFrom(state, action: PayloadAction<string>) {
      state.change.value = action.payload;
      let calculate: Number

      calculate = (Number(state.change.value) / Number(state.get.rate)) * Number(state.change.rate);

      state.get.value = calculate.toString()
    },
    onChangeTo(state, action: PayloadAction<string>) {
      state.get.value = action.payload;
      let calculate: number;
      calculate = (Number(state.get.value) / Number(state.change.rate)) * Number(state.get.rate);

      state.change.value = calculate.toString();
    },
    swapValues(state) {
      [state.get, state.change] = [state.change, state.get];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCur.fulfilled, (state, action) => {
      state.items = action.payload;
      const from: CurrencyItem | undefined = action.payload.find(
        (cur: CurrencyItem) => cur.ccy === state.change.activeCur,
      );
      if (from) {
        state.change.rate = from.buy;
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

export const { setGetCurrency, setChangeCurrency, onChangeTo, onChangeFrom, swapValues } =
  currencySlice.actions;

export default currencySlice.reducer;
