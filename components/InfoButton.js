import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

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
    elevation: 5,
  },
  infoButtonText: {
    color: "#f1eada",
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
});