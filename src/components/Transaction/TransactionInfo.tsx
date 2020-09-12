import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import generateQRCodeString from "../../services/Transaction/GenerateQRCodeString";
import TransactionInfo from "./TransactionInterface";

export const TransactionInfoForm = () => {
  const { register, handleSubmit, errors } = useForm<TransactionInfo>();
  const [QRCodeString, setQRCodeString] = useState<string>();

  const handleData = (data: string) => {
    console.log(data);
  };

  const onSubmit = (data: TransactionInfo) => {
    generateQRCodeString(data, handleData);
    console.log(QRCodeString);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="payerIdentifier">Payer Identifier</label>
          <input
            type="text"
            id="payerIdentifier"
            name="payerIdentifier"
            ref={register({ required: true })}
          />
          {errors.payerIdentifier &&
            errors.payerIdentifier.type === "required" && (
              <div className="error">
                Your must enter your payer identifier.
              </div>
            )}
        </div>
        <div className="field">
          <label htmlFor="recieverIdentifier">Reciever Identifier</label>
          <input
            type="text"
            id="recieverIdentifier"
            name="recieverIdentifier"
            ref={register({ required: true })}
          />
          {errors.recieverIdentifier &&
            errors.recieverIdentifier.type === "required" && (
              <div className="error">
                Your must enter your reciever identifier.
              </div>
            )}
        </div>
        <div className="field">
          <label htmlFor="value">Value</label>
          <input
            type="number"
            id="value"
            name="value"
            ref={register({ required: true })}
          />
          {errors.value && errors.value.type === "required" && (
            <div className="error">Your must enter your value.</div>
          )}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TransactionInfoForm;
