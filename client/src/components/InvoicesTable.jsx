import React, { useState, useEffect, useCallback } from "react";
import { useAuthApiCall } from "../service/useApiCall";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import PaginationComponent from "./Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../assets/css/table.css";
import { useNavigate } from "react-router-dom";

const InvoicesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [perLimit, perSetLimit] = useState("10");
  const [params, setParams] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { listInvoices, deleteInvoices } = useAuthApiCall();
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((query) => {
      console.log("searchtERM", query);
      listInvoices("bill", perLimit, null, query);
    }, 300),
    []
  );

  useEffect(() => {
    listInvoices();
  }, []);

  const {
    bill,

    paginationInfo: { totalRecords },
  } = useSelector((state) => state.bill);

  useEffect(() => {
    listInvoices("bill", perLimit, null, params);
  }, [perLimit, params]);

  const handleSort = (e) => {
    console.log("sort", e.target.value);
    setParams({
      action: "sort",
      actionField: "total",
      value: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const sendParamsVariables = {
      action: "search",
      actionField: "clientname",
      value,
    };
    debouncedSearch(sendParamsVariables);
  };

  const handleDelete = (url = "bill", id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
    }
    deleteInvoices("bill", id);
  };
  const handleEdit = (id) => {
    navigate("/stock/fixInvoives", { state: { id } });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          margin: "0 20px",
        }}
      >
        <div>
          <p style={{ color: "black", fontWeight: "bold" }}>Per a Page</p>
          <select onChange={(e) => perSetLimit(e.target.value)}>
            <option value="">All</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ marginLeft: "8px" }}>What Purshased?</div>
                </div>
              </th>
              <th>
                <div className="nameRow">
                  <div>Client Name:</div>
                  <TextField
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    sx={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "10px",
                        color: "whitesmoke",
                      },
                      "& .MuiInputLabel-root": {
                        color: "whitesmoke",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "whitesmoke",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "whitesmoke",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "whitesmoke",
                      },
                    }}
                  />
                </div>
              </th>
              <th>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ marginLeft: "8px" }}>Total Price</div>
                  <div>
                    <select onChange={(e) => handleSort(e)}>
                      <option value="desc">DESC</option>
                      <option value="asc">ASC</option>
                    </select>
                  </div>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bill?.map((item, index) => (
              <tr key={index}>
                <td>
                  {item?.items.map((a, i) => (
                    <div key={i}>
                      <div>Purchased: {a.name}</div>
                      <div>Price: {a.price}</div>
                      <div>Description: {a.description}</div>
                      <div>Quantity: {a.quantity}</div>
                    </div>
                  ))}
                </td>
                <td>{item?.clientname}</td>
                <td>{item?.total}</td>
                <td>
                  <DeleteIcon
                    style={{ color: "#4ABD7F" }}
                    onClick={() => handleDelete("bill", item._id)}
                  />
                  <EditIcon
                    style={{ color: "#4ABD7F" }}
                    onClick={() => handleEdit(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent url="bill" category={categoryName} />
    </div>
  );
};

export default InvoicesTable;
