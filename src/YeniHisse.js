import React, { Component } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DatePicker from "./DatePicker";

class YeniHisse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      name: "",
      buy: 0.0,
      sell: 0.0,
      price: 0.0,
      total: 0.0,
      comision: 0.0,
      date: 0,
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule(
      "letter",
      (value) => value.length > 3 && value.length < 6
    );
    ValidatorForm.addValidationRule(
      "number",
      (value) => typeof value === "number"
    );
    ValidatorForm.addValidationRule(
      "string",
      (value) => typeof value === "string"
    );
    ValidatorForm.addValidationRule("satis", (value) => this.state.buy === 0);
    ValidatorForm.addValidationRule("alis", (value) => this.state.sell === 0);
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value.toUpperCase(),
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: +e.target.value,
    });
  };

  handleChangeDate = (value) => {
    this.setState({
      date: value.getTime(),
    });
  };

  objSave = (newHisse) => {
    const newHisseObj = {
      name: newHisse.name,
      order: [
        {
          buy: newHisse.buy,
          sell: newHisse.sell,
          price: newHisse.price,
          total: newHisse.total,
          comision: newHisse.comision,
          date: newHisse.date,
        },
      ],
    };

    return newHisseObj;
  };

  kaydet = () => {
    this.props.saveHisse(this.objSave(this.state));
  };
  render() {
    const { stage } = this.state;

    return (
      <div>
        <Dialog open={stage === "form"} onClose={this.handleClose}>
          <DialogTitle>
            Yeni Hisse Alış ve Satış Girişlerinin Yapıldığı Ekran
          </DialogTitle>
          <ValidatorForm onSubmit={() => this.kaydet()}>
            <DialogContent>
              <DialogContentText>Yeni Hisse Alış ve Satış</DialogContentText>
              <TextValidator
                label="Hisse Adı"
                value={this.state.name}
                name="name"
                onChange={this.handleChangeName}
                fullWidth
                margin="normal"
                validators={["required", "letter", "string"]}
                errorMessages={[
                  "Hisse ismi girin lütfen",
                  "Hisse isimleri 4 yada 5 karakterdir",
                  "Sayı girilemez",
                ]}
              />
              <TextValidator
                label="Hisse Miktarı Alış"
                value={this.state.buy}
                name="buy"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "number", "alis"]}
                errorMessages={[
                  "Hisse Adeti girin",
                  "Sayı girilmesi lazım",
                  "Satış alanı 0 değilken giriş yapılamaz",
                ]}
              />

              <TextValidator
                label="Hisse Miktarı Satış"
                value={this.state.sell}
                name="sell"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "number", "alis"]}
                errorMessages={[
                  "Hisse adedi girin",
                  "Sayı girilmesi lazım",
                  "Alış alanı 0 değilken giriş yapılamaz",
                ]}
              />
              <TextValidator
                label="Hisse fiyatı"
                value={this.state.price}
                name="price"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "number"]}
                errorMessages={["Fiyat Giriniz", "Sayı girilmesi lazım"]}
              />
              <TextValidator
                label="Hisse Tutar "
                value={this.state.total}
                name="total"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "number"]}
                errorMessages={["Tutar Giriniz", "Sayı girilmesi lazım"]}
              />
              <TextValidator
                label="Hisse Komisyon "
                value={this.state.comision}
                name="comision"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "number"]}
                errorMessages={["Komisyon Giriniz", "Sayı girilmesi lazım"]}
              />

              <DatePicker handleChangeDate={this.handleChangeDate} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose}>Kapat</Button>
              <Button variant="contained" color="primary" type="submit">
                Yeni Hisse Kaydet
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default YeniHisse;
