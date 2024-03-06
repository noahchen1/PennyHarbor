import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useExpenses } from "../context/ExpensesProvider";

const DatePagination = () => {
  const { date, setDate, mode, setMode } = useExpenses();

  const incrementDate = (mode) => {
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

  const decrementDate = (mode) => {
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

  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
  };

  const getWeek = () => {
    const selectedDate = new Date(date);
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);
    const startDay = selectedDate.getDate() - selectedDate.getDay();
    const endDay = startDay + 6;

    startOfWeek.setDate(startDay);
    endOfWeek.setDate(endDay);

    const options = { month: "long", day: "numeric" };
    const formattedStartOfWeek = startOfWeek.toLocaleDateString(
      "en-US",
      options
    );
    const formattedEndOfWeek = endOfWeek.toLocaleDateString("en-US", options);

    return `${formattedStartOfWeek} - ${formattedEndOfWeek}`;
  };

  const getMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];

    return `Month of ${month}`;
  };

  const getYear = () => {
    const year = date.getFullYear();

    return `${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.modeContainer}>
        <TouchableOpacity onPress={() => setMode("Day")}>
          <Text style={[styles.text, mode === "Day" && styles.selectedMode]}>
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("Week")}>
          <Text style={[styles.text, mode === "Week" && styles.selectedMode]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("Month")}>
          <Text style={[styles.text, mode === "Month" && styles.selectedMode]}>
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("Year")}>
          <Text style={[styles.text, mode === "Year" && styles.selectedMode]}>
            Year
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.paginationBtnContainer}>
        <TouchableOpacity onPress={() => decrementDate(mode)}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        {mode === "Day" && <Text style={styles.text}>{getDate()}</Text>}
        {mode === "Week" && <Text style={styles.text}>{getWeek()}</Text>}
        {mode === "Month" && <Text style={styles.text}>{getMonth()}</Text>}
        {mode === "Year" && <Text style={styles.text}>{getYear()}</Text>}
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
