import React from "react";
import { When } from "../if";
import TodoForm from "./form-json.js";
import TodoList from "./list.js";
import TodoItem from "./item.js";
import * as actions from "../../state/store/todo-action";

import "./todo.scss";
import { connect } from "react-redux";

const ToDo = props => {
  const _addItem = data => {
    console.log(data);
    data.complete = false;
    props.handlePost(data);
  };

  const _deleteItem = id => {
    props.handleDelete(id);
  };

  const _toggleComplete = id => {
    props.handleToggle(id);
  };

  const _toggleDetails = id => {
    props.handleDetails(id);
  };

  const _toggleDB = () => {
    props.handleGet();
  };

  return (
    <>
      <header>
        <h2>
          There are {props.todo.todoList.filter(item => !item.complete).length}{" "}
          Items To Complete
        </h2>
      </header>

      <section className="todo">
        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <button id="database-results" onClick={_toggleDB}>
            Show Database Results
          </button>
          <TodoList
            list={props.todo}
            handleComplete={_toggleComplete}
            handleDetails={_toggleDetails}
            handleDelete={_deleteItem}
          />
        </div>
      </section>

      <When condition={props.todo.showDetails}>
        <TodoItem handleDetails={_toggleDetails} item={props.todo.details} />
      </When>
    </>
  );
};

const mapStateToProps = state => ({
  todo: state.todo
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleGet: () => dispatch(actions._getTodoItems()),
  handleDetails: id => dispatch(actions.details(id)),
  handlePost: data => dispatch(actions.postData(data)),
  handleToggle: id => dispatch(actions.toggle(id)),
  handleDelete: id => dispatch(actions.destroy(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo);
