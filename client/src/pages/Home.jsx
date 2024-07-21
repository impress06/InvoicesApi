import React, { useEffect, useState } from "react";
import { useAuthApiCall } from "../service/useApiCall";
import "../assets/css/cards.css";
import { useSelector } from "react-redux";

const Home = () => {
  const { listInvoices } = useAuthApiCall();

  useEffect(() => {
    listInvoices("bill");

  }, []);

  const { bill } = useSelector((state) => state.bill);

  const total = bill.reduce((acc, value) => {
    return acc + value.total;
  }, 0);

  return (
    <div className="py-5">
      <div className="container">
        <div className="row hidden-md-up">
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Toplam Fatura Saysı</h4>
                <h6 className="card-subtitle text-muted">Bu tarihe kadar kesilien toplam fatura {bill.length}</h6>
                <p className="card-text p-y-1">Some quick example text to build on the card title.</p>
               
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Toplam Kesilen Fatura</h4>
                <h6 className="card-subtitle text-muted">Toplam Kesilen Fatura meblası {total}</h6>
                <p className="card-text p-y-1">Some quick example text to build on the card title.</p>
                <a href="#" className="card-link">link</a>
                <a href="#" className="card-link">Second link</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Toplam Müşteri Sayısı</h4>
                <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                <p className="card-text p-y-1">Some quick example text to build on the card title.</p>
                <a href="#" className="card-link">link</a>
                <a href="#" className="card-link">Second link</a>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Müşteriler</h4>
                <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                <p className="card-text p-y-1">Some quick example text to build on the card title.</p>
                <a href="#" className="card-link">link</a>
                <a href="#" className="card-link">Second link</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Kullanıcı Paneli</h4>
                <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                <p className="card-text p-y-1">Some quick example text to build on the card title.</p>
                <a href="#" className="card-link">link</a>
                <a href="#" className="card-link">Second link</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Card title</h4>
                <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                <p className="card-text p-y-1">Some quick example text to build on the card title.</p>
                <a href="#" className="card-link">link</a>
                <a href="#" className="card-link">Second link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
