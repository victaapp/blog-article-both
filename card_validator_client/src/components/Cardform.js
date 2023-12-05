import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"

import "../css/cardform_style.css"

const Cardform = () => {

  const [cardNumber, setCardNumber] = useState()
  const [name, setName] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [cvv, setCvv] = useState("")

  let payload = { "cardNumber": cardNumber ? cardNumber.replace(/\s/g, "") : "" }

  const validatorHandler = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/submit/`, payload)
      .then((response) => {
        Swal.fire(response.data.message);
      })
      .catch((error) => {
        Swal.fire(error.response.data.error);
        console.log(error)
      });
  }

  const cardNumberHandler = (event) => {
    let card_num = event.target.value.replace(/\D/g, "")
    let formattedNumber = card_num.replace(/(\d{4})/g, "$1 ");
    setCardNumber(formattedNumber.trim())
  }

  const resetCardNumberHandler = () => {
    setCardNumber("")
    setName("")
    setMonth("")
    setYear("")
    setCvv("")
    debugger
  }

  return (
    <div className="form-box">
      <div>
        <strong>Enter your card details</strong>
      </div>
      <div className="form-group">
        <div style={{ display: "flex", justifyContent: "start" }}>
          <label htmlFor="name">Name</label>
        </div>
        <input
          className="form-control"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="creditCardNumber">Credit Card Number</label>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={cardNumberHandler}
            maxLength="19"
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-sm-4">
          <div style={{ display: "flex", justifyContent: "start" }}>
            <label htmlFor="ccmonth">Month</label>
          </div>
          <select className="form-control"
            value={month}
            onChange={(e) => { setMonth(e.target.value) }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>
        <div className="form-group col-sm-4">
          <div style={{ display: "flex", justifyContent: "start" }}>
            <label htmlFor="ccyear">Year</label>
          </div>
          <select className="form-control"
            onChange={(e) => { setYear(e.target.value) }}
            value={year}
          >
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
            <option>2029</option>
            <option>2030</option>
            <option>2031</option>
            <option>2032</option>
            <option>2033</option>
            <option>2034</option>
            <option>2035</option>
          </select>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "start" }}>
              <label htmlFor="cvv">CVV</label>
            </div>
            <input
              className="form-control"
              id="cvv"
              type="text"
              placeholder="123"
              maxLength="3"
              value={cvv}
              onChange={(e) => { setCvv(e.target.value) }}
            />
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-sm btn-success" type="button" onClick={validatorHandler}>
          Continue
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-sm btn-danger" type="reset" onClick={resetCardNumberHandler}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Cardform;
