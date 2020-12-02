import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { updateTodoTask, getTodoItem } from "../Redux/todo-reducer";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

let TodoTaskUpdateForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="todo-title">Todo title</label>
        <Field
          type="text"
          component="input"
          name="title"
          className="form-control"
          id="todo-title"
          aria-describedby="emailHelp"
          placeholder="Enter title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="todo-description">Todo description</label>
        <Field
          type="text"
          component="input"
          name="description"
          className="form-control"
          id="todo-description"
          aria-describedby="emailHelp"
          placeholder="Enter description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="todo-color">Todo color</label>
        <Field
          type="text"
          component="input"
          name="color"
          className="form-control"
          id="todo-color"
          aria-describedby="emailHelp"
          placeholder="Enter color"
        />
      </div>
      <button type="submit" className="btn btn-primary todo-btn">
        Update
      </button>
    </form>
  );
};
TodoTaskUpdateForm = reduxForm({
  form: "todo-update-form",
  enableReinitialize: true,
})(TodoTaskUpdateForm);

const TodoTaskUpdate = (props) => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getTodoItem(id);
  }, []);
  async function updateTodoTask(formData) {
    const { title, description, color } = formData;
    const { id } = props.match.params;
    await props.updateTodoTask(title, description, color, id);
    props.updateSuccess === "OK" &&
      NotificationManager.success("Success message", "Updated", 2000);
  }
  const { todoRes } = props;
  const initialValues = {
    title: todoRes.title,
    description: todoRes.description,
    color: todoRes.color,
  };

  return (
    <div className="todo-task-update container">
      <NotificationContainer />
      <h2>Todo Update</h2>
      <TodoTaskUpdateForm
        onSubmit={updateTodoTask}
        initialValues={initialValues}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo.getTodoListRes,
    todoRes: state.todo.getSingleTodoRes,
    updateSuccess: state.todo.updateTodoListSuccess,
  };
};
export default compose(
  connect(mapStateToProps, { getTodoItem, updateTodoTask }),
  withRouter
)(TodoTaskUpdate);
