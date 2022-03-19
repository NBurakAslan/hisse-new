export const tufeHesap = (epoch, dataType) => {
  const date = new Date(epoch.toString().length === 10 ? epoch * 1000 : epoch);
  const tufeYıl = date.getUTCFullYear();
  const tufeAy = date.getUTCMonth() + 1;

  return (dataType[tufeYıl][tufeAy] + 100) / 100;
};
