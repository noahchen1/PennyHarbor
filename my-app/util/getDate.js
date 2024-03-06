import MONTH_DATA from "../constants/month_data";

const getDate = date => {
  const month = MONTH_DATA[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
};

export default getDate;
