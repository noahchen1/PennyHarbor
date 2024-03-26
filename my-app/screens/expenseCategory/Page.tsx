import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useExpenses } from "../../context/ExpensesProvider";
import { useNavigation } from "@react-navigation/native";

import getDate from "../../util/getDate";
import getYear from "../../util/getYear";
import Icon from "../../components/Icon";

const ExpenseCategoryPage = () => {
  const navigation = useNavigation();
  const { expenseCategory, categories, getCategories, date } = useExpenses();
  const user = "Noah";

  useEffect(() => {
    const getData = navigation.addListener("focus", () => getCategories(user));

    getData();
  }, [navigation]);

  const category = expenseCategory[0].text;
  const iconData = categories.find((obj) => obj.category === category);


  return (
    <>
      {expenseCategory.map((expense, index) => (
        <View style={styles.container} key={index}>
          <Text>{`${getDate(date)}` + ` ${getYear(date)}`}</Text>
          <View style={styles.expenseContainer}>
            <View style={styles.leftContainer}>
              <Icon
                icon={iconData}
                selectedIcon={iconData}
                selectedColor={iconData.color}
              />
              <Text>{expense.text}</Text>
            </View>
            <Text>${expense.value}</Text>
          </View>
          <View>
            <Text>{expense.comment}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  icon: {
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 30,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  expenseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ExpenseCategoryPage;
