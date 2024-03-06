const getWeek = date => {
  const selectedDate = new Date(date);
  const startOfWeek = new Date(date);
  const endOfWeek = new Date(date);
  const startDay = selectedDate.getDate() - selectedDate.getDay();
  const endDay = startDay + 6;

  startOfWeek.setDate(startDay);
  endOfWeek.setDate(endDay);

  const options = { month: "long", day: "numeric" };
  const formattedStartOfWeek = startOfWeek.toLocaleDateString("en-US", options);
  const formattedEndOfWeek = endOfWeek.toLocaleDateString("en-US", options);

  return `${formattedStartOfWeek} - ${formattedEndOfWeek}`;
};

export default getWeek;
