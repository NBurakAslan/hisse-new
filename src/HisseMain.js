import React, { Component } from "react";
import Navbar from "./Navbar";
import Sablon from "./Sablon";
import YeniHisse from "./YeniHisse";
import { withRouter } from "./WithRouter";
import "./HisseMiniCard.css";
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

  toogleFormHandle = () => {
    this.props.toogleForm();
  };

  goToHisse = (name) => {
    this.props.findHisse(this.props.firebase.find((his) => his.name === name));

    this.props.history({ pathname: `/hisse/${name}` });
  };

  handleBrowserSave=()=>{this.props.syncLocalStorage()}

  render() {
    const { firebase } = this.props;
    

    //Özet için değişkenler 
    let toplamOdeme = 0;
    let toplamVarlik = 0;
    let topKarZarar = 0;

    const hisseDetay = firebase.map((hisse) => {
      const miktar = hisse.order.reduce(
        (miktar, adet) => miktar + adet.buy - adet.sell,
        0
      );

      const tutar = hisse.order.reduce(
        (toplam, emir) =>
          toplam + (emir.buy === 0 ? -emir.total : emir.total) + emir.comision,
        0
      );
      const ortalama = miktar === 0 ? 0 : (tutar / miktar).toFixed(2);
      const borsa = this.props.borsa.find(his=>his.strKod===hisse.name);
      let karZarar = 0;
      let eder = 0;
      if (borsa) {
        eder = miktar * borsa.dblSon;

        karZarar = miktar === 0 ? 0 - tutar : eder - tutar;
      }

      toplamOdeme += tutar;
      toplamVarlik += eder;
      topKarZarar += karZarar;
      
      const dataString=`Hisse Adı:${hisse.name}- Miktar:${miktar}- Tutar:${tutar.toFixed(0)}-Ortalama:${ortalama}- Kar/Zarar:${karZarar.toFixed(0)}`

      return (
        <li className={"HisseMiniCard"} onClick={() => this.goToHisse(hisse.name)} key={hisse.name} >
         {dataString}
        </li>
      );
    });
    return (
      <Sablon>
        <Navbar />
        <div>
          <h1>HİSSELERİM</h1>
          <button onClick={this.toogleFormHandle}>Kaydet</button>
          <button onClick={this.handleBrowserSave}>Browser</button>
        </div>

        {hisseDetay}
        <div>
          <h2>Özet</h2>
          <div>Toplam Ödeme: {toplamOdeme.toFixed(0)}</div>
          <div>Toplam Varlık: {toplamVarlik.toFixed(0)}</div>
          <div>Toplam Kar/Zarar: {topKarZarar.toFixed(0)}</div>
          <div>Kar/Zarar Oran: {((topKarZarar.toFixed(0)/toplamOdeme.toFixed(0))*100).toFixed(2)}</div>
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
