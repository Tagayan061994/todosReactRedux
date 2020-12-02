import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import {
  addTodoList,
  getTodoList,
  deleteItem,
  updateTodoListSuccess,
  getTodoListRes,
} from "../Redux/todo-reducer";
let TodoTaskForm = (props) => {
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
        Create
      </button>
    </form>
  );
};
TodoTaskForm = reduxForm({ form: "todo-form" })(TodoTaskForm);
const TodoTask = (props) => {
  useEffect(() => {
    props.getTodoList();
  }, []);

  async function addTodoTask(formData) {
    const { title, description, color } = formData;
    await props.addTodoList(title, description, color);
    await props.getTodoList();
  }

  const deleteItem = (id) => {
    props.deleteItem(id).then(() => props.getTodoList());
  };

  const deleteAllItems = async () => {
    props.todo.map((t) =>
      props.deleteItem(t._id).then(() => props.getTodoList())
    );
  };

  const updateItem = (id) => {
    props.updateTodoListSuccess(null);
    props.history.push(`/update/${id}`);
  };

  return (
    <div className="container">
      <div className="todo-task-form">
        <h2>Create Todo</h2>
        <TodoTaskForm onSubmit={addTodoTask} />
      </div>
      <hr />
      <div className="todo-table">
        <h2>Todo Table</h2>
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteAllItems}
        >
          Delete All
        </button>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Color</th>
              <th scope="col">Delete</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {props.todo &&
              props.todo.map((t) => {
                return (
                  <tr key={t._id}>
                    <th scope="row">{t._id}</th>
                    <td>{t.title}</td>
                    <td>{t.description}</td>
                    <td>{t.color}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteItem(t._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => updateItem(t._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo.getTodoListRes,
  };
};
export default compose(
  connect(mapStateToProps, {
    addTodoList,
    getTodoList,
    deleteItem,
    updateTodoListSuccess,
    getTodoListRes,
  }),
  withRouter
)(TodoTask);
