import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

type TodoItem = {
  key: string;
  value: string;
};

const TodoListManager = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, { key: Date.now().toString(), value: todo }]);
      setTodo('');
    }
  };

  const removeTodo = (key: string) => {
    setTodos(todos.filter((item) => item.key !== key));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Todo"
        value={todo}
        onChangeText={(text) => setTodo(text)}
        testID="input-todo"
      />
      <Button title="Add Todo" onPress={addTodo} testID="add-todo-button" />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.value}</Text>
            <Button
              title="Remove"
              onPress={() => removeTodo(item.key)}
              testID={`remove-todo-button-${item.key}`}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default TodoListManager;
