import React from "react";
import { StyleSheet } from "react-native";

const Icon = ({ iconComponents, category }) => {
  const IconComponent = iconComponents[category.icontype];
  return (
    <IconComponent
      name={category.iconname}
      size={24}
      color="white"
      style={[styles.icon, { backgroundColor: category.color }]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 30,
    marginVertical: 5,
  },
});

export default Icon;
