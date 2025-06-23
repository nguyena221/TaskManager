import { StyleSheet, View } from 'react-native';
import TaskManager from './components/TaskManager';  // adjust the path as needed

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <TaskManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4efe6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
