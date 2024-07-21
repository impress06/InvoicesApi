import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { setCurrentPage } from "../features/billSlice";
import {useAuthApiCall} from "../service/useApiCall"


const PaginationComponent = ({ url, sear,category }) => {
  const dispatch = useDispatch();
  const { paginationInfo} = useSelector((state) => state.bill);
 

  const {
    filter,
    limit,
    page,
    search,
    pages: { current, total },
    skip,
    sort,
    totalRecords,
  } = paginationInfo;

  const {listInvoices } = useAuthApiCall();

  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value));

    listInvoices(url, limit, value, sear);
    
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      
        <Pagination
          count={total}
          page={current}
          onChange={handleChange}
          color="primary"
        />
      
    </div>
  );
};

export default PaginationComponent;
