import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import {
  getTodos,
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
// import { removeTodo, completedTodo } from "./actions";
// import { completedTodo } from "./actions";
import {
  displayAlert,
  loadTodos,
  removeTodoRequest,
  completedRequest,
} from "./thunks";
// import "./TodoList.css";
// import { isLoading } from "./reducers";
import styled from "styled-components";

// Styled Components
// const BigRedText = styled.div`
//   font-size: 48px;
//   color: #FF0000;
// `;
const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

// TodoList Component
const TodoList = ({
  // todos = [],
  onRemovePressed,
  onCompletedPressed,
  // onDisplayAlertClicked,
  isLoading,
  startLoadingTodos,
  completedTodos,
  incompleteTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      {/* <BigRedText>I'm  a Styled Component</BigRedText> */}
      <NewTodoForm />
      <h2>Incomplete</h2>
      {incompleteTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h2>Completed</h2>
      {completedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
          // onCompletedPressed={onDisplayAlertClicked}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  // todos: state.todos,
  // isLoading: state.isLoading,
  // todos: getTodos(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
  isLoading: getTodosLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  // onRemovePressed: (text) => dispatch(removeTodo(text)),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  // onCompletedPressed: (text) => dispatch(completedTodo(text)),
  onCompletedPressed: (id) => dispatch(completedRequest(id)),
  // onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
