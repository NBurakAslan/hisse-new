import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import OneriList from "./Pages/OneriList";
import "./App.css";
import HisseMain from "./Pages/HisseMain";
import { FIREBASE, DATABASE } from "./Helpers/Config";
import axios from "axios";
import HisseCard from "./Pages/HisseCard";
import { withRouter } from "./Helpers/WithRouter";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { tufe, ufe } from "./Helpers/srcHisse";
import { data } from "./Helpers/data.js";

const app = initializeApp(FIREBASE);
const database = getDatabase(app);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tumHisse: [],
      isHisseler: [],
      sekerHisseler: [],
      borsa: [],
      cardData: "",
      firebase: [],
      formShow: false,
      temettu: "",
    };
    this.app = initializeApp(FIREBASE);
    this.database = getDatabase(app);
  }
  async componentDidMount() {
    //firebase Data
    // const firebase = await this.getFirebase(FIREBASE, "/burak/");
    // //sekerbank hisse yorumları api yok site html ini parse ediyorum
    // const sekerHisseler = await this.getFirebase(FIREBASE, "/Seker/");
    // const dataBase = await axios.get(DATABASE).then((data) => data.data);
    // const borsa = dataBase.borsa.flat();
    // const isHisseler = dataBase.isHisseler;
    // const temettu = dataBase.temettu;

    const borsa = data.borsa.flat();
    const isHisseler = data.isHisseler;
    const sekerHisseler = data.sekerHisseler;
    const firebase = data.firebase;
    const temettu = data.temettu;
    const cardData = firebase.map((his) => {
      const data = {
        isData: isHisseler.find((val) => val.Title === his.name),
        sekerData: sekerHisseler.find((val) => val[0] === his.name),
        borsaData: borsa.find((val) => val.strKod === his.name),
        mainHisse: his,
        temettu: temettu.find((val) => val.co === his.name),
      };
      return data;
    });

    this.setState({
      tumHisse: isHisseler.map((val) => val.Title),
      isHisseler,
      sekerHisseler,
      borsa,
      firebase: firebase,
      cardData,
      temettu,
    });
  }

  toogleForm = () => {
    this.setState({ formShow: !this.state.formShow });
  };
  //firebase de hisselerimin datası fonksiyonu
  getFirebase = async (url, refer) => {
    const app = initializeApp(url);
    const database = getDatabase(app);
    const dbref = ref(database);
    const data = await get(child(dbref, refer)).then((snapshot) =>
      snapshot.val()
    );

    return data;
  };

  // getFirebase = async () => (await fetch(`${FIREBASE}/burak/`)).text();
  // getpage, tableToJson ve stripHtml ile html deki tabloyu parse ediyorum

  //yardımcı fonksiyon
  copyhisseler = (arr) => {
    const newhisseler = arr.map((hisse) => {
      return {
        name: hisse.name,
        order: [...hisse.order],
      };
    });
    return newhisseler;
  };

  //yeni hisse yada order ekle

  saveHisse = async (newHisseObj) => {
    if (this.state.firebase.some((his) => his.name === newHisseObj.name)) {
      //eğer hisse daha önce aldığım bir hisse ise

      const degismeyenHisseler = this.state.firebase.filter(
        (hisse) => hisse.name !== newHisseObj.name
      );
      const yeniHisse = this.state.firebase.find(
        (his) => his.name === newHisseObj.name
      );

      yeniHisse.order = [...yeniHisse.order, newHisseObj.order[0]];

      this.firebaseChangeSuccess(degismeyenHisseler, yeniHisse);
    } else {
      //eğer hisse ilk defa aldığım bir hisse ise
      this.firebaseChangeSuccess(
        this.copyhisseler(this.state.firebase),
        newHisseObj
      );
    }
  };

  //hisse sil

  removeHisse = async (name) => {
    const degismeyenHisseler = this.state.firebase.filter(
      (hisse) => hisse.name !== name
    );
    this.firebaseChangeSuccess(degismeyenHisseler);
  };

  //Order Sil
  orderSil = async (name, epoch) => {
    //eğer hisse daha önce aldığım bir hisse ise

    const degismeyenHisseler = this.state.firebase.filter(
      (hisse) => hisse.name !== name
    );
    const yeniHisse = this.state.firebase.find((his) => his.name === name);

    const yeniHisseOrder = yeniHisse.order.filter((ord) => ord.date !== epoch);

    yeniHisse.order = [...yeniHisseOrder];
    this.firebaseChangeSuccess(degismeyenHisseler, yeniHisse);
  };

  firebaseSave = async (obj) => {
    let setDataSuccess = true;
    try {
      await set(ref(this.database, "/burak/"), obj);
    } catch (err) {
      console.log(err);
      setDataSuccess = false;
    }
    return setDataSuccess;
  };

  findCardHisse = (name) => {
    if (this.state.cardData)
      return this.state.cardData.find((his) => his.borsaData.strKod === name);
  };

  firebaseChangeSuccess = async (mainArr, newHisse) => {
    let arr = [];
    newHisse ? (arr = [...mainArr, newHisse]) : (arr = mainArr);

    if (await this.firebaseSave(arr))
      this.setState(
        {
          firebase: arr,
          formShow: false,
        },
        this.syncLocalStorage
      );
    else alert("database değiştirilemedi sonra tekrar deneyin");
  };
  syncLocalStorage = () => {
    window.localStorage.setItem("burakData", JSON.stringify(this.state));
  };

  topTutar = () => {
    return this.state.firebase.reduce((tutar, his) => {
      return (
        Number(tutar) +
        Number(
          his.order.reduce((tutar2, emir) => {
            return (
              Number(tutar2) +
              Number(emir.comision) +
              Number(emir.buy === 0 ? -emir.total : emir.total)
            );
          }, 0)
        )
      );
    }, 0);
  };

  render() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <HisseMain
              {...this.state}
              findHisse={this.findHisse}
              saveHisse={this.saveHisse}
              toogleForm={this.toogleForm}
              syncLocalStorage={this.syncLocalStorage}
              removeHisse={this.removeHisse}
            />
          }
        />
        <Route path="/oneri" element={<OneriList {...this.state} />} />
        <Route
          path="/hisse/:id"
          element={
            <HisseCard
              findCardHisse={this.findCardHisse}
              topTutar={this.topTutar}
              orderSil={this.orderSil}
            />
          }
        />
      </Routes>
    );
  }
}

export default withRouter(App);

// const borsa = await axios.get(`${BORSA}.json`).then((data) => data.data);

// //is Hisseler data
// const sektor = ["00", "0001", "0040", "0015", "0019"];
// const isHisseler = (await Promise.all(
//   sektor.map(async (sek) => {
//     const data = await axios.get(`${ISBNKURL}${sek}&takip=Yes&yil=1`);

//     return data.data.value;
//   })
// )).flat();

// hisse.data.value.forEach((val) => val.ACIKLAMA_TR.replace(/"/g, ""));

// findHisse = mainHisseObj => {
//   const cardHisseData = {
//     isData: this.state.isHisseler.find(
//       val => val.Title === mainHisseObj.name
//     ),
//     sekerData: this.state.sekerHisseler.find(
//       val => val[0] === mainHisseObj.name
//     ),
//     borsaData: this.state.borsa.find(
//       his => his.strKod === mainHisseObj.name
//     ),
//     mainHisse: mainHisseObj,
//   };

//   this.setState({ cardData: cardHisseData });
// };
