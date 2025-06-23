import React from "react";
import { FlatList, View, Text, StyleSheet, Dimensions, PixelRatio } from "react-native";
import Task from "./Task";

// Responsive font scaling utility
const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * TaskList component renders a scrollable list of tasks.
 * Shows a message when the list is empty.
 * Props:
 * - tasks: array of task objects
 * - onToggleComplete: callback to toggle completion status
 * - onDelete: callback to delete a task
 * - onEdit: callback to edit a task
 */
export default function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Task
          task={item}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: normalize(20),
  },
  emptyContainer: {
    marginTop: normalize(50),
    alignItems: "center",
  },
  emptyText: {
    fontSize: normalize(17),
    color: "#888",
  },
});
