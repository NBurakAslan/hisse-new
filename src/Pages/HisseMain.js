import React, { Component } from "react";
import Navbar from "../Ui/Navbar";
import Sablon from "../Ui/Sablon";
import YeniHisse from "../Components/YeniHisse";
import { withRouter } from "../Helpers/WithRouter";
import "./HisseMiniCard.css";
import { tufeHesap, overallCalcu } from "../Helpers/helper.js";
import { tufe, ufe } from "../Helpers/srcHisse";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import "./OneriList.css";

class HisseMain extends Component {
  copyfirebase = (arr) => {
    const newfirebase = arr.map((hisse) => {
      return {
        name: hisse.name,
        order: [...hisse.order],
      };
    });
    return newfirebase;
  };

  toogleFormHandle = () => {
    this.props.toogleForm();
  };

  goToHisse = (name) => {
    // this.props.findHisse(this.props.firebase.find((his) => his.name === name));

    this.props.history({ pathname: `/hisse/${name}` });
  };

  handleBrowserSave = () => {
    this.props.syncLocalStorage();
  };

  sektorFind = (arr) => {
    const sektor = arr.map((his) =>
      his.find((his) => his.name === this.props.isHisseler.title)
    );
  };

  render() {
    const { firebase, temettu } = this.props;

    //Özet için değişkenler
    let toplamOdeme = 0;
    let toplamVarlik = 0;
    let topKarZarar = 0;
    let toplamTufeOdeme = 0;
    let tufeTopKarZarar = 0;
    let topTemettu = 0;
    const hisseDetay = firebase.map((hisse) => {
      const miktar = hisse.order.reduce(
        (miktar, adet) => miktar + adet.buy - adet.sell,
        0
      );

      const hisTemettuData = temettu.find((his) => his.co === hisse.name);

      const hisseTemettuTutar = hisTemettuData
        ? miktar * hisTemettuData.dhtl
        : 0;

      const tufeTutar = hisse.order.reduce((toplam, emir) => {
        const tufeAy = tufeHesap(emir.date, tufe);

        return (
          toplam +
          (emir.buy === 0 ? -emir.total * tufeAy : emir.total * tufeAy) +
          emir.comision * tufeAy
        );
      }, 0);

      const tutar = hisse.order.reduce((toplam, emir) => {
        return (
          toplam + (emir.buy === 0 ? -emir.total : emir.total) + emir.comision
        );
      }, 0);

      const ortalama = miktar === 0 ? 0 : (tutar / miktar).toFixed(2);
      const borsa = this.props.borsa.find((his) => his.strKod === hisse.name);
      let karZarar = 0;
      let eder = 0;
      let tufeKarZarar = 0;
      if (borsa) {
        eder = overallCalcu(miktar, borsa.dblSon);
        karZarar = overallCalcu(miktar, borsa.dblSon, tutar);
        tufeKarZarar = overallCalcu(miktar, borsa.dblSon, tufeTutar);
      }

      toplamOdeme += tutar;
      toplamTufeOdeme += tufeTutar;
      toplamVarlik += eder;
      topKarZarar += karZarar;
      tufeTopKarZarar += tufeKarZarar;
      topTemettu += hisseTemettuTutar;

      return (
        <li
          className={"HisseMiniCard"}
          onClick={() => this.goToHisse(hisse.name)}
          key={hisse.name}
        >
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => this.props.removeHisse(hisse.name)}
            className="el--1"
          >
            <DeleteIcon />
          </IconButton>

          <div className="el--2">{`Hisse Adı:${hisse.name}`}</div>
          <div className="el--3">{`Miktar:${miktar}`}</div>
          <div className="el--4">{`Tutar:${tutar.toFixed(0)}`}</div>
          <div className="el--5">{`Anlık Fiyat:${borsa.dblSon}`}</div>
          <div className="el--6">{`Ortalama:${ortalama}`}</div>
          <div className="el--7">{`Kar/Zarar:${karZarar}`}</div>
        </li>
      );
    });

    return (
      <Sablon>
        <Navbar />
        <div>
          <h1>HİSSELERİM</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={this.toogleFormHandle}
          >
            Yeni Kayıt Ekle
          </Button>

          <Button variant="contained" onClick={this.handleBrowserSave}>
            Browser
          </Button>
        </div>

        {hisseDetay}
        <div className="Ozet">
          <h2>Özet</h2>
          <div>
            Toplam Ödeme:
            <span>{toplamOdeme.toFixed(0)}</span>
          </div>
          <div>
            TUFE Toplam Ödeme:
            <span>{toplamTufeOdeme.toFixed(0)}</span>
          </div>
          <div>
            Toplam Varlık:
            <span>{toplamVarlik.toFixed(0)}</span>
          </div>
          <div>
            Toplam Temettü: <span>{topTemettu.toFixed(0)}</span>
          </div>
          <div>
            Toplam Kar/Zarar: <span>{topKarZarar.toFixed(0)}</span>
          </div>
          <div>
            TUFE Toplam Kar/Zarar:
            <span>{tufeTopKarZarar.toFixed(0)}</span>
          </div>
          <div>
            Kar/Zarar Oran:
            <span>
              {(
                (topKarZarar.toFixed(0) / toplamOdeme.toFixed(0)) *
                100
              ).toFixed(2)}
            </span>
          </div>
          <div>
            TUFE Kar/Zarar Oran:
            <span>
              {" "}
              {(
                (tufeTopKarZarar.toFixed(0) / toplamTufeOdeme.toFixed(0)) *
                100
              ).toFixed(2)}
            </span>
          </div>
        </div>
        {this.props.formShow && (
          <YeniHisse
            handleClose={this.toogleFormHandle}
            saveHisse={this.props.saveHisse}
          />
        )}
      </Sablon>
    );
  }
}

export default withRouter(HisseMain);

// saveHisse = (newHisse) => {
//   const newHisseObj = {
//     name: newHisse.name,
//     order: [
//       {
//         buy: newHisse.buy,
//         sell: newHisse.sell,
//         price: newHisse.price,
//         total: newHisse.total,
//         comision: newHisse.comision,
//         date: newHisse.date,
//       },
//     ],
//   };

//   if (this.state.firebase.some((his) => his.name === newHisseObj.name)) {
//     //eğer hisse daha önce aldığım bir hisse ise

//     const degismeyenfirebase = this.state.firebase.filter(
//       (hisse) => hisse.name !== newHisseObj.name
//     );
//     const yeniHisse = this.state.firebase.find(
//       (his) => his.name === newHisseObj.name
//     );
//     console.log(degismeyenfirebase, yeniHisse);
//     yeniHisse.order = [...yeniHisse.order, newHisseObj.order[0]];

//     this.setState(
//       { firebase: [...degismeyenfirebase, yeniHisse], formShow: false }
//       // this.syncLocalStorage
//     );
//   } else {
//     //eğer hisse ilk defa aldığım bir hisse ise
//     this.setState(
//       {
//         firebase: [...this.copyfirebase(this.state.firebase), newHisseObj],
//         formShow: false,
//       }
//       // this.syncLocalStorage
//     );
//   }
// };
//browser datasına kopyala
// syncLocalStorage = () => {
//   window.localStorage.setItem("hisse", JSON.stringify(this.state.firebase));
// };
