import "react-native-gesture-handler";

import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import { useExpenses } from "../../context/ExpensesProvider";

import ICONS_DATA from "../../constants/icon_data";
import COLORS_DATA from "../../constants/color_data";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CategoriesPage = () => {
  const user = "Noah";
  const { addCatagory } = useExpenses();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [category, setCategory] = useState("");
  const handleColorSelect = color => setSelectedColor(color);
  const handleIconSelect = icon => setSelectedIcon(icon);
  const handleSubmit = async () => {
    const data = {
      username: user,
      category: category,
      iconname: selectedIcon.name,
      icontype: selectedIcon.type,
      color: selectedColor,
    };

    if (!user || !category || !selectedIcon?.name || !selectedIcon?.type || !selectedColor) return;

    await addCatagory(data);
  };
  return (
    <ScrollView>
      <Text>Categories</Text>
      <TextInput keyboardType="default" placeholder="Enter catagory name" value={category} onChangeText={setCategory} style={styles.input} />

      {ICONS_DATA.map((group, groupIdx) => (
        <View key={groupIdx}>
          <Text>{group.groupName}</Text>
          <View style={styles.iconContainer}>
            {group.icons.map((icon, iconIdx) => (
              <TouchableOpacity key={iconIdx} onPress={() => handleIconSelect(icon)}>
                {icon.type === "FontAwesome6" && (
                  <FontAwesome6
                    name={icon.name}
                    size={24}
                    color="white"
                    style={[
                      styles.icon,
                      selectedIcon?.type === icon.type && selectedIcon.name === icon.name ? styles.selectedIcon : null,
                      selectedColor && selectedIcon?.type === icon.type && selectedIcon.name === icon.name
                        ? { backgroundColor: selectedColor }
                        : { backgroundColor: "#D0D3D4" },
                    ]}
                  />
                )}
                {icon.type === "MaterialCommunityIcons" && (
                  <MaterialCommunityIcons
                    name={icon.name}
                    size={24}
                    color="white"
                    style={[
                      styles.icon,
                      selectedIcon?.type === icon.type && selectedIcon.name === icon.name ? styles.selectedIcon : null,
                      selectedColor && selectedIcon?.type === icon.type && selectedIcon.name === icon.name
                        ? { backgroundColor: selectedColor }
                        : { backgroundColor: "#D0D3D4" },
                    ]}
                  />
                )}
                {icon.type === "Entypo" && (
                  <Entypo
                    name={icon.name}
                    size={24}
                    color="white"
                    style={[
                      styles.icon,
                      selectedIcon?.type === icon.type && selectedIcon.name === icon.name ? styles.selectedIcon : null,
                      selectedColor && selectedIcon?.type === icon.type && selectedIcon.name === icon.name
                        ? { backgroundColor: selectedColor }
                        : { backgroundColor: "#D0D3D4" },
                    ]}
                  />
                )}
                {icon.type === "Ionicons" && (
                  <Ionicons
                    name={icon.name}
                    size={24}
                    color="white"
                    style={[
                      styles.icon,
                      selectedIcon?.type === icon.type && selectedIcon.name === icon.name ? styles.selectedIcon : null,
                      selectedColor && selectedIcon?.type === icon.type && selectedIcon.name === icon.name
                        ? { backgroundColor: selectedColor }
                        : { backgroundColor: "#D0D3D4" },
                    ]}
                  />
                )}
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
                <TouchableOpacity key={shadeIndex} style={[styles.color, { backgroundColor: shade }]} onPress={() => handleColorSelect(shade)}>
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
  selectedIcon: {
    borderWidth: 1,
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
