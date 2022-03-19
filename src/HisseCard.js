import React, { Component } from "react";
import Sablon from "./Sablon";
import { withRouter } from "./WithRouter";
import {tufeHesap} from "./helper.js"
class HisseCard extends Component {
  get data() {
    return this.props.findCardHisse(this.props.params.id);
  }
  render() {
    const { isData, sekerData, borsaData, mainHisse } = this.data;
    const miktar = mainHisse.order.reduce(
      (miktar, adet) => miktar + adet.buy - adet.sell,
      0
    );
    const tutar = mainHisse.order.reduce(
      (toplam, emir) =>
        toplam + (emir.buy === 0 ? -emir.total : emir.total) + emir.comision,
      0
    );
    const tutarTufe = mainHisse.order.reduce((toplam, emir) => {
      const tufeAy = this.tufeHesap(emir.date);

      return (
        toplam +
        (emir.buy === 0 ? -emir.total * tufeAy : emir.total * tufeAy) +
        emir.comision * tufeAy
      );
    }, 0);

    return (
      <Sablon>
        <h1>Hisse Adı:{mainHisse.name}</h1>
        <div>Sektör:{isData.AS_ALT_SEKTOR_TANIMI}</div>
        <div>Elimdeki Adet:{miktar}</div>
        <div>Ödenen Para:{tutar}</div>
        <div>Son Fiyat:{borsaData.dblSon}</div>
        <div>F/K:{isData.CARI_FK}</div>
        <div>PD/DD:{isData.CARI_PD_DD}</div>
        <div>FD/FAVÖK:{isData.FD_FAVOK}</div>
        <div>Maliyet/Hisse:{(tutar / miktar).toFixed(2)}</div>
        <div>Kar/Zarar:{(miktar * borsaData.dblSon - tutar).toFixed(2)}</div>
        <div>Yabancı Oranı:{isData.YABANCI_ORAN}</div>
        <div>Analiz:</div>
        <div>İşlem Tarihçe</div>
      </Sablon>
    );
  }
}

export default withRouter(HisseCard);
