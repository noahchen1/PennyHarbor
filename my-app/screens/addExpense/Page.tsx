import React, { useEffect, useState } from "react";

import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { useExpenses } from "../../context/ExpensesProvider";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import formatDateString from "../../util/formatDateString";
import DateTimePicker from "@react-native-community/datetimepicker";
import EXPENSE_DATA from "../../constants/expense_data";

const AddExpensePage = () => {
  const navigation = useNavigation();
  const user = "Noah";

  const { addExpense, getCategories, categories, expenses } = useExpenses();
  const [expenseAmt, setExpenseAmt] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [comment, setComment] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newData, setNewData] = useState({});

  const handleAddExpense = () => {
    addExpense(newData);

    navigation.navigate("Home");
  };

  const handleCatagory = (category) => setExpenseCategory(category);

  const onChangeDatePikcer = (event, selectedDate) => {
    const currentDate = selectedDate;

    setShowDatePicker(false);
    setExpenseDate(currentDate);
  };

  useEffect(() => {
    const getCategoryData = navigation.addListener("focus", () => {
      getCategories(user);
    });

    return getCategoryData;
  }, [navigation]);

  useEffect(() => {
    const username = user;
    const text = expenseCategory.category;
    const value = parseInt(expenseAmt);
    const color = expenseCategory.color;
    const date = formatDateString(expenseDate);
    const data = new EXPENSE_DATA(username, text, value, color, date, comment);

    setNewData(data);
  }, [expenseAmt, expenseCategory, expenseDate, comment]);

  return (
    <View>
      <Text>Add your expense!</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        value={expenseAmt}
        onChangeText={setExpenseAmt}
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
            value={expenseDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDatePikcer}
          />
        )}
      </View>
      <TextInput
        style={styles.comment}
        placeholder="comment"
        value={comment}
        onChangeText={setComment}
      />
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
  comment: {
    marginVertical: 20,
  },
});

export default AddExpensePage;
