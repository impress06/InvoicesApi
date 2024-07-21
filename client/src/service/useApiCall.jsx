import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSucess,
  logoutSuccess,
} from "../features/authSlice";
import {
  fetchBillFail,
  fetchBillSuccess,
  fetchBillStart,
} from "../features/billSlice";

import useAxios from "./useAxios";

export const useAuthApiCall = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { axiosPublicInsist, axiosPrivateSimpleTokenInsist } = useAxios();

  const signIn = async (userInfo) => {
    console.log("data", userInfo);
    dispatch(fetchStart());
    try {
      const response = await axiosPublicInsist.post("/auth/login", userInfo);
      console.log("sonuc", response.data);
      if (!response.data.error) {
        dispatch(loginSuccess(response.data));
        toastSuccessNotify(
          "Your login is successful, you will be redirected to the main page"
        );
        navigate("/stock");
      }
    } catch (error) {
      console.log("error:", error);
      toastErrorNotify("Email or password wrong");
    }
  };

  const signUp = async (userInfo) => {
    try {
      const response = await axiosPublicInsist.post("/user", userInfo);
      if (!response.data.error) {
        alert("You are registered successly and  navigate you");
        toastSuccessNotify("You are registered successly");
        navigate("/stock");
      }
    } catch (error) {
      toastErrorNotify("kayıt yapılamadı");
    }
  };
  const createInvoices = async (Info) => {
    console.log("infobill", Info);
    try {
      const response = await axiosPublicInsist.post("/bill", Info);

      if (!response.data.error) {
        toastSuccessNotify("You are registered successly");
        navigate("/stock");
      }
    } catch (error) {
      toastErrorNotify("kayıt yapılamadı");
    }
  };
  const listInvoices = async (
    url = "bill",
    limit = null,
    page = null,
    getParamsVariable = {},
    categoryname = null
  ) => {
    dispatch(fetchBillStart());

    const { action, actionField, value } = getParamsVariable;

    try {
      const params = {
        limit: limit,
        page: page,
      };
      if (value) {
        params[`${action}[${actionField}]`] = value;
      }

      const response = await axiosPrivateSimpleTokenInsist.get(`/${url}`, {
        params,
      });

      const ApiData = response.data.data;
      const ApiPegination = response.data.detail;

      dispatch(fetchBillSuccess({ ApiData, url, ApiPegination }));
    } catch (error) {
      toastErrorNotify("Firms dont pull from server");
      dispatch(fetchBillFail());
    }
  };
  const updateInvoices = async (url = "bill", id, data) => {
    try {
      await axiosPrivateSimpleTokenInsist.put(`/${url}/${id}`, data);

      listInvoices(url);
      toastSuccessNotify("Updated Success");
      navigate("");
    } catch (error) {
      toastErrorNotify(" dont pull from server");
    }
  };
  const deleteInvoices = async (url = "bill", id) => {
    dispatch(fetchBillStart());

    try {
      await axiosPrivateSimpleTokenInsist.delete(`/${url}/${id}`);

      listInvoices(url);
      toastSuccessNotify("Başarılı ile silindi");
    } catch (error) {
      toastErrorNotify(" dont pull from server");
      dispatch(fetchBillFail());
    }
  };
  const Logout = async () => {
    try {
      await axiosPrivateSimpleTokenInsist.post("/auth/logout");
      toastSuccessNotify("You are logout");
      navigate("/login");
    } catch (error) {
      console.log("err", error);
      toastErrorNotify("çıkış başarısız");
    }
  };

  return {
    signIn,
    signUp,
    Logout,
    createInvoices,
    listInvoices,
    updateInvoices,
    deleteInvoices,
  };
};
