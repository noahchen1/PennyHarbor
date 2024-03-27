const getSelectedExpenses = (expenses, date, dateDisplay, selectedAccount) => {
  const currentExpenses = expenses[selectedAccount?.id];

  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
  };

  const getEndOfWeek = (date) => {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() - date.getDay() + 6);
    return endOfWeek;
  };

  const getStartOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const getEndOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  const selectedExpenses = currentExpenses?.filter((expense) => {
    const timestamp = new Date(expense.date);

    switch (dateDisplay) {
      case "Day":
        return (
          date.getDate() === timestamp.getDate() &&
          date.getMonth() === timestamp.getMonth() &&
          date.getFullYear() === timestamp.getFullYear()
        );

      case "Week":
        const startOfWeek = getStartOfWeek(date);
        const endOfWeek = getEndOfWeek(date);
        return timestamp >= startOfWeek && timestamp <= endOfWeek;

      case "Month":
        const startOfMonth = getStartOfMonth(date);
        const endOfMonth = getEndOfMonth(date);
        return timestamp >= startOfMonth && timestamp <= endOfMonth;

      case "Year":
        return date.getFullYear() === timestamp.getFullYear();

      default:
        return false;
    }
  });

  return selectedExpenses;
};

export default getSelectedExpenses;
