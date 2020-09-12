import React from "react";
import TransactionInfo from "../../components/Transaction/TransactionInterface";

const generateQRCodeString = (
  data: TransactionInfo,
  handleData: (value: string) => void
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  console.log(requestOptions);
  fetch("http://localhost:3333/transactions", requestOptions)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then((data) => {
      handleData(data.qrCodeString);
      //   console.log(data.qrCodeString);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default generateQRCodeString;
