import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PieChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";
import DatePagination from "./DatePagination";

const Wheel = ({ expenses }) => {
  const navigation = useNavigation();
  const total = expenses.reduce((acc, expense) => acc + expense.value, 0);
  const handlePress = () => {
    navigation.navigate("AddExpense");
  };

  return (
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#232B5D",
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        Expenses
      </Text>
      <DatePagination />
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={expenses}
          donut
          showGradient
          radius={90}
          innerRadius={60}
          innerCircleColor={"#232B5D"}
          textColor="white"
          textSize={20}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                >
                  {total}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>Excellent</Text>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fdb81e",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  plusSign: {
    fontSize: 30,
  },
});

export default Wheel;
