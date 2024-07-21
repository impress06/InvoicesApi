import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bill: [],
  error: false,
  loading: false,
  paginationInfo: {
    filter: {},
    search: [],
    sort: {},
    skip: 0,
    limit: 9,
    page: 0,
    pages: {
      previous: false,
      current: 1,
      next: 2,
      total: 1,
    },
    totalRecords: 0,
  },
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    fetchBillStart: (state) => {
      state.loading = true;
    },
    fetchBillSuccess: (state, { payload }) => {
      state[payload.url] = payload.ApiData;
      state.paginationInfo = payload.ApiPegination;
      state.loading = false;
    },
    setCurrentPage: (state, { payload }) => {
      state.paginationInfo.page = payload;
    },

    fetchBillFail: (state) => {
      state.error = true;
    },
  },
});

export const {
  fetchBillFail,
  fetchBillStart,
  fetchBillSuccess,
  setCurrentPage,
} = billSlice.actions;
export default billSlice.reducer;
