const getGroupExpenses = (selectedExpenses) => {
  const groupExpenses = selectedExpenses.reduce((acc, item) => {
    if (!acc[item.text]) {
      acc[item.text] = [];
    }

    acc[item.text].push(item);

    return acc;
  }, {});

  return groupExpenses;
};

export default getGroupExpenses;
