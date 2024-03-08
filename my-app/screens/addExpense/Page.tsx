import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import { useExpenses } from "../../context/ExpensesProvider";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AddExpensePage = () => {
  const navigation = useNavigation();

  const { addExpense, getExpense, getCatagories, categories } = useExpenses();
  const user = "Noah";

  const [amt, setAmt] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [data, setData] = useState({
    username: "Noah",
    text: "",
    value: 0,
    color: "#8ba6ca",
    date: "2024-02-29",
  });



  const handleAddExpense = async () => {
    await addExpense(data);

    await getExpense(user);
    navigation.navigate("Home");
  };

  const handleCatagory = (category) => setCategory(category);

  const onChangeDatePikcer = (event, selectedDate) => {
    const currentDate = selectedDate;

    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  useEffect(() => {
    const getData = navigation.addListener("focus", () => {
      getCatagories(user);
    });

    return getData;
  }, [navigation]);

  useEffect(() => {
    setData({
      username: "Noah",
      text: category.category,
      value: parseInt(amt),
      color: category.color,
      date: formatDateString(date),
    });
  }, [amt, category, date]);

  return (
    <View>
      <Text>Add your expense!</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        value={amt}
        onChangeText={setAmt}
      />
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.category}
            onPress={() => handleCatagory(category)}
          >
            {category.icontype === "FontAwesome6" && (
              <FontAwesome6
                name={category.iconname}
                size={24}
                color="white"
                style={[styles.icon, { backgroundColor: category.color }]}
              />
            )}
            {category.icontype === "MaterialCommunityIcons" && (
              <MaterialCommunityIcons
                name={category.iconname}
                size={24}
                color="white"
                style={[styles.icon, { backgroundColor: category.color }]}
              />
            )}
            {category.icontype === "Entypo" && (
              <Entypo
                name={category.iconname}
                size={24}
                color="white"
                style={[styles.icon, { backgroundColor: category.color }]}
              />
            )}
            {category.icontype === "Ionicons" && (
              <Ionicons
                name={category.iconname}
                size={24}
                color="white"
                style={[styles.icon, { backgroundColor: category.color }]}
              />
            )}

            <Text>{category.category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dateContainer}>
        <Button
          title="Show date picker!"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDatePikcer}
          />
        )}
      </View>
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
  selectedIcon: {
    borderWidth: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
  },
  category: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  dateContainer: {
    marginVertical: 10,
  },
});

export default AddExpensePage;
