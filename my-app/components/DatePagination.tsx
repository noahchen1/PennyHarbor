import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useExpenses } from "../context/ExpensesProvider";
import getDate from "../util/getDate";
import getMonth from "../util/getMonth";
import getWeek from "../util/getWeek";
import getYear from "../util/getYear";

const DatePagination = () => {
  const { date, setDate, mode, setMode } = useExpenses();

  const incrementDate = mode => {
    const newDate = new Date(date);

    switch (mode) {
      case "Day":
        newDate.setDate(newDate.getDate() + 1);
        setDate(newDate);

        break;
      case "Week":
        newDate.setDate(newDate.getDate() + 7);
        setDate(newDate);

        break;
      case "Month":
        newDate.setMonth(newDate.getMonth() + 1);
        setDate(newDate);

        break;
      case "Year":
        newDate.setFullYear(newDate.getFullYear() + 1);
        setDate(newDate);

        break;

      default:
        break;
    }
  };

  const decrementDate = mode => {
    const newDate = new Date(date);

    switch (mode) {
      case "Day":
        newDate.setDate(newDate.getDate() - 1);
        setDate(newDate);

        break;
      case "Week":
        newDate.setDate(newDate.getDate() - 7);
        setDate(newDate);

        break;
      case "Month":
        newDate.setMonth(newDate.getMonth() - 1);
        setDate(newDate);

        break;
      case "Year":
        newDate.setFullYear(newDate.getFullYear() - 1);
        setDate(newDate);

        break;

      default:
        break;
    }
  };

  const day = getDate(date);
  const week = getWeek(date);
  const month = getMonth(date);
  const year = getYear(date);

  return (
    <View style={styles.container}>
      <View style={styles.modeContainer}>
        <TouchableOpacity onPress={() => setMode("Day")}>
          <Text style={[styles.text, mode === "Day" && styles.selectedMode]}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("Week")}>
          <Text style={[styles.text, mode === "Week" && styles.selectedMode]}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("Month")}>
          <Text style={[styles.text, mode === "Month" && styles.selectedMode]}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("Year")}>
          <Text style={[styles.text, mode === "Year" && styles.selectedMode]}>Year</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.paginationBtnContainer}>
        <TouchableOpacity onPress={() => decrementDate(mode)}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        {mode === "Day" && <Text style={styles.text}>{day}</Text>}
        {mode === "Week" && <Text style={styles.text}>{week}</Text>}
        {mode === "Month" && <Text style={styles.text}>{month}</Text>}
        {mode === "Year" && <Text style={styles.text}>{year}</Text>}
        <TouchableOpacity onPress={() => incrementDate(mode)}>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  modeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    color: "white",
  },
  paginationBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  selectedMode: {
    color: "green",
  },
});

export default DatePagination;
