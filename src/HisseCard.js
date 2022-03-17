import React, { Component } from "react";
import Sablon from "./Sablon";
import { withRouter } from "./WithRouter";
class HisseCard extends Component {
  constructor(props) {
    super(props);
  }

  get data() {
    console.log(this.props.params);
    return this.props.findCardHisse(this.props.params.id);
  }
  render() {
    const { isData, sekerData, borsaData, mainHisse } = this.data;

    return (
      <Sablon>
        <h1>Hisse Adı:{mainHisse.name}</h1>
        <div>Sektör:{isData.AS_ALT_SEKTOR_TANIMI}</div>
        <div>Elimdeki Adet:</div>
        <div>Son Fiyat:{borsaData.dblSon}</div>
        <div>F/K:{isData.CARI_FK}</div>
        <div>PD/DD:{isData.CARI_PD_DD}</div>
        <div>FD/FAVÖK:{isData.FD_FAVOK}</div>
        <div>Maliyet/Hisse:</div>
        <div>Kar/Zarar:</div>
        <div>Yabancı Oranı:{isData.YABANCI_ORAN}</div>
        <div>Analiz</div>
        <div>İşlem Tarihçe</div>
      </Sablon>
    );
  }
}

export default withRouter(HisseCard);
