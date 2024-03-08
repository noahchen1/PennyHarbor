import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useExpenses } from "../context/ExpensesProvider";
import { useNavigation } from "@react-navigation/native";

const Catagory = ({ expenseArr, category, total }) => {
  const { setExpenseCategory } = useExpenses();
  const navigation = useNavigation();
  const value = expenseArr.reduce((acc, item) => acc + item.value, 0);
  const percentage = Math.round((value / total) * 100) + "%";

  const dynamicStyles = {
    container: {
      backgroundColor: expenseArr[0].color,
    },
  };

  const handlePress = () => {
    setExpenseCategory(expenseArr);
    navigation.navigate("expenseCategory");
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View style={[styles.container, dynamicStyles.container]}>
        <Text style={styles.text}>{category}</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.text}>{percentage}</Text>
          <Text style={styles.text}>{value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailContainer: {
    flexDirection: "row",
    width: 80,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default Catagory;
