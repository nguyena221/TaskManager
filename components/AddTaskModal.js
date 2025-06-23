import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PixelRatio,
} from "react-native";

// Get device width for responsive scaling
const { width } = Dimensions.get("window");
const scale = width / 375;

/**
 * Utility to normalize font and size values based on device width
 */
function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * AddTaskModal component renders a modal for adding or editing tasks.
 * Includes fields for task name and description, with buttons to add/save or cancel.
 *
 * Props:
 * - visible: controls modal visibility
 * - onClose: function to close modal
 * - newTask: current task name input value
 * - setNewTask: setter for task name input
 * - newDescription: current description input value
 * - setNewDescription: setter for description input
 * - onAddTask: handler when adding a new task
 * - isEditing: boolean indicating edit mode (defaults false)
 * - onEditTask: handler when saving edited task
 */
export default function AddTaskModal({
  visible,
  onClose,
  newTask,
  setNewTask,
  newDescription,
  setNewDescription,
  onAddTask,
  isEditing = false,
  onEditTask,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Android back button handler
    >
      <View style={styles.modalBackground}>
        {/* KeyboardAvoidingView ensures inputs are visible when keyboard is open */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Edit Task" : "Create a new task:"}
            </Text>

            {/* Task name input */}
            <Text style={styles.instructions}>Task name</Text>
            <TextInput
              style={styles.underlineInput}
              placeholder="Type Here"
              placeholderTextColor="#a3b2b0"
              value={newTask}
              onChangeText={setNewTask}
            />

            {/* Description input */}
            <Text style={styles.instructions}>Add a brief description</Text>
            <TextInput
              style={styles.underlineInput}
              placeholder="Type Here"
              placeholderTextColor="#a3b2b0"
              value={newDescription}
              onChangeText={setNewDescription}
            />

            {/* Add or Save button */}
            <TouchableOpacity
              style={styles.modalAddButton}
              onPress={isEditing ? onEditTask : onAddTask}
            >
              <Text style={styles.modalButtonText}>
                {isEditing ? "Save Changes" : "Add New Task"}
              </Text>
            </TouchableOpacity>

            {/* Cancel button */}
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end", // Align modal at the bottom
    alignItems: "flex-end",
  },
  keyboardView: {
    width: "100%",
  },
  modalContainer: {
    width: "100%",
    height: normalize(400),
    backgroundColor: "#1c2b38",
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    padding: normalize(45),
  },
  modalTitle: {
    fontSize: normalize(30),
    color: "#f1eada",
    marginBottom: normalize(25),
  },
  instructions: {
    fontSize: normalize(15),
    fontWeight: "600",
    color: "#f1eada",
    marginBottom: normalize(3),
  },
  underlineInput: {
    color: "#f1eada",
    borderBottomWidth: 3,
    borderBottomColor: "#f1eada",
    paddingVertical: normalize(5),
    fontSize: normalize(15),
    marginBottom: normalize(25),
  },
  modalAddButton: {
    backgroundColor: "#768064",
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(15),
    borderRadius: normalize(50),
    marginTop: normalize(5),
    marginBottom: normalize(10),
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#f1eada",
    fontSize: normalize(15),
    fontWeight: "600",
  },
  modalCancelButton: {
    borderWidth: 3,
    borderColor: "#768064",
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(15),
    borderRadius: normalize(50),
    marginBottom: normalize(10),
    justifyContent: "center",
    alignItems: "center",
  },
});