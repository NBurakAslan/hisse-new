const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  type: "service_account",
  project_id: "hisse-3bde2",
  private_key_id: "309c6a336163226754d0023e6d2669f8bbb400b5",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuupmVwNhVCGDL\nPOCJPLT55aDPQQPP3kAJgU3/A+FRx4InSOEic5IRH6ng0MBVPs6vhDDBE/06Iez8\nLfSSPVbK3PLh6t1Z14UPNaFJcdtJqwNFxLL9F/xb7if1Rj1S3kkpEsUrbiUIUCS8\nDc9chQMXRuUFyJ2x6mZl8jbRwiH1skn9v6WhcTmoPXB7k2rDI0TK90lAA6KjHkc1\n2zKFQEJHAocMo2VbnmleYLmIiNF6IONuhoG2Nr6KSXMTndMQfMtr/BWFZg1fP3KF\nBB3R66ypwVDGm4KyIB3jPP3jNNs4FVOZp6Zzd3mbqTW+kX9Q5AQTOwpiIVORfPZJ\nFe4LfOKjAgMBAAECggEABILUzET6UNeyiAy+T0y972W6TR+Ela1LQfOQq/DRtGbO\nOW1sQpNxRffnTuKU1J6Wf3mOOK3nb8TIdYpKMixbPUmPC74gkN07ljTwQRErdC9y\nGi8F3/rqjQUNCwwRMT6D7QeLB6AEXL6U9DX3EJBuj/9IkmmniJxgoGkseSXl8o3o\n3GqQt6MUbUhNAQtY/IceYhV9amRzg7CuSidMl4p8sdjtNNs3d4yZG985xYTJA3LI\nDmG3jgp4QGkRgSrnAZSxinAIQBifAnHpP8w0zjxn8ka2RGi8n3vw9wDNuoH/JAmV\nmPjKBdUa5zLc8XyKYy9W4LViRZhu27k8PEcQSUNh4QKBgQDnGqp9hdzfzlh3fRcy\nNjR7m0jEMWITGNbgaN5jesKynyscJ9sCpBHy0fpPlSyXlki/HfWJqm6TCLom5v3g\nSU95fhiDmQNiURWBkyJld44KQwiKgOVdJUQbGiq5vYuTvc1+LPX7Byn7gylWyrL4\nb7JoNb6JVG1EI3Sf11U75wL1HQKBgQDBjTsc4YLKXRzpDirRFHtbdoJqcjTw9MPF\n/l+ldSUqiVYMNmu9rxDnC3EPDtAKpiUTzF073Xr2ave1JBclirPOu2tVYkSLHvhc\naX3FTENH0gua1LCLMMiTlpJ1RcdKMibnzI9TRbOpBN2n05GveDuVzlEVe3DQdxiv\nLhOF6dJqvwKBgFtU4oPw3zVjqvqt6PjjCyK+X6eJjKTXcDQHvbu6zC8jUDo0Vg1Z\nIe7ApRfGcHUH44AEKwFY5ZIeJNMy/qogztPIzY9UbU3xlXo716AZ+3x6uWljP0Hs\ndFnxoWj+S6b7n7Z5tkyarDDFyRSPzuL34Z3lf4NuZjBDgteYlgqyZSzRAoGAC1Q0\n7Y/Vk/q3QnztzKciQUxCffCJYMEy5FfrSUf+EOtQ+g4FaGji2GM3DuaTDsyCxxHj\nMynXlKzWKugd4rinpaYatji2Ql5hsycJkY7RMVb+DuX8H2mPk/PwRqT68UDWPiMf\nEIS362C5iKU9lcO32SDmZhd/lvQhob9UrTXudwkCgYAVJWqROMsEPoDu3vGXIsTw\n/yIMyI4KA7CVZVNLqZ71vU/k9NjKbIRdPlFGbOCMaW8CkkAo14XgA9u/bSi3AqdX\nWL6MxR6X0V6JAB0NQjP0b08MOi6sTpssHH/dGsUYwncP4qhJhQMdSLZjkVNJWEXC\n7H5/SX1+d8nKbPv19zit/A==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-icb7v@hisse-3bde2.iam.gserviceaccount.com",
  client_id: "107160902398072834693",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-icb7v%40hisse-3bde2.iam.gserviceaccount.com",
});

const db = firebase.firestore();

const hisselerim = [
  {
    name: "SISE",
    order: [
      {
        buy: 500,
        sell: 0,
        price: 16.34,
        total: 8170,
        comision: 16.73,
        date: 1640120400,
      },
      {
        buy: 200,
        sell: 0,
        price: 13.9,
        total: 2780,
        comision: 5.81,
        date: 1644181200,
      },
      {
        buy: 70,
        sell: 0,
        price: 13.16,
        total: 921.2,
        comision: 1.92,
        date: 1645131600,
      },
      {
        buy: 480,
        sell: 0,
        price: 11.62,
        total: 5577.6,
        comision: 11.42,
        date: 1645650000,
      },
      {
        buy: 500,
        sell: 0,
        price: 11.62,
        total: 5810,
        comision: 11.9,
        date: 1645650000,
      },
      {
        buy: 750,
        sell: 0,
        price: 12.93,
        total: 9697.5,
        comision: 19.86,
        date: 1645477200,
      },
    ],
  },
];

hisselerim
  .forEach((obj) => {
    db.collection("hisse")
      .add({
        name: obj.name,
        order: obj.order.map((ord) => {
          const obj = {
            buy: ord.buy,
            sell: ord.sell,
            price: ord.price,
            total: ord.total,
            comision: ord.comision,
            date: ord.date,
          };

          return obj;
        }),
      })
      .then((docRef) => console.log("Doc written with ID:" + docRef.name));
  })
  .catch((err) => console.log(err));
