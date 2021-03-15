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
    "December",
  ];

  function convertMonth(n) {
    return engMonths[parseInt(n)] || m;
  }
  
  function convertDate(n) {
    return (n < 10 ? "0" : "") + n;
  }
  
  function engFormatDate (date) {
    //   let date = new Date();
    //   return engMonths[date.getMonth()] + " " + date.getDate();
    if (!(date instanceof Date)) return date;
    return `${convertMonth(date.getMonth())} - ${convertDate(date.getDate())}`;
  }

  export default engFormatDate;