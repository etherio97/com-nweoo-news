const engMonths = [
  "January",
  "February",
  "March",
  "Aprial",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "December"
];

function convertMonth(n) {
  return engMonths[parseInt(n)] || m;
}

function convertDate(n) {
  return (n < 10 ? "0" : "") + n;
}

function engFormatDate(date) {
  if (!(date instanceof Date)) return date;
  return `${convertMonth(date.getMonth())} ${convertDate(date.getDate())}`;
}

function otherFormatDate(date, { month, day }) {
  if (!(date instanceof Date)) return date;
  return `${date.getMonth() + 1}${month} ${date.getDate()}${day}`;
}

export { engFormatDate, otherFormatDate };
