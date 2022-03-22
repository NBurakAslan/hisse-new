import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import OneriList from "./OneriList";
import "./App.css";
import HisseMain from "./HisseMain";
import { FIREBASE } from "./Config";
import axios from "axios";
import HisseCard from "./HisseCard";
import { withRouter } from "./WithRouter";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  get,
} from "firebase/database";
import { hisselerim, tufe, ufe } from "./srcHisse";
import { data } from "./data.js";

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
  }
  async componentDidMount() {
    //firebase Data
    // const firebase = await this.getFirebase(
    //   FIREBASE,
    //   "/burak/"
    // );
    // //sekerbank hisse yorumları api yok site html ini parse ediyorum
    // const sekerHisseler = await this.getFirebase(
    //   FIREBASE,
    //   "/Seker/"
    // );

    // const dataBase = await axios
    //   .get("https://nameless-badlands-21842.herokuapp.com/")
    //   .then(data => data.data);

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
      firebase: firebase || hisselerim,
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

      if (
        await this.firebaseSave([
          ...this.copyhisseler(this.state.firebase),
          newHisseObj,
        ])
      ) {
        this.setState(
          {
            firebase: [...degismeyenHisseler, yeniHisse],
            formShow: false,
          },
          this.syncLocalStorage
        );
      } else {
        alert("database değiştirilemedi sonra tekrar deneyin");
      }
    } else {
      //eğer hisse ilk defa aldığım bir hisse ise

      if (
        await this.firebaseSave([
          ...this.copyhisseler(this.state.firebase),
          newHisseObj,
        ])
      ) {
        this.setState(
          {
            firebase: [...this.copyhisseler(this.state.firebase), newHisseObj],
            formShow: false,
          },
          this.syncLocalStorage
        );
      } else {
        alert("database değiştirilemedi sonra tekrar deneyin");
      }
    }
  };

  //hisse sil

  removeHisse = async (newHisseObj) => {
    const degismeyenHisseler = this.state.firebase.filter(
      (hisse) => hisse.name !== newHisseObj.name
    );

    if (await this.firebaseSave([...this.copyhisseler(degismeyenHisseler)])) {
      this.setState({
        firebase: [...degismeyenHisseler],
        formShow: false,
      });
    } else {
      alert("database değiştirilemedi sonra tekrar deneyin");
    }
  };

  firebaseSave = async (obj) => {
    let error = true;
    try {
      const app = initializeApp(FIREBASE);
      const database = getDatabase(app);
      await set(ref(database, "/burak/"), obj);
    } catch (err) {
      console.log(err);
      error = false;
    }
    return error;
  };

  //Order Sil

  findCardHisse = (name) => {
    if (this.state.cardData) {
      return this.state.cardData.find((his) => his.borsaData.strKod === name);
    }
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
