import React, { Component } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import DatePicker from "./DatePicker";

class YeniHisse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      name: "",
      buy: 0,
      sell: 0,
      price: 0,
      total: 0,
      comision: 0,
      date: Date.now(),
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule(
      "letter",
      value => value.length > 3 && value.length < 6
    );
    ValidatorForm.addValidationRule(
      "number",
      value => typeof value === "number"
    );
    ValidatorForm.addValidationRule(
      "string",
      value => typeof value === "string"
    );
    // ValidatorForm.addValidationRule(
    //   "satis",
    //   value => this.state.buy === 0
    // );
    // ValidatorForm.addValidationRule(
    //   "alis",
    //   value => this.state.sell === 0
    // );
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value.toUpperCase(),
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: +e.target.value,
    });
  };

  handleChangeDate = value => {
    this.setState({
      date: value.getTime(),
    });
  };

  objSave = newHisse => {
    const newHisseObj = {
      name: newHisse.name,
      order: [
        {
          buy: +newHisse.buy,
          sell: +newHisse.sell,
          price: +newHisse.price,
          total: +newHisse.total,
          comision: +newHisse.comision,
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
        <Dialog
          open={stage === "form"}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Yeni Hisse Al???? ve Sat???? Giri??lerinin Yap??ld??????
            Ekran
          </DialogTitle>
          <ValidatorForm onSubmit={() => this.kaydet()}>
            <DialogContent>
              <DialogContentText>
                Yeni Hisse Al???? ve Sat????
              </DialogContentText>
              <TextValidator
                label='Hisse Ad??'
                value={this.state.name}
                name='name'
                onChange={this.handleChangeName}
                fullWidth
                margin='normal'
                validators={[
                  "required",
                  "letter",
                  "string",
                ]}
                errorMessages={[
                  "Hisse ismi girin l??tfen",
                  "Hisse isimleri 4 yada 5 karakterdir",
                  "Say?? girilemez",
                ]}
              />
              <TextValidator
                label='Hisse Miktar?? Al????'
                value={this.state.buy}
                type='number'
                name='buy'
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={["required", "number"]}
                errorMessages={[
                  "Hisse Adeti girin",
                  "Say?? girilmesi laz??m",
                ]}
              />

              <TextValidator
                label='Hisse Miktar?? Sat????'
                value={this.state.sell}
                name='sell'
                type='number'
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={["required", "number"]}
                errorMessages={[
                  "Hisse adedi girin",
                  "Say?? girilmesi laz??m",
                ]}
              />
              <TextValidator
                label='Hisse fiyat??'
                value={this.state.price}
                name='price'
                type='number'
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={["required", "number"]}
                errorMessages={[
                  "Fiyat Giriniz",
                  "Say?? girilmesi laz??m",
                ]}
              />
              <TextValidator
                label='Hisse Tutar '
                value={this.state.total}
                name='total'
                type='number'
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={["required", "number"]}
                errorMessages={[
                  "Tutar Giriniz",
                  "Say?? girilmesi laz??m",
                ]}
              />
              <TextValidator
                label='Hisse Komisyon '
                value={this.state.comision}
                name='comision'
                type='number'
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={["required", "number"]}
                errorMessages={[
                  "Komisyon Giriniz",
                  "Say?? girilmesi laz??m",
                ]}
              />

              <DatePicker
                handleChangeDate={this.handleChangeDate}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose}>
                Kapat
              </Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >
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
