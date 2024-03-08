import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useExpenses } from "../../context/ExpensesProvider";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import getDate from "../../util/getDate";
import getYear from "../../util/getYear";

const ExpenseCategoryPage = () => {
  const navigation = useNavigation();
  const { expenseCategory, categories, getCatagories, date } = useExpenses();
  const user = "Noah";

  useEffect(() => {
    const getData = navigation.addListener("focus", () => {
      getCatagories(user);
    });

    return getData;
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
              {iconData?.icontype === "FontAwesome6" && (
                <FontAwesome6
                  name={iconData.iconname}
                  size={24}
                  color="white"
                  style={[styles.icon, { backgroundColor: iconData.color }]}
                />
              )}
              {iconData?.icontype === "MaterialCommunityIcons" && (
                <MaterialCommunityIcons
                  name={iconData.iconname}
                  size={24}
                  color="white"
                  style={[styles.icon, { backgroundColor: iconData.color }]}
                />
              )}
              {iconData?.icontype === "Entypo" && (
                <Entypo
                  name={iconData.iconname}
                  size={24}
                  color="white"
                  style={[styles.icon, { backgroundColor: iconData.color }]}
                />
              )}
              {iconData?.icontype === "Ionicons" && (
                <Ionicons
                  name={iconData.iconname}
                  size={24}
                  color="white"
                  style={[styles.icon, { backgroundColor: iconData.color }]}
                />
              )}
              <Text>{expense.text}</Text>
            </View>
            <Text>${expense.value}</Text>
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
