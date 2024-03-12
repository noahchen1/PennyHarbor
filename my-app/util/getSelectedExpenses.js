const getSelectedExpenses = (expenses, date, dateDisplay) => {
  const selectedExpenses = expenses?.filter((expense) => {

    const timestamp = new Date(expense.date);

    switch (dateDisplay) {
      case "Day":
        return (
          date.getDate() === timestamp.getDate() &&
          date.getMonth() === timestamp.getMonth() &&
          date.getFullYear() === timestamp.getFullYear()
        );

      case "Week":
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());

        const endOfWeek = new Date(date);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return expense.date >= startOfWeek && expense.date <= endOfWeek;

      case "Month":
        return (
          date.getMonth() === timestamp.getMonth() &&
          date.getFullYear() === timestamp.getFullYear()
        );

      case "Year":
        return date.getFullYear() === timestamp.getFullYear();

      default:
        return false;
    }
  });

  return selectedExpenses;
};

export default getSelectedExpenses;
