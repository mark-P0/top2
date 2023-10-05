# Class Based Components

> Old way; classical components

<!-- cspell:words todos -->

## Comparison | Rewrite

### Functional component

```jsx
import { useState } from "react";

function FunctionalTodoList({ name }) {
  const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
  const [inputVal, setInputVal] = useState("");

  function handleInputChange(e) {
    setInputVal(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setInputVal("");
  }

  const taskInput = (
    <input type="text" value={inputVal} onChange={handleInputChange} />
  );
  return (
    <section>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        <label>Enter a task: {taskInput}</label>
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </section>
  );
}
```

### Classical component

```jsx
import { Component } from "react";

class ClassicalTodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
    };
  }

  handleInputChange = (e) => {
    const { state } = this;
    this.setState({
      ...state,
      inputVal: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { state } = this;
    const { todos, inputVal } = state;
    this.setState({
      ...state,
      todos: [...todos, inputVal],
      inputVal: "",
    });
  };

  render() {
    const {
      props: { name },
      state: { todos, inputVal },
      handleInputChange,
      handleSubmit,
    } = this;

    const taskInput = (
      <input type="text" value={inputVal} onChange={handleInputChange} />
    );
    return (
      <section>
        <h3>{name}</h3>
        <form onSubmit={handleSubmit}>
          <label>Enter a task: {taskInput}</label>
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <ul>
          {todos.map((todo) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
      </section>
    );
  }
}
```

## Assignment

```jsx
class Count extends Component {
  render() {
    const { todos } = this.props;

    return <>Count: {todos.length}</>;
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);

    const { todo } = props;
    this.state = {
      isEditing: false,
      editedTodo: todo,
    };
  }

  handleInput = (e) => {
    const { state } = this;
    this.setState({
      ...state,
      editedTodo: e.target.value,
    });
  };

  toggleEditMode = () => {
    const { state } = this;
    const { isEditing } = state;
    this.setState({
      ...state,
      isEditing: !isEditing,
    });
  };

  saveEdit = () => {
    const { onSave } = this.props;
    const { editedTodo } = this.state;

    onSave(editedTodo);
    this.toggleEditMode();
  };

  render() {
    const {
      props: { todo, onDelete },
      state: { isEditing, editedTodo },
      handleInput,
      toggleEditMode,
      saveEdit,
    } = this;

    if (isEditing) {
      return (
        <li>
          <input type="text" value={editedTodo} onChange={handleInput} />
          <button type="button" onClick={onDelete}>
            ❌
          </button>
          <button type="button" onClick={saveEdit}>
            Save
          </button>
        </li>
      );
    }

    return (
      <li>
        {todo}
        <button type="button" onClick={onDelete}>
          ❌
        </button>
        <button type="button" onClick={toggleEditMode}>
          Edit
        </button>
      </li>
    );
  }
}

class ClassicalTodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
    };
  }

  handleInputChange = (e) => {
    const { state } = this;
    this.setState({
      ...state,
      inputVal: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { state } = this;
    const { todos, inputVal } = state;
    this.setState({
      ...this.state,
      todos: [...todos, inputVal],
      inputVal: "",
    });
  };

  deleteTodo = (idxOfTodoToDelete) => {
    const { state } = this;
    const { todos } = state;
    this.setState({
      ...state,
      todos: todos.filter((_, idx) => idx !== idxOfTodoToDelete),
    });
  };

  updateTodo = (updatedTodoIdx, updatedTodo) => {
    const { state } = this;
    const { todos } = state;
    this.setState({
      ...state,
      todos: todos.map((todo, idx) =>
        idx === updatedTodoIdx ? updatedTodo : todo
      ),
    });
  };

  render() {
    const {
      props: { name },
      state: { todos, inputVal },
      handleInputChange,
      handleSubmit,
      deleteTodo,
      updateTodo,
    } = this;

    const taskInput = (
      <input type="text" value={inputVal} onChange={handleInputChange} />
    );
    return (
      <section>
        <h3>{name}</h3>
        <form onSubmit={handleSubmit}>
          <label>Enter a task: {taskInput}</label>
          <button type="submit">Submit</button>
        </form>
        <h4>
          All the tasks! <Count todos={todos} />
        </h4>
        <ul>
          {todos.map((todo, idx) => (
            <TodoItem
              key={`${idx}-${todo}`}
              todo={todo}
              onDelete={() => deleteTodo(idx)}
              onSave={(updatedTodo) => updateTodo(idx, updatedTodo)}
            />
          ))}
        </ul>
      </section>
    );
  }
}
```
