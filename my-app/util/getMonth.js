import MONTH_DATA from "../constants/month_data";

const getMonth = date => {
  const month = MONTH_DATA[date.getMonth()];

  return `Month of ${month}`;
};

export default getMonth;
