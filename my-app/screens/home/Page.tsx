import "react-native-gesture-handler";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Wheel from "../wheel/Page";

const HomePage = () => {
  const expense = [
    { text: "Food", value: 200, color: "#FF5733" },
    { text: "Transportation", value: 300, color: "#33FF57" },
    { text: "Entertainment", value: 150, color: "#5733FF" },
    { text: "Groceries", value: 250, color: "#009FFF" },
  ];

  return (
    <View>
      <Text>Home Page!!</Text>
      <Wheel expenses={expense} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomePage;
