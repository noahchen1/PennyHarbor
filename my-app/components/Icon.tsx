import React from "react";
import { StyleSheet } from "react-native";
import { ICON_COMPONENTS } from "../constants/icon_data";

const Icon = ({ icon, selectedIcon, selectedColor }) => {
  const IconComponent = ICON_COMPONENTS[icon.icontype];

  return (
    <IconComponent
      name={icon.name}
      size={24}
      style={[
        styles.icon,
        selectedIcon?.icontype === icon.icontype && selectedIcon.name === icon.name
          ? styles.selectedIcon
          : null,
        selectedColor &&
        selectedIcon?.icontype === icon.icontype &&
        selectedIcon.name === icon.name
          ? { backgroundColor: selectedColor }
          : { backgroundColor: "#D0D3D4" },
      ]}
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
  selectedIcon: {
    borderWidth: 1,
  },
});

export default Icon;
