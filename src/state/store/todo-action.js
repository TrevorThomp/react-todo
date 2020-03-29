import { callAPI } from "../../lib/api";

let todoAPI = "https://api-js401.herokuapp.com/api/v1/todo";

export const _getTodoItems = () => dispatch => {
  return callAPI(todoAPI, "GET")
    .then(items => dispatch(get(items.results)))
    .catch(console.error);
};

export const get = payload => {
  return {
    type: "GET",
    payload: payload
  };
};

export const toggle = payload => {
  return {
    type: "TOGGLE",
    payload: payload
  };
};

export const details = payload => {
  return {
    type: "DETAILS",
    payload: payload
  };
};

export const postData = payload => dispatch => {
  return callAPI(todoAPI, "POST", payload)
    .then(result => dispatch(post(result)))
    .catch(console.error);
};

export const post = payload => {
  return {
    type: "POST",
    payload: payload
  };
};

export const destroyData = payload => dispatch => {
  return callAPI(`${todoAPI}/${payload.id}`, "DELETE")
    .then(() => dispatch(destroy(payload.id)))
    .catch(console.error);
};

export const destroy = payload => {
  return {
    type: "DELETE",
    payload: payload
  };
};
