import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

// Get device dimensions for responsive styling
const { width, height } = Dimensions.get("window");

/**
 * InfoButton component renders a circular "i" button.
 * Positioned absolutely, it triggers a provided onPress handler.
 *
 * Props:
 * - onPress: function to be called when the button is pressed
 */
export default function InfoButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.infoButton} onPress={onPress}>
      <Text style={styles.infoButtonText}>i</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  infoButton: {
    position: "absolute",
    bottom: height * 0.04,
    right: width * 0.25,
    backgroundColor: "#768064",
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  infoButtonText: {
    color: "#f1eada",
    fontSize: RFValue(18), // Responsive font size
    fontWeight: "bold",
  },
});
