import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PieChart } from "react-native-gifted-charts";

const Wheel = ({ expenses }) => {
  const total = expenses.reduce((acc, expense) => acc + expense.value, 0);

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
    </View>
  );
};

export default Wheel;
