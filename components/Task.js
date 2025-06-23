import React, { useRef } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  PixelRatio,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Responsive scaling utility based on device width
const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Task component renders an individual task item with animations.
 * Supports toggling completion, editing, and deleting with animations.
 *
 * Props:
 * - task: task object containing id, text, description, and completed status
 * - onToggleComplete: function to toggle task completion
 * - onDelete: function to delete task
 * - onEdit: function to start editing task
 */
export default function Task({ task, onToggleComplete, onDelete, onEdit }) {
  // Animation values for fade and slide effects on delete
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Animate and then delete task
  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: normalize(100),
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(task.id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        task.completed && styles.completedContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      {/* Touchable area to toggle task completion */}
      <TouchableOpacity
        onPress={() => onToggleComplete(task.id)}
        style={styles.textWrapper}
      >
        <MaterialCommunityIcons
          name={
            task.completed
              ? "checkbox-marked-circle"
              : "checkbox-blank-circle-outline"
          }
          size={normalize(24)}
          color={task.completed ? "#36713a" : "#999"}
          style={{ marginRight: normalize(10) }}
        />
        <View style={styles.textContainer}>
          {/* Task title */}
          <Text style={[styles.text, task.completed && styles.completedText]}>
            {task.text}
          </Text>
          {/* Optional task description */}
          {task.description ? (
            <Text
              style={[
                styles.description,
                task.completed && styles.completedDescription,
              ]}
            >
              {task.description}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>

      {/* Edit button */}
      <TouchableOpacity onPress={() => onEdit(task)} style={styles.editButton}>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={normalize(24)}
          color="#294122"
        />
      </TouchableOpacity>

      {/* Delete button */}
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={normalize(24)}
          color="#ff4444"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    padding: normalize(15),
    backgroundColor: "#f1eada",
    borderRadius: normalize(30),
    marginBottom: normalize(10),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "column",
    flexShrink: 1,
  },
  completedContainer: {
    backgroundColor: "#b4ceb6",
  },
  textWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    fontSize: normalize(16),
    color: "#333",
  },
  description: {
    fontSize: normalize(14),
    color: "#666",
    marginTop: normalize(2),
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  completedDescription: {
    color: "#999",
  },
  editButton: {
    paddingRight: normalize(5),
  },
  deleteButton: {
    paddingHorizontal: 0,
  },
});