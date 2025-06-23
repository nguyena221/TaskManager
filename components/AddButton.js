import React, { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default function AddButton({ onPress }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.button, { transform: [{ rotate: spin }] }]}>
        <Text style={styles.plus}>+</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: normalize(30),
    right: normalize(30),
    backgroundColor: "#122c4f",
    width: normalize(57),
    height: normalize(57),
    borderRadius: normalize(30),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  plus: {
    color: "white",
    fontSize: normalize(36),
    fontWeight: "bold",
    marginTop: normalize(-5),
    marginLeft: normalize(1),
  },
});