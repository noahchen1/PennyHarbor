import React, { useEffect, useState, useCallback } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { useExpenses } from "../../context/ExpensesProvider";
import { useAuth } from "../../context/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import formatDateString from "../../util/formatDateString";
import DateTimePicker from "@react-native-community/datetimepicker";
import EXPENSE_DATA from "../../constants/expense_data";
import Icon from "../../components/Icon";

const AddExpensePage = () => {
  const navigation = useNavigation();
  const { addExpense, getCategories, categories } = useExpenses();
  const { user, selectedAccount } = useAuth();

  const [expenseAmt, setExpenseAmt] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [comment, setComment] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newData, setNewData] = useState({});

  const handleCatagory = (category) => setExpenseCategory(category);

  const handleAddExpense = () => {
    addExpense(newData);

    navigation.navigate("Home");
  };

  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || expenseDate;

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
    const accountId = selectedAccount.id;
    const data = new EXPENSE_DATA(username, text, value, color, date, comment, accountId);

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
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.categoryContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.category}
            onPress={() => handleCatagory(item)}
          >
            <Icon
              icon={item}
              selectedIcon={expenseCategory}
              selectedColor={expenseCategory.color}
            />
          </TouchableOpacity>
        )}
      />
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
            onChange={onChangeDatePicker}
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
  selectedIcon: {
    borderWidth: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    marginVertical: 20,
    width: "100%",
    justifyContent: "flex-start",
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
