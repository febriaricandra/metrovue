import dayjs from 'dayjs'

const convertdateTime = (value) => {
  if (value) {
    return dayjs(value).format('DD MMMM YYYY, HH:mm:ss');
  }
  return "";
}

const convertdate = (value) => {
  return dayjs(value).format('DD MMMM YYYY');
}

const convertMonth = (value) => {
  return dayjs(value).format('MMMM YYYY');
}

const convertDateToString = (value) => {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");

  const month = date.toLocaleString("en-US", { month: "long" });

  const year = date.getFullYear();

  const joined = [day, month, year].join(" ");

  return joined;
}

const removeTime = (value) => {
  return dayjs(value).format('YYYY-MM-DD');
}

const convertmonth = (value) => {
  return dayjs(value).format('YYYY-MM');
}

const takemonth = (value) => {
  return dayjs(value).format('MM');
}

const takeyear = (value) => {
  return dayjs(value).format('YYYY');
}

const convertToCurrencyIDR = (value) => {
  return new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
  }).format(value)
}

const numberFormat = (value) => {
  return new Intl.NumberFormat().format(value);
}

const queryFilter = (params) => {
 let param = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&")
      
  return param.replace(/\s/g, "");
}

export { convertDateToString, convertdateTime, convertdate, removeTime, convertmonth, convertMonth, convertToCurrencyIDR, takemonth, takeyear, numberFormat, queryFilter };
