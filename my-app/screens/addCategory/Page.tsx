import "react-native-gesture-handler";

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { useExpenses } from "../../context/ExpensesProvider";

import { ICONS_DATA } from "../../constants/icon_data";
import COLORS_DATA from "../../constants/color_data";
import Icon from "../../components/Icon";

import { FontAwesome5 } from "@expo/vector-icons";

const CategoriesPage = () => {
  const { addCatagory } = useExpenses();
  const { user } = useAuth();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [category, setCategory] = useState("");
  const handleColorSelect = (color) => setSelectedColor(color);
  const handleIconSelect = (icon) => setSelectedIcon(icon);
  const handleSubmit = async () => {
    const data = {
      username: user,
      category: category,
      iconname: selectedIcon.name,
      icontype: selectedIcon.icontype,
      color: selectedColor,
    };

    if (
      !user ||
      !category ||
      !selectedIcon?.name ||
      !selectedIcon?.icontype ||
      !selectedColor
    ) {
      console.log('oh no!')
      return;

    }

    await addCatagory(data);
  };

  return (
    <ScrollView>
      <Text>Categories</Text>
      <TextInput
        keyboardType="default"
        placeholder="Enter catagory name"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      {ICONS_DATA.map((group, groupIdx) => (
        <View key={groupIdx}>
          <Text>{group.groupName}</Text>
          <View style={styles.iconContainer}>
            {group.icons.map((icon, iconIdx) => (
              <TouchableOpacity
                key={iconIdx}
                onPress={() => handleIconSelect(icon)}
              >
                <Icon
                  icon={icon}
                  selectedIcon={selectedIcon}
                  selectedColor={selectedColor}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <View>
        <Text>Color</Text>
        <View style={styles.colorContainer}>
          {COLORS_DATA.map((color, colorIndex) => (
            <View key={colorIndex} style={styles.shadeContainer}>
              {color.map((shade, shadeIndex) => (
                <TouchableOpacity
                  key={shadeIndex}
                  style={[styles.color, { backgroundColor: shade }]}
                  onPress={() => handleColorSelect(shade)}
                >
                  {selectedColor === shade && (
                    <View style={styles.checkmarkContainer}>
                      <FontAwesome5 name="check" size={24} color="white" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  shadeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    justifyContent: "space-around",
  },
  color: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  checkmarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default CategoriesPage;
