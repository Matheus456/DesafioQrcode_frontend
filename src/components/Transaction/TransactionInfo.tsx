import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import generateQRCodeString from "../../services/Transaction/GenerateQRCodeString";
import TransactionInfo from "./TransactionInterface";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export const TransactionInfoForm = () => {
  const QRCode = require("qrcode.react");

  const { register, handleSubmit, errors } = useForm<TransactionInfo>();
  const [QRCodeString, setQRCodeString] = useState<string>();

  const handleData = (data: string) => {
    console.log(data);
    setQRCodeString(data);
  };

  const onSubmit = (data: TransactionInfo) => {
    generateQRCodeString(data, handleData);
    console.log(QRCodeString);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card
            className="transactionCard"
            style={{
              marginTop: "3em",
              padding: "1em",
            }}
          >
            <Card.Text style={{ display: "flex", justifyContent: "center" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Identificador do pagador</Form.Label>
                  <Form.Control
                    type="text"
                    id="payerIdentifier"
                    name="payerIdentifier"
                    ref={register({ required: true })}
                  />
                  {errors.payerIdentifier &&
                    errors.payerIdentifier.type === "required" && (
                      <div style={{ color: "red" }}>
                        Preencha o Identificador do pagador.
                      </div>
                    )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Identificador do recebedor</Form.Label>
                  <Form.Control
                    type="text"
                    id="recieverIdentifier"
                    name="recieverIdentifier"
                    ref={register({ required: true })}
                  />
                  {errors.recieverIdentifier &&
                    errors.recieverIdentifier.type === "required" && (
                      <div style={{ color: "red" }}>
                        Preencha o Identificador do recebedor.
                      </div>
                    )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    type="number"
                    id="value"
                    name="value"
                    ref={register({ required: true })}
                  />
                  {errors.value && errors.value.type === "required" && (
                    <div style={{ color: "red" }}>
                      Preencha o Identificador do valor.
                    </div>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </form>
            </Card.Text>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            style={{
              marginTop: "1em",
              padding: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {QRCodeString ? (
              <Container>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <h2>QR Code gerado com sucesso!</h2>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <QRCode size="200" value={QRCodeString} />
                </Row>
              </Container>
            ) : (
              <Container>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <h2>Preencha os campos da transferência</h2>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{ height: "200px", width: "200px" }}
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAKEA8NDQgQCA0IDQ0KCAgIDg8IDQcNFREWFhURExMYHSggGCYlJxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOAA4AMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAwIBB//EACEQAQABBAMBAQEBAQAAAAAAAAABAhESMQNRYRNBIaEi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APaQWgERexYEBexYEBarSIAAAAAAAAAAAAAK0aBIXsWBAXsWBAXsgAvCC8AzXVZn6eHL+MA39PD6eMWLA3Nd/wAYLFgAsWACwAAAAABYALFgGort+M2LA39PD6eMWLA39PGqarpN8QKILoALwgvAJ8v4xDfL+MQC4MV1WBsSzkzkFRLOT6SCrNeiiblegSAAHYi7Xz9Brj005TFiqbA6JfSTOQVEs5M5BUYprvLYI1ba4mattcQKILoAKxVHaQDfJN2ICAXS5NqpcmwZBaI8BEU5EwV49Fejj00CAvbxKvYOUbhZB2/oLM16OPRXoEgU4wTF7eIA1RtVKjaoI1bd45s5VtwFc47SAAAAgIBdLk2qlybBlT6JgN11XYAFePTszZzj0V6Bz6Q5NOX97YVo0DE0WZVr0kCvHor0ceivQJNUVWZAU+kJgDVG1UqNqgjVtx2rbgAAAABAQC7M03M47dibg5hBhDTOcdgYQYQZx2Zx2DsRZyvRnHZM3/kAkrRpjCVKYtAOV6SVr0kCvHp2YuzRVEQ7nHYGEGEGcduxNwcwgwhpnOOwIos0znHZnHYJ1bcdqcAAAAAAgBTidwh2IsDqC6AA1RF28I6BJrj23hHTkxb+wDYlnPZnPYN16SdmqZcAG6KYmGsIBJTidwhmr/nX6CiDWc9sgDVEXbwgEh2XAAAAACABbKOzKO0QFso7SxnpxeAToi2/43lHbPImC2UduVTfX9Sa49g5jPRjPSwCOM9OLVaRBXj00zx6dq0BlHafJLIA7jPTi8AnR/N/xvKO2eTSYO1bcAAAAAAgIBXCDCGnJqiAcwhpnOOzOOwdmLuYQZx2Zx2BhDkxj/YaibuV6Bn6S3TN0VaJ/mwdr0irVN4Tt4CnHpqWaP5HTV/QZwgwhpy/oOYQzNdm7x2lIN0zlt3CGeJQEZcdq24AAAAAQEAulybVS5NgyCnz9BMaqpt+sgrx6K9HHp2YuCIp8/WKosDtG1UqNqglybcp27ybcp2CyfIozVTcEhT5+nz9BziUYtj7dz6eAzVtwmQAAAFYpjoEiGuSLMwC6XJtVLk2DK8IAKciYArx6aZ49FegaSr2yrRoGKNqs16SBrk25TtTj07VoHRABcQAU5E2+NQEB2rbtEXBkVwjpIBaEVoBjl/GIb5fxiAXYrpmWwEsJ6MJ6VASwnownpUBmiLFemma9AkrRpJWjQFekla9JA3TXb8dzv8Ay203adg38/f8Yqpt6snyAw38/WF4Bmmm37doARq21xM1ba4gUQXQAWhFaAY5fxhWum7Pz9BnKezKe2vn6fP0Gcp7Mp7dmi36yDuU9mU9uAO5T2X9cAHb+uAO39cAAAHcp7cmbgA7lPbjUUXBzKezKe2vn6fP0GG+I+frVFNgaQXQAWhEBcQAXEAFqtIgAAAAAAAAAAAAArRpIBcQAXEAF0AB/9k="
                  ></img>
                </Row>
              </Container>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionInfoForm;
