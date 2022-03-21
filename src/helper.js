export const tufeHesap = (epoch, dataType) => {
  const date = new Date(epoch.toString().length === 10 ? epoch * 1000 : epoch);
  const dateNow = new Date(Date.now());
  const tufeYıl = date.getUTCFullYear();
  const tufeAy = date.getUTCMonth() + 1;
  const tufeYılNow = dateNow.getUTCFullYear();
  const tufeAyNow = dateNow.getUTCMonth() + 1;
  return dataType[tufeYılNow][tufeAyNow] / dataType[tufeYıl][tufeAy];
};

export const tarihFormatter = (epoch) => {
  const date = new Date(epoch.toString().length === 10 ? epoch * 1000 : epoch);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return day + "-" + month + "-" + year;
};

export const tarihceStr = (date, buy, sell, total, price, comision) => {
  return `Tarih:${tarihFormatter(date)} Alış/Satış:${
    buy > 0 ? buy : -sell
  } Tutar: ${
    buy > 0 ? total : -total
  } Birim Fiyat: ${price} Komisyon:${comision} `;
};

export const overallCalcu = (miktar, price, total = 0, oran = false) =>
  oran
    ? `${(((miktar * price - total) / total) * 100).toFixed(2)}%`
    : Number((miktar * price - total).toFixed(2));
