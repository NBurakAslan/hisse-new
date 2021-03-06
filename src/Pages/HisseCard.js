import React, { Component } from "react";
import Sablon from "../Ui/Sablon";
import { withRouter } from "../Helpers/WithRouter";
import {
  tufeHesap,
  tarihceStr,
  overallCalcu,
  tarihFormatter,
} from "../Helpers/helper.js";
import { tufe, ufe } from "../Helpers/srcHisse";
import MainAcordion from "../Components/MainAcordion";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./HisseCards.css";

class HisseCard extends Component {
  get data() {
    return this.props.findCardHisse(this.props.params.id);
  }

  render() {
    if (this.data) {
      const {
        isData = "",
        sekerData = "",
        borsaData = "",
        mainHisse = "",
        temettu = "",
      } = this.data;
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
        const tufeAy = tufeHesap(emir.date, tufe);

        return (
          toplam +
          (emir.buy === 0 ? -emir.total * tufeAy : emir.total * tufeAy) +
          emir.comision * tufeAy
        );
      }, 0);

      const tarihce = mainHisse.order.map((ord, i) => (
        <li key={i}>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={async () =>
              await this.props.orderSil(mainHisse.name, ord.date)
            }
          >
            <DeleteIcon />
          </IconButton>
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
          <div className="detay">
            <div>Sektör:{isData.AS_ALT_SEKTOR_TANIMI}</div>
            <div>Son Birim Fiyat:{borsaData.dblSon}</div>
            <div>
              Ortalamam:
              {miktar === 0 ? 0 : (tutar / miktar).toFixed(2)}
            </div>
            <div>
              Tufeye Göre Ortalamam:
              {miktar === 0 ? 0 : (tutarTufe / miktar).toFixed(2)}
            </div>
            <div>Elimdeki Adet:{miktar.toFixed(2)}</div>
            <div>
              Şu Anki Ederi:
              {overallCalcu(miktar, borsaData.dblSon)}
            </div>
            <div>Ödenen Para:{tutar.toFixed(2)}</div>
            <div>
              TUFE ye göre Ödenen Para:
              {tutarTufe.toFixed(2)}
            </div>
            <div>F/K:{isData.CARI_FK}</div>
            <div>PD/DD:{isData.CARI_PD_DD}</div>
            <div>FD/FAVÖK:{isData.FD_FAVOK}</div>
            <div>Maliyet/Hisse:{(tutar / miktar).toFixed(2)}</div>
            <div>
              Kar/Zarar:
              {overallCalcu(miktar, borsaData.dblSon, tutar)}
            </div>
            <div>
              Kar/Zarar Oran:
              {overallCalcu(miktar, borsaData.dblSon, tutar, true)}
            </div>
            <div>
              TUFE Kar/Zarar:
              {overallCalcu(miktar, borsaData.dblSon, tutarTufe)}
            </div>
            <div>
              TUFE Kar/Zarar Oran:
              {overallCalcu(miktar, borsaData.dblSon, tutarTufe, true)}
            </div>
            <div>
              Yabancı Oranı:
              {Number(isData.YABANCI_ORAN).toFixed(2)}
            </div>
            <div>Birim Temettü:{temettu.dhtl}</div>
            <div>
              Toplam Temettü Getiri:
              {(temettu.dhtl * miktar).toFixed(2)}
            </div>
            <div>
              Temettü Tarihi:
              {temettu.d ? tarihFormatter(temettu.d) : "Temettü Tarihi Yok"}
            </div>
            <div>
              Hisse Portföy Oranı:
              {`${((tutar / this.props.topTutar()) * 100).toFixed(2)}%`}
            </div>
          </div>

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
