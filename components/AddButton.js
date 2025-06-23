import React, { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";

// Get device width for responsive scaling
const { width } = Dimensions.get("window");
const scale = width / 375;

/**
 * Utility function to normalize sizes based on device width
 */
function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * AddButton component renders a circular button with a "+" sign
 * that animates a full rotation on press, then triggers the onPress callback.
 *
 * Props:
 * - onPress: callback fired when the button is pressed
 */
export default function AddButton({ onPress }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  /**
   * Handles button press by animating a 360deg spin, then calling onPress
   */
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

  // Interpolate rotation animation from 0 to 360 degrees
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
    bottom: normalize(30), // position relative to screen bottom
    right: normalize(30),  // position relative to screen right edge
    backgroundColor: "#122c4f",
    width: normalize(57),
    height: normalize(57),
    borderRadius: normalize(30), // circular button
    justifyContent: "center",
    alignItems: "center",
    // Shadow for elevation on both iOS and Android
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
    marginTop: normalize(-5),  // slight vertical adjustment
    marginLeft: normalize(1),  // slight horizontal adjustment
  },
});