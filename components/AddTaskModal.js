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

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

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
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Edit Task" : "Create a new task:"}
            </Text>

            <Text style={styles.instructions}>Task name</Text>
            <TextInput
              style={styles.underlineInput}
              placeholder="Type Here"
              placeholderTextColor="#a3b2b0"
              value={newTask}
              onChangeText={setNewTask}
            />

            <Text style={styles.instructions}>Add a brief description</Text>
            <TextInput
              style={styles.underlineInput}
              placeholder="Type Here"
              placeholderTextColor="#a3b2b0"
              value={newDescription}
              onChangeText={setNewDescription}
            />

            <TouchableOpacity
              style={styles.modalAddButton}
              onPress={isEditing ? onEditTask : onAddTask}
            >
              <Text style={styles.modalButtonText}>
                {isEditing ? "Save Changes" : "Add New Task"}
              </Text>
            </TouchableOpacity>

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
    justifyContent: "flex-end",
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
