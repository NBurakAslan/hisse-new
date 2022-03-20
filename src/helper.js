export const tufeHesap = (epoch, dataType) => {
  const date = new Date(
    epoch.toString().length === 10 ? epoch * 1000 : epoch
  );
  const tufeYıl = date.getUTCFullYear();
  const tufeAy = date.getUTCMonth() + 1;

  return (dataType[tufeYıl][tufeAy] + 100) / 100;
};

export const tarihFormatter = epoch => {
  const date = new Date(
    epoch.toString().length === 10 ? epoch * 1000 : epoch
  );
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return day + "-" + month + "-" + year;
};

export const tarihceStr = (
  date,
  buy,
  sell,
  total,
  price,
  comision
) => {
  return `Tarih:${tarihFormatter(date)} Alış/Satış:${
    buy > 0 ? buy : sell
  } Tutar: ${total} Birim Fiyat: ${price} Komisyon:${comision} `;
};

export const overallCalcu = (
  miktar,
  price,
  total = 0,
  oran = false
) =>
  oran
    ? `${(((miktar * price - total) / total) * 100).toFixed(
        2
      )}%`
    : Number((miktar * price - total).toFixed(2));
