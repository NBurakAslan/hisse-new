import React, { Component } from "react";
import Sablon from "./Sablon";
import { withRouter } from "./WithRouter";
import { tufeHesap, tarihceStr } from "./helper.js";
import { tufe, ufe } from "./srcHisse";
import MainAcordion from "./MainAcordion";

class HisseCard extends Component {
  get data() {
    return this.props.findCardHisse(this.props.params.id);
  }

  render() {
    if (this.data) {
      const {
        isData,
        sekerData,
        borsaData,
        mainHisse,
      } = this.data;
      const miktar = mainHisse.order.reduce(
        (miktar, adet) => miktar + adet.buy - adet.sell,
        0
      );
      const tutar = mainHisse.order.reduce(
        (toplam, emir) =>
          toplam +
          (emir.buy === 0 ? -emir.total : emir.total) +
          emir.comision,
        0
      );
      const tutarTufe = mainHisse.order.reduce(
        (toplam, emir) => {
          const tufeAy = tufeHesap(emir.date, tufe);

          return (
            toplam +
            (emir.buy === 0
              ? -emir.total * tufeAy
              : emir.total * tufeAy) +
            emir.comision * tufeAy
          );
        },
        0
      );

      const tarihce = mainHisse.order.map(ord => (
        <li>
          {tarihceStr(
            ord.date,
            ord.buy,
            ord.sell,
            ord.total,
            ord.price,
            ord.comision
          )}
        </li>
      ));

      return (
        <Sablon>
          <h1>Hisse Adı:{mainHisse.name}</h1>
          <div>Sektör:{isData.AS_ALT_SEKTOR_TANIMI}</div>
          <div>Elimdeki Adet:{miktar.toFixed(2)}</div>
          <div>Ödenen Para:{tutar.toFixed(2)}</div>
          <div>
            TUFE ye göre Ödenen Para:{tutarTufe.toFixed(2)}
          </div>
          <div>Son Fiyat:{borsaData.dblSon}</div>
          <div>F/K:{isData.CARI_FK}</div>
          <div>PD/DD:{isData.CARI_PD_DD}</div>
          <div>FD/FAVÖK:{isData.FD_FAVOK}</div>
          <div>
            Maliyet/Hisse:{(tutar / miktar).toFixed(2)}
          </div>
          <div>
            Kar/Zarar:
            {(miktar * borsaData.dblSon - tutar).toFixed(2)}
          </div>
          <div>Yabancı Oranı:{isData.YABANCI_ORAN}</div>
          <div>
            <h3>Analiz ve Öneri</h3>
            <div>
              <MainAcordion
                key={mainHisse.name}
                id={mainHisse.name}
                isHisse={isData}
                sekerHisse={sekerData}
              />
            </div>
          </div>
          <div>
            <h3>İşlem Tarihçe</h3>
            <ol>{tarihce}</ol>
          </div>
        </Sablon>
      );
    } else return <div />;
  }
}

export default withRouter(HisseCard);
