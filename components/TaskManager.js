import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  Modal,
} from "react-native";
import TaskList from "./TaskList";
import AddButton from "./AddButton";
import AddTaskModal from "./AddTaskModal";
import InfoButton from "./InfoButton";

// Responsive font sizing utility based on device width
const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default function TaskManager() {
  // Task list state management
  const [tasks, setTasks] = useState([]);
  // Modal visibility states for add/edit and info popups
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  // Inputs and editing state tracking
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Adds a new task to the list
  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now().toString(),
      text: newTask,
      description: newDescription.trim(),
      completed: false,
    };

    setTasks([task, ...tasks]);
    resetModal();
  };

  // Resets modal inputs and editing state
  const resetModal = () => {
    setNewTask("");
    setNewDescription("");
    setIsEditing(false);
    setEditingTaskId(null);
    setModalVisible(false);
  };

  // Prepares modal with task data for editing
  const startEditingTask = (task) => {
    setNewTask(task.text);
    setNewDescription(task.description);
    setEditingTaskId(task.id);
    setIsEditing(true);
    setModalVisible(true);
  };

  // Applies edits to the selected task
  const editTask = () => {
    if (!newTask.trim()) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTaskId
          ? { ...task, text: newTask, description: newDescription.trim() }
          : task
      )
    );
    resetModal();
  };

  // Toggles completion status of a task
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Removes a task by id
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Handles keyboard behavior on iOS and Android */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header section */}
        <View style={styles.textContainer}>
          <Text style={styles.helloText}>Hello!</Text>
          <Text style={styles.titleText}>Manage your daily tasks:</Text>
        </View>

        {/* Task list display with handlers for complete, edit, and delete */}
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          onEdit={startEditingTask}
        />

        {/* Floating action buttons */}
        <AddButton onPress={() => setModalVisible(true)} />
        <InfoButton onPress={() => setInfoVisible(true)} />

        {/* Modal for adding or editing tasks */}
        <AddTaskModal
          visible={modalVisible}
          onClose={resetModal}
          newTask={newTask}
          setNewTask={setNewTask}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          onAddTask={isEditing ? editTask : addTask}
          isEditing={isEditing}
          onEditTask={editTask}
        />

        {/* Modal popup for app information */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={infoVisible}
          onRequestClose={() => setInfoVisible(false)}
        >
          <TouchableOpacity
            style={styles.infoModalOverlay}
            activeOpacity={1}
            onPressOut={() => setInfoVisible(false)}
          >
            <View style={styles.infoPopup}>
              <Text style={styles.infoText}>
                This app helps you manage your tasks. Tap the "+" button to add
                a task. Tap a checkbox to mark it done. Tap the pencil to edit,
                and the trash to delete.
              </Text>
              <TouchableOpacity
                onPress={() => setInfoVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf7f1",
    position: "relative",
  },
  textContainer: {
    padding: normalize(30),
  },
  helloText: {
    fontSize: normalize(23),
    fontWeight: "bold",
    color: "#294122",
  },
  titleText: {
    fontSize: normalize(47),
    fontWeight: "800",
    color: "#294122",
  },
  infoModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoPopup: {
    backgroundColor: "#1c2b38",
    padding: normalize(30),
    borderRadius: normalize(20),
    maxWidth: "80%",
  },
  infoText: {
    color: "#f1eada",
    fontSize: normalize(16),
    marginBottom: normalize(20),
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: "#768064",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(30),
  },
  closeButtonText: {
    color: "#f1eada",
    fontWeight: "600",
    fontSize: normalize(16),
  },
});