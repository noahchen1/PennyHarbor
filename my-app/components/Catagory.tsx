import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Catagory = ({ expenseArr, category, total }) => {
  console.log(expenseArr);
  const value = expenseArr.reduce((acc, item) => acc + item.value, 0);
  const percentage = Math.round((value / total) * 100) + "%";

  const dynamicStyles = {
    container: {
      backgroundColor: expenseArr[0].color,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={styles.text}>{category}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.text}>{percentage}</Text>
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
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
